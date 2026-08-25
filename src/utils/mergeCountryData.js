import nationalSymbols from "../data/nationalSymbols";
import enriched from "../data/enrichedCountries";
import majorReligionsByCode from "../data/majorReligions";
import populationOverrides from "../data/populationOverrides";

function ensureArray(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === "object") return Object.values(v);
  return [v];
}

export default function mergeCountryData(apiCountry) {
  if (!apiCountry) return null;
  const cca2 = (
    apiCountry.cca2 ||
    apiCountry.countryCode ||
    apiCountry.country_code ||
    ""
  ).toUpperCase();
  const symbols = nationalSymbols[cca2] || null;
  const extra = enriched && enriched[cca2] ? enriched[cca2] : null;

  const mergedNationalSymbols = {
    animal:
      (extra && extra.nationalSymbols && extra.nationalSymbols.animal) ||
      (symbols && symbols.animal) ||
      apiCountry.nationalAnimal ||
      "Information not reliably available",
    bird:
      (extra && extra.nationalSymbols && extra.nationalSymbols.bird) ||
      (symbols && symbols.bird) ||
      apiCountry.nationalBird ||
      "Information not reliably available",
    flower:
      (extra && extra.nationalSymbols && extra.nationalSymbols.flower) ||
      (symbols && symbols.flower) ||
      apiCountry.nationalFlower ||
      "Information not reliably available",
    fruit:
      (extra && extra.nationalSymbols && extra.nationalSymbols.fruit) ||
      (symbols && symbols.fruit) ||
      apiCountry.nationalFruit ||
      "Information not reliably available",
    sport:
      (extra && extra.nationalSymbols && extra.nationalSymbols.sport) ||
      (symbols && symbols.sport) ||
      apiCountry.nationalSport ||
      "Information not reliably available",
  };

  const majorReligions =
    (extra && extra.majorReligions) ||
    (symbols && symbols.religions) ||
    majorReligionsByCode[cca2] ||
    [];

  return {
    name:
      apiCountry.name ||
      apiCountry.name?.common ||
      apiCountry.name?.official ||
      "",
    officialName: apiCountry.name?.official || apiCountry.officialName || "",
    flag:
      (apiCountry.flags && (apiCountry.flags.svg || apiCountry.flags.png)) ||
      apiCountry.flag ||
      apiCountry.flagUrl ||
      apiCountry.flag ||
      "",
    code: cca2 || "",
    cca3: apiCountry.cca3 || apiCountry.countryCode3 || "",
    capital: ensureArray(
      (extra && extra.capital) ||
        apiCountry.capital ||
        apiCountry.capitalName ||
        apiCountry.capital ||
        [],
    ),
    continent:
      apiCountry.region ||
      apiCountry.continent ||
      (apiCountry.continents && apiCountry.continents[0]) ||
      "",
    region: apiCountry.region || "",
    subregion: apiCountry.subregion || "",
    area: apiCountry.area || 0,
    population:
      (extra && extra.population) ||
      populationOverrides[cca2] ||
      apiCountry.population ||
      0,
    languages: ensureArray((extra && extra.languages) || apiCountry.languages),
    currencies:
      extra && (extra.currencies || extra.currency)
        ? extra.currencies
          ? Object.keys(extra.currencies)
          : [extra.currency]
        : apiCountry.currencies
          ? Object.keys(apiCountry.currencies)
          : apiCountry.currency
            ? [apiCountry.currency]
            : apiCountry.currencyCode
              ? [apiCountry.currencyCode]
              : [],
    nationalSymbols: mergedNationalSymbols,
    majorReligions: majorReligions,
    callingCodes: apiCountry.idd
      ? apiCountry.idd.root
        ? (apiCountry.idd.suffixes || []).map(
            (s) => `${apiCountry.idd.root}${s}`,
          )
        : []
      : apiCountry.callingCodes || [],
    internetDomains: apiCountry.tld || apiCountry.topLevelDomain || [],
    timezones: apiCountry.timezones || [],
    borders: apiCountry.borders || [],
    landlocked: Boolean(apiCountry.landlocked),
    cultureDescription: (extra && extra.cultureDescription) || "",
  };
}
