import './Footer.scss'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Menu</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>Email: info@moroccanfood.com</li>
                        <li>Phone: +212 6XX-XXXXXX</li>
                        <li>Address: Casablanca, Morocco</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Zakaria Elkhadir. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;