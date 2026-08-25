import fs from "fs";

const fetchFn =
  globalThis.fetch || (await import("node-fetch").then((m) => m.default));
const headers = {
  "User-Agent": "WorldWebEuropeEnricher/1.0 (contact: example@example.com)",
};

function readEnriched() {
  try {
    return require("../src/data/enrichedCountries").default;
  } catch (e) {
    return {};
  }
}

function writeEnriched(obj) {
  const text = `// Auto-updated enrichedCountries (Europe targets)\nconst enriched = ${JSON.stringify(obj, null, 2)}\nexport default enriched\n`;
  fs.writeFileSync("src/data/enrichedCountries.js", text);
}

async function getQidFromName(name) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(name)}&prop=pageprops&ppprop=wikibase_item&origin=*`;
  try {
    const r = await fetchFn(url, { headers });
    if (!r.ok) return null;
    const j = await r.json();
    const pages = j.query && j.query.pages;
    if (!pages) return null;
    const p = Object.values(pages)[0];
    return p && p.pageprops && p.pageprops.wikibase_item
      ? p.pageprops.wikibase_item
      : null;
  } catch (e) {
    return null;
  }
}

async function wbget(ids, props = "labels|claims") {
  if (!ids || ids.length === 0) return {};
  const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${ids.join("|")}&props=${props}&languages=en&origin=*`;
  const r = await fetchFn(url, { headers });
  if (!r.ok) return {};
  return r.json();
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
  const enriched = readEnriched();
  const targets = [
    "GB",
    "FR",
    "DE",
    "AL",
    "ES",
    "IT",
    "NL",
    "BE",
    "CH",
    "PL",
    "GR",
    "SE",
    "NO",
    "DK",
    "PT",
    "IE",
  ];
  for (const code of targets) {
    const e = enriched[code] || {};
    const name = e.cultureDescription || null;
    let qid = e.wikidataQid || null;
    if (!qid) {
      if (name) qid = await getQidFromName(name);
      if (!qid) {
        // try common country names
        const names = {
          GB: "United Kingdom",
          FR: "France",
          DE: "Germany",
          AL: "Albania",
          ES: "Spain",
          IT: "Italy",
          NL: "Netherlands",
          BE: "Belgium",
          CH: "Switzerland",
          PL: "Poland",
          GR: "Greece",
          SE: "Sweden",
          NO: "Norway",
          DK: "Denmark",
          PT: "Portugal",
          IE: "Ireland",
        };
        qid = await getQidFromName(names[code]);
      }
    }
    if (!qid) {
      console.log("No QID for", code);
      continue;
    }
    console.log("Fetching", code, qid);
    const ent = await wbget([qid], "labels|claims");
    if (!ent || !ent.entities || !ent.entities[qid]) continue;
    const claims = ent.entities[qid].claims || {};
    // collect referenced value ids
    const vals = [];
    const props = Object.keys(claims);
    for (const p of props) {
      for (const a of claims[p]) {
        const dv =
          a.mainsnak && a.mainsnak.datavalue && a.mainsnak.datavalue.value;
        if (dv && dv.id) vals.push(dv.id);
      }
    }
    const valLabelsResp = await wbget(vals, "labels");
    const valLabels = (valLabelsResp && valLabelsResp.entities) || {};

    // fetch prop labels
    const propLabelsResp = await wbget(props, "labels");
    const propLabels = (propLabelsResp && propLabelsResp.entities) || {};

    const symbols = {
      animal: null,
      bird: null,
      flower: null,
      fruit: null,
      sport: null,
    };
    for (const p of props) {
      const pl =
        propLabels[p] &&
        propLabels[p].labels &&
        propLabels[p].labels.en &&
        propLabels[p].labels.en.value;
      if (!pl) continue;
      const pll = pl.toLowerCase();
      if (
        !pll.includes("national") &&
        !pll.includes("symbol") &&
        !pll.includes("official")
      )
        continue;
      const mv = pickMainValue(claims, p);
      if (!mv) continue;
      let txt = null;
      if (mv.type === "entity")
        txt =
          valLabels[mv.id] &&
          valLabels[mv.id].labels &&
          valLabels[mv.id].labels.en &&
          valLabels[mv.id].labels.en.value;
      else if (mv.type === "literal") txt = mv.value;
      if (!txt) continue;
      if (pll.includes("animal") && !symbols.animal) symbols.animal = txt;
      if (pll.includes("bird") && !symbols.bird) symbols.bird = txt;
      if (pll.includes("flower") && !symbols.flower) symbols.flower = txt;
      if (pll.includes("fruit") && !symbols.fruit) symbols.fruit = txt;
      if (pll.includes("sport") && !symbols.sport) symbols.sport = txt;
    }

    const religions = [];
    if (claims["P140"]) {
      for (const a of claims["P140"]) {
        const dv =
          a.mainsnak && a.mainsnak.datavalue && a.mainsnak.datavalue.value;
        if (dv && dv.id) {
          const lab =
            valLabels[dv.id] &&
            valLabels[dv.id].labels &&
            valLabels[dv.id].labels.en &&
            valLabels[dv.id].labels.en.value;
          if (lab) religions.push(lab);
        }
      }
    }

    enriched[code] = enriched[code] || {};
    enriched[code].wikidataQid = qid;
    enriched[code].nationalSymbols = enriched[code].nationalSymbols || {};
    for (const k of ["animal", "bird", "flower", "fruit", "sport"]) {
      if (symbols[k]) enriched[code].nationalSymbols[k] = symbols[k];
      else if (
        !enriched[code].nationalSymbols[k] ||
        enriched[code].nationalSymbols[k] === "Not Applicable"
      )
        enriched[code].nationalSymbols[k] =
          "Information not reliably available";
    }
    if (religions.length) enriched[code].majorReligions = religions;
    // small delay
    await new Promise((r) => setTimeout(r, 500));
  }
  writeEnriched(enriched);
  console.log("Updated enrichedCountries.js for target Europe nations");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
