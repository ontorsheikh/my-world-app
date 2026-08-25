export default function QuickFacts({ country }) {
  const facts = [
    {
      label: "Area",
      value: country.area ? `${country.area.toLocaleString()} km²` : "—",
    },
    { label: "Population", value: country.population.toLocaleString() },
    { label: "Capital", value: country.capital || "—" },
    { label: "Continent", value: country.continent || "—" },
  ];

  return (
    <div className="quick-facts">
      {facts.map((f) => (
        <div key={f.label} className="fact">
          <div className="val">{f.value}</div>
          <div className="label">{f.label}</div>
        </div>
      ))}
    </div>
  );
}
