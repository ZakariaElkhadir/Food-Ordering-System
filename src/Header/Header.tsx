import './Header.scss'
import { HashLink as Link } from 'react-router-hash-link'
function Header() {
    return(
        <>
            <header>
                <nav className="nav-bar">
                <div className="logo">
                    <Link to="/">Riad Flavors</Link>
                </div>
                <ul className='nav-links'>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#menu">Services</a></li>
                  <li> <Link to="/#about-section">About</Link></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
                </nav>
            </header>
        </>
    )
}
export default Header;