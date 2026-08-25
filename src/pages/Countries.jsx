import { useState, useMemo } from "react";
import CountryGrid from "../components/CountryGrid";
import BackButton from "../components/BackButton";

export default function Countries({ countries = [] }) {
  const [q, setQ] = useState("");
  const [continent, setContinent] = useState("All");
  const [sort, setSort] = useState("name-asc");

  const continents = Array.from(
    new Set(countries.map((c) => c.continent)),
  ).filter(Boolean);

  const filtered = useMemo(() => {
    let res = countries.slice();
    if (q)
      res = res.filter((c) =>
        (c.name + " " + (c.capital || ""))
          .toLowerCase()
          .includes(q.toLowerCase()),
      );
    if (continent !== "All") res = res.filter((c) => c.continent === continent);
    if (sort === "name-asc") res.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") res.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "pop-desc") res.sort((a, b) => b.population - a.population);
    if (sort === "pop-asc") res.sort((a, b) => a.population - b.population);
    return res;
  }, [countries, q, continent, sort]);

  return (
    <div className="container countries-page">
      <BackButton />
      <h1>Countries</h1>
      <div className="controls">
        <input
          placeholder="Search country or capital"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
        >
          <option>All</option>
          {continents.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name-asc">A → Z</option>
          <option value="name-desc">Z → A</option>
          <option value="pop-desc">Largest population</option>
          <option value="pop-asc">Smallest population</option>
        </select>
      </div>
      <CountryGrid countries={filtered} />
    </div>
  );
}
