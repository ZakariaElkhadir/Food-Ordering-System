import { useState, useEffect } from 'react';
import { websocketService } from '../Cards/websocketService';
import { useOrderStore, Order } from '../Cards/store/orderStore';

export const useWebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('NOT_INITIALIZED');
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useWebSocket: Initializing WebSocket connection monitoring');

    const checkConnectionStatus = () => {
      const status = websocketService.getConnectionState();
      setConnectionStatus(status);
    };

    const intervalId = setInterval(checkConnectionStatus, 1000);
    checkConnectionStatus();

    websocketService.onMessage((data) => {
      try {
        switch (data.type) {
          case 'SYNC_ORDERS':
            useOrderStore.getState().syncOrders(data.payload as Order[]);
            break;
          case 'NEW_ORDER':
            const newOrder = data.payload as Order;
            if (!useOrderStore.getState().orders.find(o => o.id === newOrder.id)) {
              useOrderStore.getState().addOrder(newOrder);
            }
            break;
          case 'REMOVE_ORDER':
            useOrderStore.getState().removeOrder((data.payload as { id: string }).id);
            break;
          case 'UPDATE_STATUS':
            const updatePayload = data.payload as { id: string; status: Order['status'] };
            useOrderStore.getState().updateOrderStatus(
              updatePayload.id,
              updatePayload.status
            );
            break;
          case 'CLEAR_ORDERS':
            useOrderStore.getState().clearOrders();
            break;
        }
      } catch (error) {
        console.error('useWebSocket: Error processing message:', error);
        setLastError(error instanceof Error ? error.message : 'Unknown error');
      }
    });

    return () => {
      clearInterval(intervalId);
      websocketService.disconnect();
    };
  }, []); // Empty dependency array as we want this to run once on mount

  return { connectionStatus, lastError };
};
