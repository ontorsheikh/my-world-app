import fs from "fs";

const fetchFn =
  globalThis.fetch || (await import("node-fetch").then((m) => m.default));

const endpoints = [
  "https://restcountries.com/v5.1/all",
  "https://restcountries.com/v3.1/all",
  "https://raw.githubusercontent.com/mledoze/countries/master/countries.json",
];

function safeName(d) {
  return d?.name?.common || d?.name || (typeof d === "string" ? d : "");
}

function safeFlag(d) {
  return (
    d?.flags?.svg ||
    d?.flags?.png ||
    d?.flag ||
    (d?.cca2 ? `https://flagcdn.com/w320/${d.cca2.toLowerCase()}.png` : "")
  );
}

function safeCapital(d) {
  if (Array.isArray(d?.capital)) return d.capital[0];
  return d?.capital || (d?.capitalInfo && d.capitalInfo[0]) || "";
}

async function run() {
  console.log("Fetching countries from endpoints...");
  let data = null;
  let used = null;

  for (const url of endpoints) {
    try {
      console.log("Trying", url);
      const res = await fetchFn(url);
      if (!res.ok) {
        console.warn("Non-ok response", res.status, url);
        continue;
      }
      const json = await res.json();
      if (Array.isArray(json) && json.length > 0) {
        data = json;
        used = url;
        break;
      }
      if (Array.isArray(json.data)) {
        data = json.data;
        used = url;
        break;
      }
      console.warn("Unexpected payload from", url);
    } catch (err) {
      console.warn("Fetch failed for", url, err && err.message);
    }
  }

  if (!Array.isArray(data)) {
    console.warn("No array response from endpoints, aborting generation.");
    return;
  }

  const mapped = data.map((d) => {
    const name = safeName(d) || "Unknown";
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const rawFlag = safeFlag(d);
    const code = d.cca2 || d.cca3 || d.alpha2 || d.alpha3 || "";
    // If the source only provided an emoji or a short value, prefer a reliable image URL
    const emojiRegex = /\p{Regional_Indicator}/u;
    const flagUrl =
      typeof rawFlag === "string" &&
      (rawFlag.length <= 3 || emojiRegex.test(rawFlag)) &&
      code
        ? `https://flagcdn.com/w320/${code.toLowerCase()}.png`
        : rawFlag;

    return {
      name,
      slug,
      flag: flagUrl,
      capital: safeCapital(d),
      continent: d.region || d.continent || d.subregion || "",
      area: d.area || null,
      languages: d.languages
        ? Array.isArray(d.languages)
          ? d.languages
          : Object.values(d.languages)
        : [],
      currencyName: d.currencies
        ? Object.values(d.currencies)[0]?.name || ""
        : "",
      currencyCode: d.currencies ? Object.keys(d.currencies)[0] || "" : "",
      nationalAnimal: null,
      nationalBird: null,
      nationalFruit: null,
      nationalFlower: null,
      nationalSport: null,
      majorReligions: [],
      population: d.population || 0,
      countryCode: d.cca2 || d.cca3 || d.alpha2 || d.alpha3 || "",
      description: d.cioc ? `${d.cioc} — ${safeName(d)}` : safeName(d),
    };
  });

  // Merge enriched overrides and local nationalSymbols where available
  let enriched = {};
  let localSymbols = {};
  try {
    enriched = (await import("../src/data/enrichedCountries.js")).default || {};
  } catch (e) {
    enriched = {};
  }
  try {
    localSymbols =
      (await import("../src/data/nationalSymbols.js")).default || {};
  } catch (e) {
    localSymbols = {};
  }

  for (const m of mapped) {
    const code = (m.countryCode || "").toUpperCase();
    const e = enriched[code];
    const ls = localSymbols[code];
    if (e) {
      if (e.population) m.population = e.population;
      if (e.capital) m.capital = e.capital;
      if (e.languages) m.languages = e.languages;
      if (e.currencyCode) m.currencyCode = e.currencyCode;
      if (e.currencyName) m.currencyName = e.currencyName;
      if (e.nationalSymbols) {
        m.nationalAnimal = e.nationalSymbols.animal || m.nationalAnimal;
        m.nationalBird = e.nationalSymbols.bird || m.nationalBird;
        m.nationalFlower = e.nationalSymbols.flower || m.nationalFlower;
        m.nationalFruit = e.nationalSymbols.fruit || m.nationalFruit;
        m.nationalSport = e.nationalSymbols.sport || m.nationalSport;
      }
      if (e.majorReligions) m.majorReligions = e.majorReligions;
      if (e.cultureDescription) m.description = e.cultureDescription;
      if (e.wikidataQid) m.wikidataQid = e.wikidataQid;
    }
    if (ls) {
      m.nationalAnimal = m.nationalAnimal || ls.animal || m.nationalAnimal;
      m.nationalBird = m.nationalBird || ls.bird || m.nationalBird;
      m.nationalFlower = m.nationalFlower || ls.flower || m.nationalFlower;
      m.nationalFruit = m.nationalFruit || ls.fruit || m.nationalFruit;
      m.nationalSport = m.nationalSport || ls.sport || m.nationalSport;
      m.majorReligions =
        m.majorReligions && m.majorReligions.length
          ? m.majorReligions
          : ls.religions || m.majorReligions;
    }
  }

  const out = `// Generated file - run scripts/fetchCountries.js to refresh\nexport default ${JSON.stringify(mapped, null, 2)}\n`;
  fs.writeFileSync("src/data/countries.js", out);
  console.log(
    "Wrote src/data/countries.js with",
    mapped.length,
    "entries (source:",
    used,
    ")",
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
