import fs from "fs";

const fetchFn =
  globalThis.fetch || (await import("node-fetch").then((m) => m.default));

const defaultHeaders = {
  "User-Agent": "WorldWebBot/1.0 (example@example.com)",
};

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function loadCountries() {
  const src = fs.readFileSync("src/data/countries.js", "utf8");
  const stripped = src.replace(/^[\s\S]*?export default\s*/, "");
  const jsonText = stripped.replace(/;?\s*$/, "");
  try {
    return JSON.parse(jsonText);
  } catch (e) {
    console.error("Failed to parse src/data/countries.js", e && e.message);
    return [];
  }
}

async function getQidFromWikipedia(name) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(name)}&prop=pageprops&ppprop=wikibase_item&origin=*`;
  try {
    const res = await fetchFn(url, { headers: defaultHeaders });
    if (!res.ok) return null;
    const j = await res.json();
    const pages = j.query && j.query.pages;
    if (!pages) return null;
    const page = Object.values(pages)[0];
    return page && page.pageprops && page.pageprops.wikibase_item
      ? page.pageprops.wikibase_item
      : null;
  } catch (e) {
    return null;
  }
}

async function fetchWikidataEntities(ids) {
  if (!ids || ids.length === 0) return {};
  const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${ids.join("|")}&props=labels|claims|sitelinks&languages=en&origin=*`;
  const res = await fetchFn(url, { headers: defaultHeaders });
  if (!res.ok) throw new Error("Wikidata entity fetch failed " + res.status);
  return res.json();
}

async function fetchLabelsForIds(ids) {
  if (!ids || ids.length === 0) return {};
  const batches = [];
  for (let i = 0; i < ids.length; i += 50) batches.push(ids.slice(i, i + 50));
  const out = {};
  for (const b of batches) {
    const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${b.join("|")}&props=labels&languages=en&origin=*`;
    const res = await fetchFn(url, { headers: defaultHeaders });
    if (!res.ok) continue;
    const j = await res.json();
    for (const id of Object.keys(j.entities || {})) {
      out[id] =
        j.entities[id].labels &&
        j.entities[id].labels.en &&
        j.entities[id].labels.en.value;
    }
    await delay(50);
  }
  return out;
}

function pickMainValue(claims, prop) {
  const arr = claims[prop];
  if (!arr || arr.length === 0) return null;
  const snak = arr[0].mainsnak;
  if (!snak || !snak.datavalue) return null;
  const val = snak.datavalue.value;
  if (val.id) return { type: "entity", id: val.id };
  if (val.text) return { type: "text", text: val.text };
  return { type: typeof val, raw: val };
}

async function enrich() {
  const countries = loadCountries();
  const out = {};
  const allPropertyIds = new Set();
  const allReferencedIds = new Set();

  console.log("Resolving Wikidata QIDs for", countries.length, "countries");
  for (const c of countries) {
    const name = c.name || c.slug || "";
    const qid = await getQidFromWikipedia(name);
    out[c.countryCode || c.code || c.slug] = {
      name,
      code: c.countryCode || c.code || c.slug,
      qid,
    };
    await delay(30);
  }

  console.log("Fetching Wikidata claims (first pass)");
  for (const key of Object.keys(out)) {
    const entry = out[key];
    if (!entry.qid) {
      entry.claims = null;
      continue;
    }
    try {
      const data = await fetchWikidataEntities([entry.qid]);
      const ent = data.entities && data.entities[entry.qid];
      if (!ent) {
        entry.claims = null;
        continue;
      }
      entry.claims = ent.claims || {};
      for (const pid of Object.keys(entry.claims)) {
        allPropertyIds.add(pid);
        const arr = entry.claims[pid];
        for (const a of arr) {
          const dv =
            a.mainsnak && a.mainsnak.datavalue && a.mainsnak.datavalue.value;
          if (dv && dv.id) allReferencedIds.add(dv.id);
        }
      }
      await delay(80);
    } catch (e) {
      entry.claims = null;
    }
  }

  console.log("Fetching labels for properties and values");
  const propIds = Array.from(allPropertyIds);
  const valIds = Array.from(allReferencedIds);
  const propLabels = await fetchLabelsForIds(propIds);
  const valLabels = await fetchLabelsForIds(valIds);

  console.log("Mapping claims to enriched fields");
  for (const key of Object.keys(out)) {
    const e = out[key];
    const result = {
      population: "Information not reliably available",
      currency: "Information not reliably available",
      nationalSymbols: {
        animal: null,
        bird: null,
        flower: null,
        fruit: null,
        sport: null,
      },
      religions: [],
      culture: "Information not reliably available",
      wikidataQid: e.qid || "Information not reliably available",
    };
    if (!e.claims) {
      result.nationalSymbols = Object.fromEntries(
        Object.keys(result.nationalSymbols).map((k) => [
          k,
          "Information not reliably available",
        ]),
      );
      result.religions = ["Information not reliably available"];
      try {
        const s = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(e.name)}`,
          { headers: defaultHeaders },
        );
        if (s.ok) {
          const j = await s.json();
          result.culture = j.extract || result.culture;
        }
      } catch (_) {}
      out[key] = result;
      await delay(10);
      continue;
    }

    for (const pid of Object.keys(e.claims)) {
      const label = (propLabels[pid] || "").toLowerCase();
      if (label.includes("national") && label.includes("animal")) {
        const v = pickMainValue(e.claims, pid);
        if (v && v.type === "entity" && valLabels[v.id])
          result.nationalSymbols.animal = valLabels[v.id];
        else if (v && v.type === "text") result.nationalSymbols.animal = v.text;
      }
      if (label.includes("national") && label.includes("bird")) {
        const v = pickMainValue(e.claims, pid);
        if (v && v.type === "entity" && valLabels[v.id])
          result.nationalSymbols.bird = valLabels[v.id];
      }
      if (label.includes("national") && label.includes("flower")) {
        const v = pickMainValue(e.claims, pid);
        if (v && v.type === "entity" && valLabels[v.id])
          result.nationalSymbols.flower = valLabels[v.id];
      }
      if (label.includes("national") && label.includes("fruit")) {
        const v = pickMainValue(e.claims, pid);
        if (v && v.type === "entity" && valLabels[v.id])
          result.nationalSymbols.fruit = valLabels[v.id];
      }
      if (label.includes("national") && label.includes("sport")) {
        const v = pickMainValue(e.claims, pid);
        if (v && v.type === "entity" && valLabels[v.id])
          result.nationalSymbols.sport = valLabels[v.id];
      }

      if (pid === "P140") {
        const arr = e.claims[pid];
        for (const a of arr) {
          const dv =
            a.mainsnak && a.mainsnak.datavalue && a.mainsnak.datavalue.value;
          if (dv && dv.id && valLabels[dv.id])
            result.religions.push(valLabels[dv.id]);
        }
      }
    }

    for (const k of Object.keys(result.nationalSymbols)) {
      if (!result.nationalSymbols[k])
        result.nationalSymbols[k] = "Information not reliably available";
    }
    if (result.religions.length === 0)
      result.religions = ["Information not reliably available"];

    try {
      const s = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(e.name)}`,
        { headers: defaultHeaders },
      );
      if (s.ok) {
        const j = await s.json();
        result.culture = j.extract || null;
      }
    } catch (_) {}

    out[key] = result;
    await delay(30);
  }

  const text = `// Auto-generated enrichedCountries (Wikidata + Wikipedia). Review before trusting.\nconst enriched = ${JSON.stringify(out, null, 2)}\nexport default enriched\n`;
  fs.writeFileSync("src/data/enrichedCountries.js", text);
  console.log("Wrote src/data/enrichedCountries.js");
}

enrich().catch((e) => {
  console.error(e);
  process.exit(1);
});
