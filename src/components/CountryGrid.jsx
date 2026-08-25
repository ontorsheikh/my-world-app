import CountryCard from "./CountryCard";

export default function CountryGrid({ countries }) {
  return (
    <section className="country-grid">
      {countries.map((c) => (
        <CountryCard key={c.slug} country={c} />
      ))}
    </section>
  );
}
