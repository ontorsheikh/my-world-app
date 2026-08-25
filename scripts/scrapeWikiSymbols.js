import fs from "fs";

const fetchFn =
  globalThis.fetch || (await import("node-fetch").then((m) => m.default));
const headers = {
  "User-Agent": "WorldWebWikiScraper/1.0 (contact: example@example.com)",
};

function readEnriched() {
  try {
    return require("../src/data/enrichedCountries").default;
  } catch (e) {
    return {};
  }
}

function writeEnriched(obj) {
  const text = `// Auto-updated enrichedCountries (Wikipedia scrape)
const enriched = ${JSON.stringify(obj, null, 2)}
export default enriched
`;
  fs.writeFileSync("src/data/enrichedCountries.js", text);
}

function cleanHtml(s) {
  if (!s) return "";
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/\[.*?\]/g, "")
    .trim();
}

async function fetchPage(name) {
  const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`;
  const r = await fetchFn(url, { headers });
  if (!r.ok) return null;
  return r.text();
}

function extractInfoboxValue(html, label) {
  const re = new RegExp(
    `<th[^>]*>\\s*${label}\\s*</th>\\s*<td[^>]*>([\s\S]*?)</td>`,
    "i",
  );
  const m = html.match(re);
  if (!m) return null;
  return cleanHtml(m[1]);
}

async function run() {
  const enriched = readEnriched();
  const targets = [
    "United_Kingdom",
    "France",
    "Germany",
    "Albania",
    "Spain",
    "Italy",
    "Netherlands",
    "Belgium",
    "Switzerland",
    "Poland",
    "Greece",
    "Sweden",
    "Norway",
    "Denmark",
    "Portugal",
    "Ireland",
  ];
  for (const name of targets) {
    console.log("Scraping", name);
    const html = await fetchPage(name);
    if (!html) {
      console.log("Failed to fetch", name);
      continue;
    }
    const codeMap = {
      United_Kingdom: "GB",
      France: "FR",
      Germany: "DE",
      Albania: "AL",
      Spain: "ES",
      Italy: "IT",
      Netherlands: "NL",
      Belgium: "BE",
      Switzerland: "CH",
      Poland: "PL",
      Greece: "GR",
      Sweden: "SE",
      Norway: "NO",
      Denmark: "DK",
      Portugal: "PT",
      Ireland: "IE",
    };
    const code = codeMap[name];
    enriched[code] = enriched[code] || {};
    enriched[code].nationalSymbols = enriched[code].nationalSymbols || {};
    const fields = [
      "National animal",
      "National bird",
      "National flower",
      "National fruit",
      "National sport",
      "Symbol",
    ];
    const mapping = {
      "National animal": "animal",
      "National bird": "bird",
      "National flower": "flower",
      "National fruit": "fruit",
      "National sport": "sport",
    };
    for (const f of fields) {
      const val = extractInfoboxValue(html, f);
      if (val) {
        const key = mapping[f];
        if (key) enriched[code].nationalSymbols[key] = val;
      }
    }
    // religions
    const rel =
      extractInfoboxValue(html, "Religion") ||
      extractInfoboxValue(html, "Religions");
    if (rel) {
      enriched[code].majorReligions = rel
        .split(/[,;]\\s*/)
        .map((s) => s.trim());
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  writeEnriched(enriched);
  console.log("Wrote enrichedCountries.js with scraped symbols for targets");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
