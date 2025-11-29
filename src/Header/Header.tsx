import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import menuIcon from "./Menu/menu-svg.svg";
import closeIcon from "./Menu/close-svg.svg";
import "./Header.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="nav-bar">
        <div className="logo">
          <NavLink to="/">Riad Flavors</NavLink>
        </div>
        <ul className={`nav-links ${isMenuOpen ? "nav-links--open" : ""}`}>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li style={{ cursor: "pointer" }}>
            <HashLink smooth to="/#about-section">
              About
            </HashLink>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <button className="menu-toggle" onClick={toggleMenu}>
          <img src={isMenuOpen ? closeIcon : menuIcon} alt="Menu Toggle" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
