import chef from '../assets/Toolsimg/chef.png'
import './About.scss'

function About() {
    return (
        <div className='about-section'>
            <div className='about-container'>
                <div className='about-content'>
                    <h2 className='about-title'>Our Story</h2>
                    <div className='about-text'>
                        <p className='quote'>
                            At the heart of our restaurant is a passionate team of chefs dedicated to crafting exceptional culinary experiences. Each chef brings their unique background and expertise, blending creativity with traditional techniques to create innovative dishes that celebrate the finest ingredients.
                        </p>
                        <p className='quote'>
                            Their commitment to quality and presentation transforms every meal into a work of art, inviting guests to savor not just flavors, but stories. Join us in our culinary journey, where every plate tells a tale of passion, precision, and a love for food.
                        </p>
                    </div>
                </div>
                <div className='about-image'>
                    <img src={chef} alt="Our talented chef" />
                </div>
            </div>
        </div>
    )
}

export default About;