import fs from "fs";

const fetchFn =
  globalThis.fetch || (await import("node-fetch").then((m) => m.default));
const headers = {
  "User-Agent": "WorldWebWikidataEnricher/1.0 (contact: example@example.com)",
};

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function readCountries() {
  const src = fs.readFileSync("src/data/countries.js", "utf8");
  const stripped = src.replace(/^[\s\S]*?export default\s*/, "");
  const jsonText = stripped.replace(/;?\s*$/, "");
  return JSON.parse(jsonText);
}

function writeCountries(arr) {
  const out = `// Auto-updated by scripts/enrichWikidataBatched.js\nexport default ${JSON.stringify(arr, null, 2)}\n`;
  fs.writeFileSync("src/data/countries.js", out);
}

async function getQid(name) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(name)}&prop=pageprops&ppprop=wikibase_item&origin=*`;
  try {
    const res = await fetchFn(url, { headers });
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

async function wbgetentities(ids, props = "labels|claims") {
  if (!ids || ids.length === 0) return {};
  const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${ids.join("|")}&props=${props}&languages=en&origin=*`;
  const res = await fetchFn(url, { headers });
  if (!res.ok) return null;
  return res.json();
}

async function fetchLabels(ids) {
  const out = {};
  if (!ids || ids.length === 0) return out;
  const batchSize = 50;
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const j = await wbgetentities(batch, "labels");
    if (!j || !j.entities) continue;
    for (const id of Object.keys(j.entities)) {
      out[id] =
        j.entities[id].labels &&
        j.entities[id].labels.en &&
        j.entities[id].labels.en.value;
    }
    await delay(200);
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
  return { type: "literal", value: val };
}

function isSmall(pop) {
  return typeof pop === "number" && pop < 5000;
}

async function enrichAll() {
  const countries = readCountries();
  console.log("Found", countries.length, "countries");

  // Resolve QIDs
  const qidMap = {};
  for (let i = 0; i < countries.length; i++) {
    const c = countries[i];
    process.stdout.write(
      `Resolving QID ${i + 1}/${countries.length}: ${c.name}\r`,
    );
    const qid = await getQid(c.name);
    if (qid)
      ((qidMap[qid] = qidMap[qid] || []),
        qidMap[qid].push(c.countryCode || c.code || c.slug));
    countries[i].wikidataQid = qid || null;
    await delay(80);
  }
  console.log("\nResolved QIDs for countries.");

  // Batch fetch entities
  const qids = Object.keys(
    countries.reduce((acc, c) => {
      if (c.wikidataQid) acc[c.wikidataQid] = true;
      return acc;
    }, {}),
  );
  const batchSize = 40;
  const entityData = {};
  for (let i = 0; i < qids.length; i += batchSize) {
    const batch = qids.slice(i, i + batchSize);
    console.log(
      `Fetching entities ${i + 1}-${Math.min(i + batchSize, qids.length)} of ${qids.length}`,
    );
    const j = await wbgetentities(batch, "labels|claims");
    if (j && j.entities) {
      for (const id of Object.keys(j.entities)) entityData[id] = j.entities[id];
    }
    await delay(1200);
  }

  // Collect all referenced ids for labeling
  const propIdsSet = new Set();
  const valIdsSet = new Set();
  for (const id of Object.keys(entityData)) {
    const claims = entityData[id].claims || {};
    for (const pid of Object.keys(claims)) {
      propIdsSet.add(pid);
      for (const a of claims[pid]) {
        const dv =
          a.mainsnak && a.mainsnak.datavalue && a.mainsnak.datavalue.value;
        if (dv && dv.id) valIdsSet.add(dv.id);
      }
    }
  }

  const propIds = Array.from(propIdsSet);
  const valIds = Array.from(valIdsSet);
  console.log(
    "Fetching labels for",
    propIds.length,
    "properties and",
    valIds.length,
    "values",
  );
  const propLabels = await fetchLabels(propIds);
  const valLabels = await fetchLabels(valIds);

  // Map back to countries
  for (let i = 0; i < countries.length; i++) {
    const c = countries[i];
    const qid = c.wikidataQid;
    if (!qid || !entityData[qid]) {
      // conservative placeholders
      const small = isSmall(c.population);
      c.nationalAnimal =
        c.nationalAnimal && c.nationalAnimal !== "Not Applicable"
          ? c.nationalAnimal
          : small
            ? "Not Applicable"
            : "Information not reliably available";
      c.nationalBird =
        c.nationalBird && c.nationalBird !== "Not Applicable"
          ? c.nationalBird
          : small
            ? "Not Applicable"
            : "Information not reliably available";
      c.nationalFlower =
        c.nationalFlower && c.nationalFlower !== "Not Applicable"
          ? c.nationalFlower
          : small
            ? "Not Applicable"
            : "Information not reliably available";
      c.nationalFruit =
        c.nationalFruit && c.nationalFruit !== "Not Applicable"
          ? c.nationalFruit
          : small
            ? "Not Applicable"
            : "Information not reliably available";
      c.nationalSport =
        c.nationalSport && c.nationalSport !== "Not Applicable"
          ? c.nationalSport
          : small
            ? "Not Applicable"
            : "Information not reliably available";
      c.majorReligions =
        c.majorReligions && c.majorReligions.length
          ? c.majorReligions
          : small
            ? ["Not Applicable"]
            : ["Information not reliably available"];
      continue;
    }
    const ent = entityData[qid];
    const claims = ent.claims || {};
    const symbols = {
      animal: null,
      bird: null,
      flower: null,
      fruit: null,
      sport: null,
    };
    // examine claims by property label
    for (const pid of Object.keys(claims)) {
      const pl = (propLabels[pid] || "").toLowerCase();
      if (!pl.includes("national")) continue;
      const mv = pickMainValue(claims, pid);
      if (!mv) continue;
      const text =
        mv.type === "entity"
          ? valLabels[mv.id]
          : mv.value && mv.value.id
            ? valLabels[mv.value.id]
            : mv.value && mv.value.label
              ? mv.value.label
              : null;
      if (!text) continue;
      if (pl.includes("animal") && !symbols.animal) symbols.animal = text;
      if (pl.includes("bird") && !symbols.bird) symbols.bird = text;
      if (pl.includes("flower") && !symbols.flower) symbols.flower = text;
      if (pl.includes("fruit") && !symbols.fruit) symbols.fruit = text;
      if (pl.includes("sport") && !symbols.sport) symbols.sport = text;
    }

    const religions = [];
    if (claims["P140"]) {
      for (const a of claims["P140"]) {
        const dv =
          a.mainsnak && a.mainsnak.datavalue && a.mainsnak.datavalue.value;
        if (dv && dv.id && valLabels[dv.id]) religions.push(valLabels[dv.id]);
      }
    }

    const small = isSmall(c.population);
    c.nationalAnimal =
      symbols.animal ||
      (small
        ? "Not Applicable"
        : c.nationalAnimal || "Information not reliably available");
    c.nationalBird =
      symbols.bird ||
      (small
        ? "Not Applicable"
        : c.nationalBird || "Information not reliably available");
    c.nationalFlower =
      symbols.flower ||
      (small
        ? "Not Applicable"
        : c.nationalFlower || "Information not reliably available");
    c.nationalFruit =
      symbols.fruit ||
      (small
        ? "Not Applicable"
        : c.nationalFruit || "Information not reliably available");
    c.nationalSport =
      symbols.sport ||
      (small
        ? "Not Applicable"
        : c.nationalSport || "Information not reliably available");
    c.majorReligions = religions.length
      ? religions
      : small
        ? ["Not Applicable"]
        : c.majorReligions && c.majorReligions.length
          ? c.majorReligions
          : ["Information not reliably available"];
    // small delay
    if (i % 10 === 0) await delay(50);
  }

  writeCountries(countries);
  console.log("Wrote updated src/data/countries.js with enriched fields");
}

enrichAll().catch((e) => {
  console.error(e);
  process.exit(1);
});
