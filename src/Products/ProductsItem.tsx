import Card from "../Cards/Cards";
import friedchicken from '../assets/food-images/fried_chicken.jpg';
import pikaso from '../assets/food-images/pikaso.jpeg';
import shawarma_pita from '../assets/food-images/shawarma_pita.jpg';
import squid_shrimp from '../assets/food-images/squid_shrimp.jpg';
import taco from '../assets/food-images/taco.jpg';
import shawarmadish from '../assets/food-images/shawarmadish.jpg';
import orange from '../assets/drinks-images/orange.jpg';
import mojito from '../assets/drinks-images/mojito.jpg';
import strawberry from '../assets/drinks-images/strawberry.jpg';
import pina_colada from '../assets/drinks-images/pina_colada_cocktail.jpg';
import black_coffee from '../assets/drinks-images/black_coffee.jpg';
import capoccino from '../assets/drinks-images/cappocino.jpg';
import tea from '../assets/drinks-images/tea.jpg';
const products = [
    {
        title: "Fried Chicken",
        description: "hello world",
        image: friedchicken,
        price: "100 DH"
    },
    {
        title: "Pikaso",
        description: "hello world",
        image: pikaso,
        price: "120 DH"
    },
    {
        title: "Shawarma Pita",
        description: "hello world",
        image: shawarma_pita,
        price: "80 DH"
    },
    {
        title: "Orange",
        description: "hello world",
        image: orange,
        price: "20 DH"
    },
    {
        title: "Mojito",
        description: "hello world",
        image: mojito,
        price: "30 DH"
    },
    {
        title: "Strawberry",
        description: "hello world",
        image: strawberry,
        price: "25 DH"
    },
    {
        title: "Squid Shrimp",
        description: "hello world",
        image: squid_shrimp,
        price: "150 DH"
    },
    {
        title: "Taco",
        description: "hello world",
        image: taco,
        price: "50 DH"
    },
    {
        title: "Shawarma Dish",
        description: "hello world",
        image: shawarmadish,
        price: "90 DH"
    },
    {
        title: "Pina Colada",
        description: "hello world",
        image: pina_colada,
        price: "40 DH"
    },
    {
        title: "Black Coffee",
        description: "hello world",
        image: black_coffee,
        price: "15 DH"
    },
    {
        title: "Capoccino",
        description: "hello world",
        image: capoccino,
        price: "20 DH"
    },
    {
        title: "Tea",
        description: "hello world",
        image: tea,
        price: "10 DH"
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