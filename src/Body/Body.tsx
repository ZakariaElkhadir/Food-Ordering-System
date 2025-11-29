import About from "../About/About";
import CardItem from "../Cards/CardItem";

import HeroSection from "../HeroSection/HeroSection";
import "./Body.scss";

const Body = () => {
  return (
    <div className="body-container">
      <HeroSection />
      <section className="menu-section" id="cards">
        <div className="menu-header">
          <h2>Our Special Menu</h2>
          <p>Discover our most popular and delicious dishes</p>
        </div>
        <CardItem />
      </section>
      <section id="about-section" className="about-section">
        <About />
      </section>
    </div>
  );
};

export default Body;
