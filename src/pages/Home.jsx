import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CountryGrid from "../components/CountryGrid";
import BackButton from "../components/BackButton";


import member1 from "../assets/admn-1.jpg";
import member2 from "../assets/co-founder.jpg"; 



const teamMembers = [
  {
    image: member1,
    role: "Md. Ontor Sheikh, CEO and Founder"
  },
  {
    image: member2,
    role: "Md. Ashim Sheikh, CMO and Co-Founder"
  }
  
];

export default function Home({ countries = [] }) {
  const [random, setRandom] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCountries = countries.length;
  const continents = Array.from(
    new Set(countries.map((c) => c.continent)),
  ).length;

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  function pickRandom() {
    const i = Math.floor(Math.random() * countries.length);
    setRandom(countries[i]);
  }

  const currentMember = teamMembers[currentIndex];

  return (
    <div className="home container">
      <BackButton />
      <section className="hero">
        <div className="hero-content">
          <div className="hero-copy">
            <p className="hero-kicker">A world of stories, one website</p>
            <h1>Explore Every Country in the World</h1>
            <p>
              Discover countries, capitals, cultures, languages, currencies and
              fascinating national symbols.
            </p>
            <div className="hero-actions">
              <Link to="/countries" className="btn primary">
                Explore Countries
              </Link>
              <Link to="/continents" className="btn">
                Explore Continents
              </Link>
            </div>
            <div className="hero-search">
              <SearchBar countries={countries} />
            </div>
          </div>
          
          {/* অটোমেটিক স্ক্রোলিং শোকেস সেকশন */}
          <div className="hero-showcase" aria-label="Explore more country">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            
            <div className="hero-image-frame fade-animation" key={currentIndex}>
              <img src={currentMember.image} alt={currentMember.role} />
            </div>
            
            <span className="hero-showcase-label fade-animation" key={`label-${currentIndex}`}>
              {currentMember.role}
            </span>
          </div>
        </div>
      </section>

      <section className="world-stats">
        <div className="stat">
          Total countries
          <br />
          <strong>{totalCountries}</strong>
        </div>
        <div className="stat">
          Continents
          <br />
          <strong>{continents}</strong>
        </div>
        <div className="stat">
          Languages
          <br />
          <strong>7000+</strong>
        </div>
        <div className="stat">
          Currencies
          <br />
          <strong>195+</strong>
        </div>
      </section>

      <section className="featured">
        <h2>Featured countries</h2>
        <CountryGrid countries={countries.slice(0, 6)} />
      </section>

      <section className="random">
        <h2>Discover a Random Country</h2>
        <button className="btn" onClick={pickRandom}>
          Discover
        </button>
        {random && (
          <div className="random-card">
            <img src={random.flag} alt={`${random.name} flag`} />
            <div>
              <h3>{random.name}</h3>
              <p>
                {random.capital} • {random.continent}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}