import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Order {
  title: string;
  price: string;
  tableNumber: string;
  quantity: number;
  timestamp: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({
        orders: [...state.orders, { ...order, timestamp: new Date().toISOString() }]
      }))
    }),
    {
      name: 'order-storage'
    }
  )
)