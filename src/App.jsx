import { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import CountryDetails from "./pages/CountryDetails";
import Continents from "./pages/Continents";
import Continent from "./pages/Continent";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import countries from "./data/countries";
import "./index.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="app-root">
      <ScrollToTop />
      <Header countries={countries} />
      <main>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home countries={countries} />} />
            <Route
              path="/countries"
              element={<Countries countries={countries} />}
            />
            <Route
              path="/country/:countryName"
              element={<CountryDetails countries={countries} />}
            />
            <Route
              path="/continents"
              element={<Continents countries={countries} />}
            />
            <Route
              path="/continent/:continentName"
              element={<Continent countries={countries} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
