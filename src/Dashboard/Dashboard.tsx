import { useEffect, useState } from 'react';
import { useOrderStore} from '../Cards/store/orderStore';
import { websocketService } from '../Cards/websocketService';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';

const Dashboard = () => {
  const orders = useOrderStore((state) => state.orders);
  const navigate = useNavigate();
  const clearOrders = useOrderStore((state) => state.clearOrders);
  const removeOrder = useOrderStore((state) => state.removeOrder);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const [connectionStatus, setConnectionStatus] = useState('NOT_INITIALIZED');
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Dashboard: Initializing WebSocket connection monitoring');

    // Monitor WebSocket connection state
    const checkConnectionStatus = () => {
      const status = websocketService.getConnectionState();
      setConnectionStatus(status);
      console.log('Dashboard: Connection status:', status);
    };

    // Check connection status regularly
    const intervalId = setInterval(checkConnectionStatus, 1000);
    checkConnectionStatus(); // Initial check

    // Handle WebSocket messages
    websocketService.onMessage((data) => {
      console.log('Dashboard: Received message:', data.type);
      
      try {
        switch (data.type) {
          case 'SYNC_ORDERS':
            console.log('Dashboard: Syncing orders');
            useOrderStore.getState().syncOrders(data.payload);
            break;
          case 'NEW_ORDER':
            console.log('Dashboard: Adding new order');
            if (!orders.find(o => o.id === data.payload.id)) {
              useOrderStore.getState().addOrder(data.payload);
            }
            break;
          case 'REMOVE_ORDER':
            console.log('Dashboard: Removing order');
            useOrderStore.getState().removeOrder(data.payload.id);
            break;
          case 'UPDATE_STATUS':
            console.log('Dashboard: Updating order status');
            useOrderStore.getState().updateOrderStatus(
              data.payload.id,
              data.payload.status
            );
            break;
          case 'CLEAR_ORDERS':
            console.log('Dashboard: Clearing orders');
            useOrderStore.getState().clearOrders();
            break;
        }
      } catch (error) {
        console.error('Dashboard: Error processing message:', error);
        setLastError(error instanceof Error ? error.message : 'Unknown error');
      }
    });

    return () => {
      clearInterval(intervalId);
      websocketService.disconnect();
    };
  }, []);

  const getConnectionStatusDisplay = () => {
    switch (connectionStatus) {
      case 'OPEN':
        return <span className="status-connected">Connected</span>;
      case 'CONNECTING':
        return <span className="status-connecting">Connecting...</span>;
      case 'CLOSED':
        return <span className="status-disconnected">Disconnected</span>;
      case 'CLOSING':
        return <span className="status-closing">Closing...</span>;
      default:
        return <span className="status-disconnected">Not Connected</span>;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Orders Dashboard</h1>
        <div className="connection-status">
          {getConnectionStatusDisplay()}
          {lastError && (
            <div className="error-message">
              Last Error: {lastError}
            </div>
          )}
        </div>
        <button className="back-button" onClick={() => navigate('/')}>
          Go to Menu
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
                      onClick={() => order.id && updateOrderStatus(order.id, order.status === 'pending' ? 'in-progress' : 'completed')}
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