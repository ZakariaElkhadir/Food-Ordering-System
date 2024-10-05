import About from "../About/About";
import CardItem from "../Cards/CardItem";
import HeroSection from "../HeroSection/HeroSection";

const Body = () =>{
    return (
        <div>
            <HeroSection/>
            <CardItem/>
            <div id="about-section">
                <About/>
            </div>
        </div>
    )
}
export default Body;