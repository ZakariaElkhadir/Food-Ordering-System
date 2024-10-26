// store/orderStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Order {
  id?: string
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
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({
        orders: [...state.orders, { 
          ...order, 
          id: order.id || new Date().toISOString(),
          status: 'pending' // Set default status
        }]
      })),
      removeOrder: (id) => set((state) => ({
        orders: state.orders.filter((order) => order.id !== id)
      })),
      clearOrders: () => set({ orders: [] }),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map((order) => 
          order.id === id ? { ...order, status } : order
        )
      }))
    }),
    {
      name: 'order-storage'
    }
  )
)