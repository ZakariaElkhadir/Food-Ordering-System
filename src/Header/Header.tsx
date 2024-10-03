import './Header.scss'
function Header() {
    return(
        <>
            <header>
                <nav className="nav-bar">
                <div className="logo">Riad Flavors</div>
                <ul className='nav-links'>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#menu">Services</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
                </nav>
            </header>
        </>
    )
}
export default Header;