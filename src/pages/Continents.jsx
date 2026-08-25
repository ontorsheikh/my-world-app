import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Continents({ countries = [] }) {
  const map = {};
  countries.forEach((c) => {
    map[c.continent] = (map[c.continent] || 0) + 1;
  });
  const list = Object.keys(map).filter(Boolean);

  return (
    <div className="container continents-page">
      <BackButton />
      <h1>Continents</h1>
      <div className="continents-grid">
        {list.map((ct) => (
          <Link
            key={ct}
            to={`/continent/${ct.toLowerCase()}`}
            className="continent-card"
          >
            <h3>{ct}</h3>
            <p>{map[ct]} countries</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
