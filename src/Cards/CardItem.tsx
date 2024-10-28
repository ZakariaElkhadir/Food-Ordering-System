import Card from "./Cards";
import pizza from '../assets/food-images/pizza.png'
import burger from '../assets/food-images/cheeseburger.png'
import salad from '../assets/food-images/salad.png'
function CardItem() {
    return (
        <div className="cards">
            <Card
                title="Pizza Filled"
                description="Food"
                image={pizza}
                price="$10.00"
            />

             <Card
                title="Cheese Burger "
                description="Food"
                image={burger}
                price="$10.00"
            />

            <Card 
            title="Tomato Salad"
            description="Food"
            image={salad}
            price="$20.00"/>

        </div>
    );
}

export default CardItem;