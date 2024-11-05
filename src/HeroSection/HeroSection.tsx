import Header from "../Header/Header";
import contImage from '../assets/food-images/prawn-caesar.webp'
import './HeroSection.scss'
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
function HeroSection() {
    return (
        <>
        <Header/>
        <section className="Hero-section">
             <div className="container">
                <h2 style={{marginTop: '-50px'}}>Taste the Flavors of Morocco</h2>
                <div>
                <img src={contImage}width={500}  alt="salad plate" />
                </div>
             </div>
             
                <div className="button">
                    <Scroll to="cards" smooth={true} duration={500}>
                        <button className="btn-1">Order now</button>
                    </Scroll>
                    <Link to='/products'>
                    <button className="btn-2">Show More</button>
                    </Link>
                </div>
            
        </section>
        
        </>
    )
}
export default HeroSection;