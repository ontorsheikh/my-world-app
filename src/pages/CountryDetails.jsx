import { useParams, Link } from "react-router-dom";
import QuickFacts from "../components/QuickFacts";
import BackButton from "../components/BackButton";
import mergeCountryData from "../utils/mergeCountryData";

export default function CountryDetails({ countries = [] }) {
  const { countryName } = useParams();

  const loading = !countries || countries.length === 0;
  if (loading) {
    return (
      <div className="container">
        <BackButton fallback="/countries" />
        <h2>Loading...</h2>
      </div>
    );
  }

  const raw = countries.find((c) => c.slug === countryName);
  if (!raw) {
    return (
      <div className="container">
        <BackButton fallback="/countries" />
        <h2>Country not found</h2>
        <p>
          <Link to="/countries">Back to countries</Link>
        </p>
      </div>
    );
  }

  const country = mergeCountryData(raw);
  if (!country) {
    return (
      <div className="container">
        <BackButton fallback="/countries" />
        <h2>Country data unavailable</h2>
        <p>
          <Link to="/countries">Back to countries</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container country-page">
      <BackButton fallback="/countries" />
      <section className="hero-ctry">
        <img src={country.flag} alt={`${country.name} flag`} />
        <div>
          <h1>{country.name}</h1>
          <p className="muted">
            {(country.capital || []).join(", ")} • {country.continent}
          </p>
        </div>
      </section>

      <QuickFacts country={country} />

      <section className="info-grid">
        <div className="card">
          <h3>Language & Currency</h3>
          <p>
            <strong>Languages:</strong> {(country.languages || []).join(", ")}
          </p>
          <p>
            <strong>Currency:</strong> {(country.currencies || []).join(", ")}
          </p>
        </div>

        <div className="card national-symbols">
          <h3>National Symbols</h3>
          <div className="symbols-grid">
            <div className="symbol-card">
              🐾
              <div className="label">National Animal</div>
              <div className="val">{country.nationalSymbols.animal}</div>
            </div>
            <div className="symbol-card">
              🐦
              <div className="label">National Bird</div>
              <div className="val">{country.nationalSymbols.bird}</div>
            </div>
            <div className="symbol-card">
              🌸
              <div className="label">National Flower</div>
              <div className="val">{country.nationalSymbols.flower}</div>
            </div>
            <div className="symbol-card">
              🍎
              <div className="label">National Fruit</div>
              <div className="val">{country.nationalSymbols.fruit}</div>
            </div>
            <div className="symbol-card">
              🏆
              <div className="label">National Sport</div>
              <div className="val">{country.nationalSymbols.sport}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Major Religions</h3>
          <p>
            {country.majorReligions && country.majorReligions.length
              ? country.majorReligions.join(", ")
              : "Information not reliably available"}
          </p>
          <h3>Culture</h3>
          <p>{country.description}</p>
        </div>
      </section>
    </div>
  );
}
