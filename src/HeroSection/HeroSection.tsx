import Header from "../Header/Header";
import contImage from '../assets/food-images/prawn-caesar.png'
import './HeroSection.scss'
function HeroSection() {
    return (
        <>
        <Header/>
        <section className="Hero-section">
             <div className="container">
                <h2 >We serve the Test <br/>You Love</h2>
                <img src={contImage} width={500}  alt="salad plate" />
             </div>
                <div className="button">
                    <button className="btn-1">Buy now</button>
                    <button className="btn-2">Sho</button>
                </div>
            
        </section>
        
        </>
    )
}
export default HeroSection;