import fs from "fs";

function readCountries() {
  const src = fs.readFileSync("src/data/countries.js", "utf8");
  const stripped = src.replace(/^[\s\S]*?export default\s*/, "");
  const jsonText = stripped.replace(/;?\s*$/, "");
  return JSON.parse(jsonText);
}

function writeEnriched(obj) {
  const text = `// Auto-generated enrichedCountries (Europe export)
const enriched = ${JSON.stringify(obj, null, 2)}
export default enriched
`;
  fs.writeFileSync("src/data/enrichedCountries.js", text);
}

function cca2(c) {
  return (
    c.countryCode ||
    c.country_code ||
    c.code ||
    c.cca2 ||
    ""
  ).toUpperCase();
}

function makeEntry(c) {
  return {
    population: c.population || null,
    currencyName: c.currencyName || c.currency || null,
    currencyCode: c.currencyCode || null,
    nationalSymbols: {
      animal:
        c.nationalAnimal ||
        c.national_animal ||
        "Information not reliably available",
      bird:
        c.nationalBird ||
        c.national_bird ||
        "Information not reliably available",
      flower:
        c.nationalFlower ||
        c.national_flower ||
        "Information not reliably available",
      fruit:
        c.nationalFruit ||
        c.national_fruit ||
        "Information not reliably available",
      sport:
        c.nationalSport ||
        c.national_sport ||
        "Information not reliably available",
    },
    majorReligions: c.majorReligions || c.religions || [],
    cultureDescription: c.description || c.culture || "",
    wikidataQid: c.wikidataQid || null,
  };
}

function run() {
  const countries = readCountries();
  const europe = countries.filter(
    (c) => (c.continent || "").toLowerCase() === "europe",
  );
  const out = {};
  for (const c of europe) {
    const code = cca2(c) || c.slug?.slice(0, 2).toUpperCase();
    if (!code) continue;
    out[code] = makeEntry(c);
  }
  writeEnriched(out);
  console.log(
    "Wrote enrichedCountries.js with",
    Object.keys(out).length,
    "European entries",
  );
}

run();
