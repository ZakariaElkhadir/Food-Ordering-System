import './Cards.scss';
import pizza from '../assets/food-images/pizza.png'
interface CardProps {
    image: string;
    title: string;
    description: string;
    price: string;
}

function Card({ image, title, description, price }: CardProps) {
    return (
        <section className='card-container'>
            <div className="card">
                {image && <img src={pizza} width={200} alt={title} />}
                <h2>{title}</h2>
                <p>{description}</p>
                <p>{price}</p>
                <button>Buy Now</button>
            </div>
        </section>
    );
}

export default Card;