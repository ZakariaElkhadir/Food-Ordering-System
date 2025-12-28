import { useState } from "react";
import { useOrderStore } from "./store/orderStore";
import OrderForm from "../OrderForm/OrderForm";
import "./Cards.scss";

interface CardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  offer?: string;
  discount?: number;
  isPopular?: boolean;
}

interface OrderDetails {
  tableNumber: string;
  quantity: number;
}

function Card({ image, title, description, price, offer, discount, isPopular }: CardProps) {
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
      <div className={`card ${isPopular ? 'popular' : ''}`}>
        {isPopular && (
          <div className="popular-badge">
            <span>⭐ Popular</span>
          </div>
        )}
        {discount && (
          <div className="discount-badge">
            <span>{discount}% OFF</span>
          </div>
        )}
        <div className="image-wrapper">
          {image && <img src={image} width={200} alt={title} />}
          {offer && (
            <div className="offer-ribbon">
              <span>{offer}</span>
            </div>
          )}
        </div>
        <div className="card-content">
          <h2>{title}</h2>
          <p className="description">{description}</p>
          <div className="price-section">
            {discount ? (
              <>
                <span className="original-price">{price}</span>
                <span className="discounted-price">
                  ${(parseFloat(price.replace('$', '')) * (1 - discount / 100)).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="current-price">{price}</span>
            )}
          </div>
          <button className="order-btn" onClick={handleOrderClick}>
            <span className="btn-text">Order Now</span>
            <span className="btn-icon">→</span>
          </button>
        </div>
        {showSuccess && (
          <div className="success-message">
            <span>✓ Order placed successfully!</span>
          </div>
        )}
      </div>
      {showOrderForm && (
        <OrderForm onSubmit={handleOrderSubmit} onClose={handleCloseForm} />
      )}
    </section>
  );
}

export default Card;
