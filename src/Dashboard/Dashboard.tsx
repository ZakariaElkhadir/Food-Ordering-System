// pages/Dashboard.tsx
import { useOrderStore } from '../Cards/store/orderStore';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const orders = useOrderStore((state) => state.orders);
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Orders Dashboard</h1>
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Menu
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="no-orders">No orders placed yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <h2>{order.title}</h2>
                <span className="price">{order.price}</span>
              </div>
              <div className="order-details">
                <p>Table: {order.tableNumber}</p>
                <p>Quantity: {order.quantity}</p>
                <p className="timestamp">
                  {new Date(order.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;