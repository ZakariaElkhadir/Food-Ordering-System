
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
  refreshOrders: () => void;
  version: number;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      version: 0,
      addOrder: (order) => set((state) => ({
        orders: [...state.orders, { 
          ...order, 
          id: order.id || new Date().toISOString(),
          status: 'pending'
        }],
        version: state.version + 1
      })),
      removeOrder: (id) => set((state) => ({
        orders: state.orders.filter((order) => order.id !== id)
      })),
      clearOrders: () => set({ orders: [] }),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map((order) => 
          order.id === id ? { ...order, status } : order
        )
      })),
      refreshOrders: () => {
        const storedData = localStorage.getItem('order-storage');
        if (storedData) {
          const { state } = JSON.parse(storedData);
          set((currentState) => {
            if (state.version !== currentState.version) {
              return { orders: state.orders, version: state.version };
            }
            return currentState;
          });
        }
      }
    }),
    {
      name: 'order-storage'
    }
  )
)