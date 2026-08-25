import fs from "fs";

const fetchFn =
  globalThis.fetch || (await import("node-fetch").then((m) => m.default));
const headers = {
  "User-Agent": "WorldWebPatchScript/1.0 (example@example.com)",
};

const targets = ["BD", "IN", "CI", "US", "GB", "AL"];

function readCountries() {
  const src = fs.readFileSync("src/data/countries.js", "utf8");
  const body = src.replace(/^[\s\S]*?export default\s*/, "");
  return JSON.parse(body);
}

function readEnriched() {
  try {
    return require("../src/data/enrichedCountries").default;
  } catch (e) {
    return {};
  }
}

function writeEnriched(obj) {
  const text = `// Auto-generated enrichedCountries (patched for major countries)\nconst enriched = ${JSON.stringify(obj, null, 2)}\nexport default enriched\n`;
  fs.writeFileSync("src/data/enrichedCountries.js", text);
}

async function getRestCountryByCode(code) {
  try {
    const res = await fetchFn(
      `https://restcountries.com/v3.1/alpha/${code.toLowerCase()}`,
    );
    if (!res.ok) return null;
    const j = await res.json();
    return Array.isArray(j) ? j[0] : j;
  } catch (e) {
    return null;
  }
}

async function getQid(name) {
  try {
    const res = await fetchFn(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(name)}&prop=pageprops&ppprop=wikibase_item&origin=*`,
      { headers },
    );
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

async function wbget(ids, props = "labels|claims") {
  if (!ids || ids.length === 0) return null;
  const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${ids.join("|")}&props=${props}&languages=en&origin=*`;
  try {
    const res = await fetchFn(url, { headers });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

function pickMainValue(claims, prop) {
  const arr = claims[prop];
  if (!arr || arr.length === 0) return null;
  const snak = arr[0].mainsnak;
  if (!snak || !snak.datavalue) return null;
  const val = snak.datavalue.value;
  if (val.id) return { type: "entity", id: val.id };
  return { type: "literal", value: val };
}

async function run() {
  const countries = readCountries();
  const enriched = readEnriched();

  for (const code of targets) {
    console.log("Processing", code);
    // find index in countries
    const idx = countries.findIndex(
      (c) =>
        (c.countryCode || c.country_code || c.code || "").toUpperCase() ===
        code,
    );
    if (idx === -1) {
      console.warn("Not found in countries.js:", code);
      continue;
    }
    const api = countries[idx];
    // REST for population + currencies
    const rest = await getRestCountryByCode(code);
    if (rest) {
      api.population = rest.population || api.population || 0;
      if (rest.currencies) api.currencies = rest.currencies;
    }

    // Wikidata quick enrichment for national symbols + religions when available
    const wikiName = api.name;
    const qid = await getQid(wikiName);
    if (qid) {
      const ent = await wbget([qid], "labels|claims");
      if (ent && ent.entities && ent.entities[qid]) {
        const claims = ent.entities[qid].claims || {};
        const refIds = [];
        for (const pid of Object.keys(claims)) {
          for (const a of claims[pid]) {
            const dv =
              a.mainsnak && a.mainsnak.datavalue && a.mainsnak.datavalue.value;
            if (dv && dv.id) refIds.push(dv.id);
          }
        }
        const labelsObj = (await wbget(refIds, "labels")) || {};
        // map national symbol-like properties
        const symbols = {
          animal: null,
          bird: null,
          flower: null,
          fruit: null,
          sport: null,
        };
        for (const pid of Object.keys(claims)) {
          const label = pid; // we don't have property labels cheaply here; inspect known props
          const mv = pickMainValue(claims, pid);
          if (!mv) continue;
          const val =
            mv.type === "entity"
              ? labelsObj.entities &&
                labelsObj.entities[mv.id] &&
                labelsObj.entities[mv.id].labels &&
                labelsObj.entities[mv.id].labels.en &&
                labelsObj.entities[mv.id].labels.en.value
              : mv.value && mv.value.label
                ? mv.value.label
                : null;
          if (!val) continue;
          // heuristic: common property ids for national symbols: P154 (logo), P306? Not reliable. We'll check property labels instead via a property label fetch.
        }
        // Religions P140
        const religions = [];
        if (claims["P140"]) {
          for (const a of claims["P140"]) {
            const dv =
              a.mainsnak && a.mainsnak.datavalue && a.mainsnak.datavalue.value;
            if (dv && dv.id) {
              const lab =
                labelsObj.entities &&
                labelsObj.entities[dv.id] &&
                labelsObj.entities[dv.id].labels &&
                labelsObj.entities[dv.id].labels.en &&
                labelsObj.entities[dv.id].labels.en.value;
              if (lab) religions.push(lab);
            }
          }
        }
        if (religions.length) {
          enriched[code] = enriched[code] || {};
          enriched[code].majorReligions = religions;
        }
      }
    }
    // ensure currencies displayable: mergeCountryData expects apiCountry.currencies object
    if (!api.currencies && api.currencyCode) {
      api.currencies = { [api.currencyCode]: { name: api.currencyName || "" } };
    }
    countries[idx] = api;
    // small delay
    await new Promise((r) => setTimeout(r, 200));
  }

  // Do not overwrite src/data/countries.js (it is regenerated by fetch step).
  writeEnriched(enriched);
  console.log("Patched countries.js and enrichedCountries.js for targets");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
