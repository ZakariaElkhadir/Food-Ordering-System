import { useOrderStore } from "../Cards/store/orderStore";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../hooks/useWebSocket";
import "./Dashboard.scss";

const Dashboard = () => {
  const orders = useOrderStore((state) => state.orders);
  const navigate = useNavigate();
  const clearOrders = useOrderStore((state) => state.clearOrders);
  const removeOrder = useOrderStore((state) => state.removeOrder);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);

  const { connectionStatus, lastError } = useWebSocket();

  const getConnectionStatusDisplay = () => {
    switch (connectionStatus) {
      case "OPEN":
        return <span className="status-connected">Connected</span>;
      case "CONNECTING":
        return <span className="status-connecting">Connecting...</span>;
      case "CLOSED":
        return <span className="status-disconnected">Disconnected</span>;
      case "CLOSING":
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
            <div className="error-message">Last Error: {lastError}</div>
          )}
        </div>
        <button className="back-button" onClick={() => navigate("/")}>
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
                  {order.status !== "completed" && (
                    <button
                      className="accept-button"
                      onClick={() =>
                        order.id &&
                        updateOrderStatus(
                          order.id,
                          order.status === "pending"
                            ? "in-progress"
                            : "completed"
                        )
                      }
                    >
                      {order.status === "pending" ? "Accept" : "Complete"}
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
