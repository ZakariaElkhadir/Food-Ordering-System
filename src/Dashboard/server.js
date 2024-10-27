// server.js
import express from 'express';
import { createServer } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import cors from 'cors';

// Create Express app
const app = express();
app.use(cors());

// Create HTTP server
const server = createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Store connected clients and orders
const clients = new Set();
let orders = [];

// Broadcast to all connected clients
function broadcast(data, excludeClient = null) {
  const message = JSON.stringify(data);
  clients.forEach(client => {
    if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);

  // Send current orders to new client
  ws.send(JSON.stringify({
    type: 'SYNC_ORDERS',
    payload: orders
  }));

  ws.on('message', (rawMessage) => {
    try {
      const data = JSON.parse(rawMessage);
      console.log('Received:', data.type);

      // Update server-side state
      switch (data.type) {
        case 'NEW_ORDER':
          orders.push(data.payload);
          break;
        case 'REMOVE_ORDER':
          orders = orders.filter(order => order.id !== data.payload.id);
          break;
        case 'UPDATE_STATUS':
          orders = orders.map(order =>
            order.id === data.payload.id
              ? { ...order, status: data.payload.status }
              : order
          );
          break;
        case 'CLEAR_ORDERS':
          orders = [];
          break;
      }

      // Broadcast to other clients
      broadcast(data, ws);
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', connections: clients.size });
});

// Start server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket server is ready`);
});

// Handle server shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});