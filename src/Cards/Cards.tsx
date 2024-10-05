import React, { useState } from 'react';
import './Cards.scss';
import OrderForm from '../OrderForm/OrderForm'; // Make sure to create this component

interface CardProps {
    image: string;
    title: string;
    description: string;
    price: string;
}

interface OrderDetails {
    tableNumber: string;
    quantity: number;
}

function Card({ image, title, description, price }: CardProps) {
    const [showOrderForm, setShowOrderForm] = useState(false);

    const handleOrderClick = () => {
        setShowOrderForm(true);
    };

    const handleOrderSubmit = (orderDetails: OrderDetails) => {
        console.log('Order placed:', { title, price, ...orderDetails });
        setShowOrderForm(false);
        // Here you would typically send this data to your backend
    };

    const handleCloseForm = () => {
        setShowOrderForm(false);
    };

    return (
        <section className='card-container'>
            <div className="card">
                {image && <img src={image} width={200} alt={title} />}
                <h2>{title}</h2>
                <p>{description}</p>
                <p>{price}</p>
                <button onClick={handleOrderClick}>Buy Now</button>
            </div>
            {showOrderForm && (
                <OrderForm 
                    onSubmit={handleOrderSubmit} 
                    onClose={handleCloseForm} 
                />
            )}
        </section>
    );
}

export default Card;