// websocketService.ts
import { Order } from './store/orderStore';

class WebSocketService {
  private socket: WebSocket | null = null;
  private onMessageCallback: ((data: any) => void) | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private readonly WS_URL = 'ws://localhost:3001';
  private isConnecting = false;

  constructor() {
    console.log('WebSocketService: Initializing...');
    this.connect();
  }

  connect() {
    if (this.isConnecting) {
      console.log('WebSocketService: Connection already in progress');
      return;
    }

    this.isConnecting = true;
    console.log('WebSocketService: Attempting to connect to', this.WS_URL);

    try {
      this.socket = new WebSocket(this.WS_URL);
      
      this.socket.onopen = () => {
        console.log('WebSocketService: Connection established successfully');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.sendMessage('REQUEST_SYNC', null); // Request initial state
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('WebSocketService: Received message:', data.type);
          if (this.onMessageCallback) {
            this.onMessageCallback(data);
          }
        } catch (error) {
          console.error('WebSocketService: Error parsing message:', error);
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocketService: Connection error:', error);
        this.isConnecting = false;
      };

      this.socket.onclose = (event) => {
        console.log('WebSocketService: Connection closed', event.code, event.reason);
        this.isConnecting = false;
        this.handleReconnect();
      };
    } catch (error) {
      console.error('WebSocketService: Error creating connection:', error);
      this.isConnecting = false;
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`WebSocketService: Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      setTimeout(() => this.connect(), this.reconnectDelay);
    } else {
      console.error('WebSocketService: Max reconnection attempts reached');
    }
  }

  sendMessage(type: string, payload: any) {
    if (!this.socket) {
      console.warn('WebSocketService: No socket connection available');
      return;
    }

    if (this.socket.readyState === WebSocket.OPEN) {
      try {
        const message = JSON.stringify({ type, payload });
        console.log('WebSocketService: Sending message:', type);
        this.socket.send(message);
      } catch (error) {
        console.error('WebSocketService: Error sending message:', error);
      }
    } else {
      console.warn('WebSocketService: Socket not ready. State:', this.socket.readyState);
    }
  }

  onMessage(callback: (data: any) => void) {
    this.onMessageCallback = callback;
    console.log('WebSocketService: Message callback registered');
  }

  getConnectionState(): 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED' | 'NOT_INITIALIZED' {
    if (!this.socket) return 'NOT_INITIALIZED';
    switch (this.socket.readyState) {
      case WebSocket.CONNECTING: return 'CONNECTING';
      case WebSocket.OPEN: return 'OPEN';
      case WebSocket.CLOSING: return 'CLOSING';
      case WebSocket.CLOSED: return 'CLOSED';
      default: return 'NOT_INITIALIZED';
    }
  }

  disconnect() {
    if (this.socket) {
      console.log('WebSocketService: Disconnecting...');
      this.socket.close();
      this.socket = null;
    }
  }
}

export const websocketService = new WebSocketService();