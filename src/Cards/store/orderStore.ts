import { create } from 'zustand'
import { persist } from 'zustand/middleware'

//types for the order
interface Order {
  id?: string
  title: string;
  price: string;
  tableNumber: string;
  quantity: number;
  timestamp: string;
}

//types for the order store
interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrders: () => void;
  removeOrder: (id: string) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({
        orders: [...state.orders, { ...order, id: order.id || new Date().toISOString() }]
      })),
      removeOrder: (id) => set((state) => ({
        orders: state.orders.filter((order) => order.timestamp !== id)
      })),
      clearOrders: () => set({ orders: [] })
    }),
    {
      name: 'order-storage'
    }
  )
)