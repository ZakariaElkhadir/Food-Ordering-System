import { useOrderStore } from '../Cards/store/orderStore';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';
import { useAutoRefresh } from './useAutoRefresh';

const Dashboard = () => {
  const orders = useOrderStore((state) => state.orders);
  const navigate = useNavigate();
  const clearOrders = useOrderStore((state) => state.clearOrders);
  const removeOrder = useOrderStore((state) => state.removeOrder);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const refreshOrders = useOrderStore((state) => state.refreshOrders);
  useAutoRefresh(refreshOrders, 3000);
  
  const handleStatusChange = (orderId: string | undefined) => {
    if (!orderId) return;
    
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Define status flow
    const nextStatus: { [key: string]: Order['status'] } = {
      'pending': 'in-progress',
      'in-progress': 'completed',
      'completed': 'completed'
    };

    updateOrderStatus(orderId, nextStatus[order.status]);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Orders Dashboard</h1>
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Menu
        </button>
        <button className="clear-button" onClick={clearOrders}>
          Clear Orders
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="no-orders">No orders placed yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className={`order-card status-${order.status}`}>
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
                <p className="status">Status: {order.status}</p>
                <div className="button-group">
                  {order.status !== 'completed' && (
                    <button 
                      className="accept-button"
                      onClick={() => order.id && handleStatusChange(order.id)}
                    >
                      {order.status === 'pending' ? 'Accept' : 'Complete'}
                    </button>
                  )}
                  <button 
                    className="remove-button"
                    onClick={() => order.id && removeOrder(order.id)}
                  >
                    Remove Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;