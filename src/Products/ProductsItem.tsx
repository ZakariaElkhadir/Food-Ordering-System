import Card from "../Cards/Cards";
import pizza from '../assets/food-images/pizza.png'
import burger from '../assets/food-images/cheeseburger.png'
import salad from '../assets/food-images/salad.png'
function ProductsItem() {
    return (
        <div className="cards">
            <Card
                title="Pizza Filled"
                description="hello world"
                image={pizza}
                price="$10.00"
            />

             <Card
                title="Cheese Burger "
                description="hello world"
                image={burger}
                price="$10.00"
            />

            <Card 
            title="Tomato Salad"
            description="hello world"
            image={salad}
            price="$20.00"/>
        </div>
    );
}

export default ProductsItem;