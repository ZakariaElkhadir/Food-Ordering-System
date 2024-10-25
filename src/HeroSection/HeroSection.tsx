import Header from "../Header/Header";
import contImage from '../assets/food-images/prawn-caesar.png'
import './HeroSection.scss'
import { Link } from "react-router-dom";
function HeroSection() {
    return (
        <>
        <Header/>
        <section className="Hero-section">
             <div className="container">
                <h2 >We serve the Test You Love</h2>
                <div>
                <img src={contImage} width={500}  alt="salad plate" />
                </div>
             </div>
             
                <div className="button">
                    <Link to='/products'>
                    <button className="btn-1">Order now</button>
                    </Link>
                    <button className="btn-2">Sho</button>
                </div>
            
        </section>
        
        </>
    )
}
export default HeroSection;