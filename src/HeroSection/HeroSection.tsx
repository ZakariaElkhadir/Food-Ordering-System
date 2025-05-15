import Header from "../Header/Header";
import contImage from '../assets/food-images/prawn-caesar.webp'
import './HeroSection.scss'
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";

function HeroSection() {
    return (
        <div className="hero-wrapper">
            <Header />
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">Taste the Flavors of Morocco</h1>
                        <p className="hero-subtitle">Experience authentic Moroccan cuisine crafted with passion and tradition</p>
                        <div className="hero-buttons">
                            <Scroll to="cards" smooth={true} duration={500}>
                                <button className="btn-primary">Order Now</button>
                            </Scroll>
                            <Link to='/products'>
                                <button className="btn-secondary">Explore Menu</button>
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={contImage} alt="Delicious Moroccan cuisine" />
                        <div className="image-decoration"></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HeroSection;