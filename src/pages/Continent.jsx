import CountryGrid from "../components/CountryGrid";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import populationOverrides from "../data/populationOverrides";

export default function Continent({ countries = [] }) {
  const { continentName } = useParams();
  const key = continentName.charAt(0).toUpperCase() + continentName.slice(1);
  const list = countries.filter(
    (c) =>
      c.continent && c.continent.toLowerCase() === continentName.toLowerCase(),
  );
  const totalPopulation = list.reduce(
    (total, country) =>
      total +
      (populationOverrides[country.countryCode] || country.population || 0),
    0,
  );
  const totalArea = list.reduce(
    (total, country) => total + (country.area || 0),
    0,
  );
  const regions = Array.from(
    new Set(list.map((country) => country.subregion).filter(Boolean)),
  );
  const languages = Array.from(
    new Set(list.flatMap((country) => country.languages || []).filter(Boolean)),
  );
  const currencies = Array.from(
    new Set(
      list
        .map((country) => country.currencyCode || country.currencyName)
        .filter(Boolean),
    ),
  );

  const description =
    continentName.toLowerCase() === "americas"
      ? "Explore North America, Central America, South America and the Caribbean through country facts, flags, capitals, cultures and national symbols."
      : `Explore countries, facts and cultures across ${key}.`;

  return (
    <div className="container continent-page">
      <BackButton fallback="/continents" />
      <header className="continent-hero">
        <p className="continent-kicker">Regional atlas</p>
        <h1>{key}</h1>
        <p className="continent-description">{description}</p>
        <div className="continent-stats">
          <div>
            <strong>{list.length}</strong>
            <span>Countries</span>
          </div>
          <div>
            <strong>{totalPopulation.toLocaleString()}</strong>
            <span>Population</span>
          </div>
          <div>
            <strong>{totalArea.toLocaleString()}</strong>
            <span>Area (km²)</span>
          </div>
        </div>
      </header>
      <section className="continent-information">
        <div>
          <h2>At a glance</h2>
          <p>
            {regions.length} regions, {languages.length} recorded languages and{" "}
            {currencies.length} currencies are represented in this collection.
          </p>
        </div>
        <div className="continent-tags">
          {regions.slice(0, 6).map((region) => (
            <span key={region}>{region}</span>
          ))}
        </div>
      </section>
      <h2 className="continent-countries-title">All countries in {key}</h2>
      <CountryGrid countries={list} />
    </div>
  );
}
