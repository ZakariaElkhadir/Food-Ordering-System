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
        description: "Food",
        image: friedchicken,
        price: "100 DH"
    },
    {
        title: "Pikaso",
        description: "Food",
        image: pikaso,
        price: "120 DH"
    },
    {
        title: "Shawarma Pita",
        description: "Food",
        image: shawarma_pita,
        price: "80 DH"
    },
    {
        title: "Orange",
        description: "Drink",
        image: orange,
        price: "20 DH"
    },
    {
        title: "Mojito",
        description: "Drink",
        image: mojito,
        price: "30 DH"
    },
    {
        title: "Strawberry",
        description: "Drink",
        image: strawberry,
        price: "25 DH"
    },
    {
        title: "Squid Shrimp",
        description: "Food",
        image: squid_shrimp,
        price: "150 DH"
    },
    {
        title: "Taco",
        description: "Food",
        image: taco,
        price: "50 DH"
    },
    {
        title: "Shawarma Dish",
        description: "Food",
        image: shawarmadish,
        price: "90 DH"
    },
    {
        title: "Pina Colada",
        description: "Food",
        image: pina_colada,
        price: "40 DH"
    },
    {
        title: "Black Coffee",
        description: "Drink",
        image: black_coffee,
        price: "15 DH"
    },
    {
        title: "Capoccino",
        description: "Drink",
        image: capoccino,
        price: "20 DH"
    },
    {
        title: "Tea",
        description: "Drink",
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