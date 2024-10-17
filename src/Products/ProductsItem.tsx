import Card from "../Cards/Cards";
import pizza from '../assets/food-images/pizza.png';
import burger from '../assets/food-images/cheeseburger.png';
import salad from '../assets/food-images/salad.png';
import friedchicken from '../assets/food-images/fried_chicken.jpg';
import pikaso from '../assets/food-images/pikaso.jpeg';
import shawarma_pita from '../assets/food-images/shawarma_pita.jpg';
import squid_shrimp from '../assets/food-images/squid_shrimp.jpg';
import taco from '../assets/food-images/taco.jpg';

const products = [
    {
        title: "Fried Chicken",
        description: "hello world",
        image: friedchicken,
        price: "$10.00"
    },
    {
        title: "Pikaso",
        description: "hello world",
        image: pikaso,
        price: "$10.00"
    },
    {
        title: "Shawarma Pita",
        description: "hello world",
        image: shawarma_pita,
        price: "$10.00"
    },
    {
        title: "Squid Shrimp",
        description: "hello world",
        image: squid_shrimp,
        price: "$10.00"
    },
    {
        title: "Taco",
        description: "hello world",
        image: taco,
        price: "$10.00"
    }
];

function ProductsItem() {
    return (
        <div className="cards">
            {products.map((product, index) => (
                <Card
                    key={index}
                    title={product.title}
                    description={product.description}
                    image={product.image}
                    price={product.price}
                />
            ))}
        </div>
    );
}

export default ProductsItem;