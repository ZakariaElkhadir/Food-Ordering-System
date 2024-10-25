import  { useState } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from './Menu/menu-svg.svg';
import closeIcon from './Menu/close-svg.svg';
import './Header.scss';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <nav className="nav-bar">
                <div className="logo">
                    <Link to="/">Riad Flavors</Link>
                </div>
                <ul className={`nav-links ${isMenuOpen ? 'nav-links--open' : ''}`}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Services</a></li>
                    <li><Link to="/about-section">About</Link></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <button className="menu-toggle" onClick={toggleMenu}>
                    <img src={isMenuOpen ? closeIcon : menuIcon} alt="Menu Toggle" />
                </button>
            </nav>
        </header>
    );
};

export default Header;
