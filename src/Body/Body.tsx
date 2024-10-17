import About from "../About/About";
import CardItem from "../Cards/CardItem";
import Footer from "../Footer/Footer";
import HeroSection from "../HeroSection/HeroSection";

const Body = () =>{
    return (
        <div>
            <HeroSection/>
            <CardItem/>
            <div id="about-section">
                <About/>
            </div>
            <Footer/>
        </div>
    )
}
export default Body;