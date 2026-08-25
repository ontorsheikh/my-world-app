import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  return (
    <article className="country-card">
      <Link to={`/country/${country.slug}`}>
        <div className="flag-wrap">
          <img src={country.flag} alt={`${country.name} flag`} loading="lazy" />
        </div>
        <div className="card-body">
          <h3>{country.name}</h3>
          <p className="muted">
            {country.capital} • {country.continent}
          </p>
          <div className="meta">
            <span>Population: {country.population.toLocaleString()}</span>
            <span>{country.currencyCode}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
