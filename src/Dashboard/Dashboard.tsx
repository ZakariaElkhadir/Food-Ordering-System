import { useOrderStore } from "../Cards/store/orderStore";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../hooks/useWebSocket";
import { motion, AnimatePresence } from "framer-motion";
import "./Dashboard.scss";

const Dashboard = () => {
  const orders = useOrderStore((state) => state.orders);
  const navigate = useNavigate();
  const clearOrders = useOrderStore((state) => state.clearOrders);
  const removeOrder = useOrderStore((state) => state.removeOrder);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);

  const { connectionStatus, lastError } = useWebSocket();

  // Calculate Stats
  const activeOrders = orders.filter((o) => o.status !== "completed").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const totalRevenue = orders.reduce((acc, order) => {
    const price = parseFloat(order.price.replace(/[^0-9.-]+/g, ""));
    return acc + (isNaN(price) ? 0 : price);
  }, 0);

  const getConnectionStatusDisplay = () => {
    switch (connectionStatus) {
      case "OPEN":
        return <span className="status-badge connected">Connected</span>;
      case "CONNECTING":
        return <span className="status-badge connecting">Connecting...</span>;
      case "CLOSED":
        return <span className="status-badge disconnected">Disconnected</span>;
      case "CLOSING":
        return <span className="status-badge closing">Closing...</span>;
      default:
        return <span className="status-badge disconnected">Not Connected</span>;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <header className="dashboard-header-modern">
          <div className="header-top-row">
            <div className="brand-section">
              <h1>Orders Dashboard</h1>
              <div className="connection-wrapper">
                {getConnectionStatusDisplay()}
                {lastError && (
                  <span className="error-badge" title={lastError}>
                    Error
                  </span>
                )}
              </div>
            </div>
            <div className="actions-section">
              <button className="btn-secondary" onClick={() => navigate("/")}>
                Back to Menu
              </button>
              <button className="btn-danger" onClick={clearOrders}>
                Clear All
              </button>
            </div>
          </div>

          <div className="header-stats-row">
            <div className="stat-card">
              <div className="stat-icon warning">🔥</div>
              <div className="stat-info">
                <span className="stat-label">Active Orders</span>
                <span className="stat-value">{activeOrders}</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon success">✅</div>
              <div className="stat-info">
                <span className="stat-label">Completed</span>
                <span className="stat-value">{completedOrders}</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon primary">💰</div>
              <div className="stat-info">
                <span className="stat-label">Total Revenue</span>
                <span className="stat-value">${totalRevenue.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </header>

        {orders.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="empty-icon">📝</div>
            <h2>No Active Orders</h2>
            <p>New orders will appear here automatically.</p>
          </motion.div>
        ) : (
          <motion.div
            className="orders-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ scale: 0.9, opacity: 0 }}
                  className={`order-card status-${order.status}`}
                >
                  <div className="card-header">
                    <div className="header-top">
                      <span className="table-badge">
                        Table {order.tableNumber}
                      </span>
                      <span className={`status-pill ${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                    <h3>{order.title}</h3>
                  </div>

                  <div className="card-body">
                    <div className="info-row">
                      <span className="label">Quantity</span>
                      <span className="value">{order.quantity}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Price</span>
                      <span className="value price">{order.price}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Time</span>
                      <span className="value timestamp">
                        {new Date(order.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="card-actions">
                    {order.status !== "completed" && (
                      <button
                        className="btn-primary"
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
                        {order.status === "pending"
                          ? "Accept Order"
                          : "Mark Complete"}
                      </button>
                    )}
                    <button
                      className="btn-text-danger"
                      onClick={() => order.id && removeOrder(order.id)}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
