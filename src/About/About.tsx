import chef from '../assets/Toolsimg/chef.png'
import './About.scss'
function About(){
    return (
        <>
        <div className='about-section'>
        <h2 >About US</h2>
            <div className='about-container'>
            
                <img src={chef} alt="chef"/>
                <p><q>
                    ShareAt the heart of our restaurant is a passionate team of chefs dedicated to crafting exceptional culinary experiences.<br/> Each chef brings their unique background and expertise, blending creativity with traditional techniques to create<br/> innovative dishes that celebrate the finest ingredients.
                    Their commitment to quality and presentation transforms<br/> every meal into a work of art, inviting guests to savor not just flavors,<br/> but stories. Join us in our culinary journey, where every plate tells a tale of passion, precision, and a love for food.
                </q></p>
            </div>
        </div>
        </>
    )
}
export default About;