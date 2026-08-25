import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function Header({ countries = [] }) {
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="container nav-row">
        <div className="brand">
          <Link to="/" className="logo">
            <span className="logo-mark" aria-hidden="true">
              OW
            </span>
            <span className="logo-copy">
              <strong>Ontor's</strong>
              <span>World Web</span>
            </span>
          </Link>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setOpenMenu((value) => !value)}
          aria-label="Toggle navigation menu"
          aria-expanded={openMenu}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`main-nav${openMenu ? " is-open" : ""}`}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/countries" onClick={() => setOpenMenu(false)}>
            Countries
          </NavLink>
          <NavLink to="/continents" onClick={() => setOpenMenu(false)}>
            Continents
          </NavLink>
          <NavLink to="/about" onClick={() => setOpenMenu(false)}>
            About
          </NavLink>
        </nav>
        <div className="actions">
          <button
            className="search-toggle"
            onClick={() => setOpenSearch((v) => !v)}
            aria-label="Search"
          >
            🔍
          </button>
          <ThemeToggle />
        </div>
      </div>

      {openSearch && (
        <div className="search-panel">
          <SearchBar
            countries={countries}
            onSelect={(slug) => {
              navigate(`/country/${slug}`);
              setOpenSearch(false);
            }}
          />
        </div>
      )}
    </header>
  );
}
