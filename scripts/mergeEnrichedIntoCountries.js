import fs from "fs";

async function loadCountries() {
  const mod = await import("../src/data/countries.js");
  return mod.default;
}

async function loadEnriched() {
  try {
    const m = await import("../src/data/enrichedCountries.js");
    return m.default;
  } catch (e) {
    return {};
  }
}

async function loadLocalSymbols() {
  try {
    const m = await import("../src/data/nationalSymbols.js");
    return m.default;
  } catch (e) {
    return {};
  }
}

function writeCountries(arr) {
  const out = `// Merged file - enriched values injected\nexport default ${JSON.stringify(arr, null, 2)}\n`;
  fs.writeFileSync("src/data/countries.js", out);
}

function ensure(obj, path, val) {
  if (!obj) return;
  const keys = path.split(".");
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    cur[k] = cur[k] || {};
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = val;
}

function cca2Of(c) {
  return (
    c.countryCode ||
    c.country_code ||
    c.code ||
    c.cca2 ||
    ""
  ).toUpperCase();
}

async function merge() {
  const countries = await loadCountries();
  const enriched = await loadEnriched();
  const local = await loadLocalSymbols();

  const out = countries.map((c) => {
    const code = cca2Of(c);
    const e = enriched && enriched[code] ? enriched[code] : null;
    const ls = local && local[code] ? local[code] : null;

    const ns = {
      animal:
        (e && e.nationalSymbols && e.nationalSymbols.animal) ||
        (ls && ls.animal) ||
        c.nationalAnimal ||
        "Information not reliably available",
      bird:
        (e && e.nationalSymbols && e.nationalSymbols.bird) ||
        (ls && ls.bird) ||
        c.nationalBird ||
        "Information not reliably available",
      flower:
        (e && e.nationalSymbols && e.nationalSymbols.flower) ||
        (ls && ls.flower) ||
        c.nationalFlower ||
        "Information not reliably available",
      fruit:
        (e && e.nationalSymbols && e.nationalSymbols.fruit) ||
        (ls && ls.fruit) ||
        c.nationalFruit ||
        "Information not reliably available",
      sport:
        (e && e.nationalSymbols && e.nationalSymbols.sport) ||
        (ls && ls.sport) ||
        c.nationalSport ||
        "Information not reliably available",
    };

    const majorReligions =
      (e && e.majorReligions) || (ls && ls.religions) || c.majorReligions || [];

    return Object.assign({}, c, {
      nationalAnimal: ns.animal,
      nationalBird: ns.bird,
      nationalFlower: ns.flower,
      nationalFruit: ns.fruit,
      nationalSport: ns.sport,
      majorReligions: majorReligions,
      description: (e && e.cultureDescription) || c.description,
    });
  });

  writeCountries(out);
  console.log("Wrote merged src/data/countries.js with enriched overrides");
}

merge().catch((e) => {
  console.error(e);
  process.exit(1);
});
