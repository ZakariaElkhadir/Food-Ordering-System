import contImage from "../assets/food-images/prawn-caesar.webp";
import "./HeroSection.scss";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <div className="hero-wrapper">
      <section className="hero-section">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-badge">Authentic Moroccan Cuisine</span>
            <h1 className="hero-title">Taste the Flavors of Morocco</h1>
            <p className="hero-subtitle">
              Experience authentic Moroccan cuisine crafted with passion and
              tradition. From aromatic tagines to sweet pastries, every dish
              tells a story.
            </p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">🍽️</span>
                <span>Fresh Ingredients</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⭐</span>
                <span>5-Star Rated</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🏺</span>
                <span>Cozy Atmosphere</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Scroll to="cards" smooth={true} duration={500}>
                <Link to='#'>
                  <button className="btn-primary">
                    Order Now
                    <span className="btn-icon">→</span>
                  </button>
                </Link>
              </Scroll>
              <Link to="/products">
                <button className="btn-secondary">
                  Explore Menu
                  <span className="btn-icon">→</span>
                </button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={contImage} alt="Delicious Moroccan cuisine" />
            <div className="image-decoration"></div>
            <div className="floating-badge">
              <span className="rating">4.9</span>
              <span className="reviews">500+ Reviews</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
