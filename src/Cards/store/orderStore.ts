import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { websocketService } from '../../Cards/websocketService';

export interface Order {
  id?: string;
  title: string;
  price: string;
  tableNumber: string;
  quantity: number;
  timestamp: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrders: () => void;
  removeOrder: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  syncOrders: (orders: Order[]) => void;
  version: number;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      version: 0,
      
      addOrder: (order) => {
        const newOrder: Order = {
          ...order,
          id: order.id || new Date().toISOString(),
          status: 'pending'
        };
        
        set((state) => ({
          orders: [...state.orders, newOrder],
          version: state.version + 1
        }));
        
        // Broadcast the new order to other clients
        websocketService.sendMessage('NEW_ORDER', newOrder);
      },
      
      removeOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id)
        }));
        
        // Broadcast the removal to other clients
        websocketService.sendMessage('REMOVE_ORDER', { id });
      },
      
      clearOrders: () => {
        set({ orders: [] });
        websocketService.sendMessage('CLEAR_ORDERS', null);
      },
      
      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          )
        }));
        
        // Broadcast the status update to other clients
        websocketService.sendMessage('UPDATE_STATUS', { id, status });
      },
      
      syncOrders: (orders) => set({ orders }),
    }),
    {
      name: 'order-storage'
    }
  )
);
