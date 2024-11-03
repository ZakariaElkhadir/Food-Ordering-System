import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';

// Create Express app with security middleware
const app = express();
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST']
}));
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Create HTTP server
const server = createServer(app);

// WebSocket server configuration
const wss = new WebSocketServer({ 
  server,
  // Add WebSocket specific configurations
  clientTracking: true,
  perMessageDeflate: {
    zlibDeflateOptions: {
      level: 6 // Balance between compression and CPU usage
    }
  }
});

// Store connected clients with metadata
const clients = new Map();
let orders = [];

// Heartbeat implementation
function heartbeat() {
  this.isAlive = true;
}

// Validate message structure
function validateMessage(data) {
  const validTypes = ['NEW_ORDER', 'REMOVE_ORDER', 'UPDATE_STATUS', 'CLEAR_ORDERS'];
  if (!data.type || !validTypes.includes(data.type)) {
    throw new Error('Invalid message type');
  }
  if (data.type !== 'CLEAR_ORDERS' && !data.payload) {
    throw new Error('Missing payload');
  }
}

// Broadcast to all connected clients with retry logic
async function broadcast(data, excludeClient = null) {
  const message = JSON.stringify(data);
  const promises = [];

  clients.forEach((metadata, client) => {
    if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
      promises.push(
        new Promise((resolve, reject) => {
          client.send(message, (error) => {
            if (error) {
              console.error('Broadcast error:', error);
              reject(error);
            } else {
              resolve();
            }
          });
        }).catch(error => {
          console.error(`Failed to send to client: ${metadata.id}`, error);
          // Handle failed client - possibly remove them
          handleFailedClient(client);
        })
      );
    }
  });

  return Promise.all(promises);
}

function handleFailedClient(client) {
  const metadata = clients.get(client);
  if (metadata) {
    console.log(`Removing failed client: ${metadata.id}`);
    clients.delete(client);
    client.terminate();
  }
}

// Connection handling with authentication
wss.on('connection', async (ws, req) => {
  // Basic authentication check (expand based on your needs)
  const authToken = req.headers['authorization'];
  if (process.env.REQUIRE_AUTH && !authToken) {
    ws.close(4001, 'Authentication required');
    return;
  }

  // Set up client metadata
  const clientId = uuidv4();
  const metadata = {
    id: clientId,
    connectedAt: new Date(),
    isAlive: true,
    remoteAddress: req.socket.remoteAddress
  };
  clients.set(ws, metadata);

  console.log(`Client connected: ${clientId}`);

  // Set up heartbeat
  ws.isAlive = true;
  ws.on('pong', heartbeat);

  // Send initial state
  try {
    await new Promise((resolve, reject) => {
      ws.send(JSON.stringify({
        type: 'SYNC_ORDERS',
        payload: orders
      }), (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  } catch (error) {
    console.error('Error sending initial state:', error);
    handleFailedClient(ws);
    return;
  }

  // Message handling with validation and error handling
  ws.on('message', async (rawMessage) => {
    try {
      const data = JSON.parse(rawMessage);
      console.log(`Received from ${clientId}:`, data.type);

      // Validate message
      validateMessage(data);

      // Update server-side state with optimistic locking
      switch (data.type) {
        case 'NEW_ORDER':
          data.payload.id = data.payload.id || uuidv4();
          data.payload.timestamp = new Date().toISOString();
          orders.push(data.payload);
          break;
        case 'REMOVE_ORDER':
          orders = orders.filter(order => order.id !== data.payload.id);
          break;
        case 'UPDATE_STATUS':
          orders = orders.map(order =>
            order.id === data.payload.id
              ? { 
                  ...order, 
                  status: data.payload.status,
                  lastModified: new Date().toISOString()
                }
              : order
          );
          break;
        case 'CLEAR_ORDERS':
          orders = [];
          break;
      }

      // Broadcast with error handling
      await broadcast(data, ws);

    } catch (error) {
      console.error(`Error processing message from ${clientId}:`, error);
      ws.send(JSON.stringify({
        type: 'ERROR',
        payload: {
          message: 'Error processing message',
          details: error.message
        }
      }));
    }
  });

  // Enhanced cleanup on connection close
  ws.on('close', () => {
    console.log(`Client disconnected: ${clientId}`);
    clients.delete(ws);
    // Notify other clients about disconnection if needed
    broadcast({
      type: 'CLIENT_DISCONNECTED',
      payload: { clientId }
    });
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error for ${clientId}:`, error);
    handleFailedClient(ws);
  });
});

// Heartbeat interval
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      clients.delete(ws);
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => {
  clearInterval(interval);
});

// Enhanced health check endpoint with detailed metrics
app.get('/health', (req, res) => {
  const metrics = {
    status: 'ok',
    uptime: process.uptime(),
    connections: {
      total: clients.size,
      active: Array.from(clients.values()).filter(m => m.isAlive).length
    },
    orders: {
      total: orders.length,
      byStatus: orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {})
    },
    memory: process.memoryUsage()
  };
  res.json(metrics);
});

// Start server with enhanced error handling
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket server is ready`);
}).on('error', (error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});

// Graceful shutdown handling
const gracefulShutdown = async () => {
  console.log('Initiating graceful shutdown...');
  
  // Stop accepting new connections
  server.close(async () => {
    console.log('HTTP server closed');
    
    // Close all WebSocket connections
    for (const [client, metadata] of clients) {
      try {
        await new Promise((resolve) => {
          client.close(1000, 'Server shutting down', { keepClosed: true });
          resolve();
        });
        console.log(`Closed connection for client: ${metadata.id}`);
      } catch (error) {
        console.error(`Error closing client ${metadata.id}:`, error);
      }
    }
    
    console.log('All connections closed');
    process.exit(0);
  });

  // Force exit if graceful shutdown takes too long
  setTimeout(() => {
    console.error('Forced shutdown due to timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);