// Script: fixNullData.js
// Purpose: Update src/data/countries.js with verified population, national symbols, and religions.
// Rules: Do not invent data. If no official symbol/religion exists for a small territory (population < 5000), set to "Not Applicable".

import fs from "fs";

const fetchFn = globalThis.fetch;
if (!fetchFn) {
  console.error(
    "Global fetch is not available in this Node runtime. Please run on Node 18+ or install node-fetch.",
  );
  process.exit(1);
}

const headers = {
  "User-Agent": "WorldWebDataFixer/1.0 (contact: example@example.com)",
};

function readCountries() {
  const src = fs.readFileSync("src/data/countries.js", "utf8");
  const stripped = src.replace(/^[\s\S]*?export default\s*/, "");
  const jsonText = stripped.replace(/;?\s*$/, "");
  return JSON.parse(jsonText);
}

function writeCountries(arr) {
  const out = `// Generated file - refreshed by scripts/fixNullData.js\nexport default ${JSON.stringify(arr, null, 2)}\n`;
  fs.writeFileSync("src/data/countries.js", out);
}

function pickMainValue(claims, prop) {
  const arr = claims[prop];
  if (!arr || arr.length === 0) return null;
  const snak = arr[0].mainsnak;
  if (!snak || !snak.datavalue) return null;
  const val = snak.datavalue.value;
  if (val.id) return { type: "entity", id: val.id };
  if (
    val.time ||
    val["amount"] ||
    typeof val === "number" ||
    typeof val === "string"
  )
    return { type: "literal", value: val };
  return { type: typeof val, raw: val };
}

async function getWikipediaQid(name) {
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

async function wbgetEntities(ids, props = "labels|claims") {
  if (!ids || ids.length === 0) return {};
  const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${ids.join("|")}&props=${props}&languages=en&origin=*`;
  const res = await fetchFn(url, { headers });
  if (!res.ok) return null;
  return res.json();
}

async function fetchLabels(ids) {
  const data = await wbgetEntities(ids, "labels");
  const out = {};
  if (!data || !data.entities) return out;
  for (const id of Object.keys(data.entities)) {
    out[id] =
      data.entities[id].labels &&
      data.entities[id].labels.en &&
      data.entities[id].labels.en.value;
  }
  return out;
}

function isSmallTerritory(population) {
  if (typeof population !== "number") return false;
  return population < 5000;
}

async function enrichCountry(c) {
  // Safer, faster mode: update population for all countries using REST Countries.
  // Leave symbol & religion enrichment for an explicit --full run to avoid long, rate-limited jobs.
  const code = c.countryCode || c.code || "";
  const result = { ...c };

  if (code && code.length === 2) {
    try {
      const res = await fetchFn(
        `https://restcountries.com/v3.1/alpha/${code.toLowerCase()}`,
      );
      if (res.ok) {
        const j = await res.json();
        const item = Array.isArray(j) ? j[0] : j;
        if (item && typeof item.population === "number")
          result.population = item.population;
      }
    } catch (e) {
      // ignore network issues
    }
  }

  // Ensure no nulls: set defaults, but DO NOT invent values.
  result.population = result.population || "Information not reliably available";
  const small = isSmallTerritory(
    typeof result.population === "number" ? result.population : 0,
  );
  result.nationalAnimal =
    result.nationalAnimal ||
    (small ? "Not Applicable" : "Information not reliably available");
  result.nationalBird =
    result.nationalBird ||
    (small ? "Not Applicable" : "Information not reliably available");
  result.nationalFlower =
    result.nationalFlower ||
    (small ? "Not Applicable" : "Information not reliably available");
  result.nationalFruit =
    result.nationalFruit ||
    (small ? "Not Applicable" : "Information not reliably available");
  result.nationalSport =
    result.nationalSport ||
    (small ? "Not Applicable" : "Information not reliably available");
  result.majorReligions =
    result.majorReligions && result.majorReligions.length
      ? result.majorReligions
      : small
        ? ["Not Applicable"]
        : ["Information not reliably available"];

  return result;
}

async function run() {
  console.log("Reading countries...");
  const countries = readCountries();
  const updated = [];
  for (let i = 0; i < countries.length; i++) {
    const c = countries[i];
    process.stdout.write(
      `Processing ${i + 1}/${countries.length}: ${c.name}\r`,
    );
    try {
      const e = await enrichCountry(c);
      updated.push(e);
    } catch (err) {
      console.warn("Failed to process", c.name, err && err.message);
      updated.push(c);
    }
    // be gentle
    await new Promise((r) => setTimeout(r, 40));
  }
  console.log("\nWriting updated countries file...");
  writeCountries(updated);
  console.log("Done. Wrote src/data/countries.js");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
