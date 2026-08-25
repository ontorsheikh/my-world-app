import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ countries = [], onSelect }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return countries
      .filter((c) =>
        (c.name + " " + (c.capital || "")).toLowerCase().includes(s),
      )
      .slice(0, 8);
  }, [q, countries]);

  function clear() {
    setQ("");
  }

  return (
    <div className="searchbar">
      <div className="search-input">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a country or capital..."
          aria-label="Search countries"
        />
        <button onClick={clear} aria-label="Clear">
          ✖
        </button>
      </div>
      <div className="search-results">
        {q === "" ? (
          <div className="empty">
            Type to search countries by name or capital.
          </div>
        ) : results.length === 0 ? (
          <div className="empty">No country found</div>
        ) : (
          results.map((c) => (
            <button
              key={c.slug}
              className="result"
              onClick={() =>
                onSelect ? onSelect(c.slug) : navigate(`/country/${c.slug}`)
              }
            >
              <img src={c.flag} alt={`${c.name} flag`} loading="lazy" />
              <div>
                <div className="r-name">{c.name}</div>
                <div className="r-sub">{c.capital}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
