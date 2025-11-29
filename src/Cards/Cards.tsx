import { useState } from "react";
import { useOrderStore } from "./store/orderStore";
import OrderForm from "../OrderForm/OrderForm";
import "./Cards.scss";

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
  const [showSuccess, setShowSuccess] = useState(false);
  const addOrder = useOrderStore((state) => state.addOrder);

  const handleOrderClick = () => {
    setShowOrderForm(true);
    setShowSuccess(false);
  };

  const handleOrderSubmit = (orderDetails: OrderDetails) => {
    const orderData = {
      title,
      price,
      ...orderDetails,
      timestamp: new Date().toISOString(),
      status: "pending" as const,
    };

    addOrder(orderData);
    setShowOrderForm(false);
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleCloseForm = () => {
    setShowOrderForm(false);
  };

  return (
    <section className="card-container">
      <div className="card">
        {image && <img src={image} width={200} alt={title} />}
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{price}</p>
        <button onClick={handleOrderClick}>Buy Now</button>
        {showSuccess && (
          <div className="success-message">Order placed successfully!</div>
        )}
      </div>
      {showOrderForm && (
        <OrderForm onSubmit={handleOrderSubmit} onClose={handleCloseForm} />
      )}
    </section>
  );
}

export default Card;
