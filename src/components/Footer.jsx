import { Link } from "react-router-dom";
import adminImage from "../assets/admn-1.jpg";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-brand">
              Ontor's World Web
            </Link>
            <p>Made for exploring the world · © {new Date().getFullYear()}</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/countries">Countries</a>
              </li>
              <li>
                <a href="/continents">Continents</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Continents</h4>
            <ul>
              <li>
                <a href="/continent/asia">Asia</a>
              </li>
              <li>
                <a href="/continent/europe">Europe</a>
              </li>
              <li>
                <a href="/continent/africa">Africa</a>
              </li>
              <li>
                <a href="/continent/americas">Americas</a>
              </li>
              <li>
                <a href="/continent/oceania">Oceania</a>
              </li>
              <li>
                <a href="/continent/antarctic">Antarctic</a>
              </li>
            </ul>
          </div>
          <div className="admin-profile">
            <img src={adminImage} alt="Admin Ontor" />
            <div>
              <h4>Website Admin</h4>
              <p>Ontor Sheikh</p>
              <a href="mailto:skontorsheikh1613@gmail.com">
                skontorsheikh1613@gmail.com
              </a> 
             <p>Mob: +8801720409084</p> 
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
