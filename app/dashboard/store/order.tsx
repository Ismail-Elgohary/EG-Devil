import { create } from 'zustand';

export type FilterType = "All" | "Pending" | "Completed" | "Processing" | "Cancelled";

export type Order = {
 id: number;
 customer: string;
 total: number;
 status: "Pending" | "Completed" | "Processing" | "Cancelled";
 date: string;
};

type orderStore = {
 orders: Order[];
 initOrders: () => void;
 addOrder: (order: Order) => void;
 removeOrder: (id: number) => void;
 updateOrder: (id: number, newData: Partial<Order>) => void;

 search: string;
 filter: FilterType;

 setSearch: (value: string) => void;
 setFilter: (value: FilterType) => void;
 setOrders: (data: Order[]) => void;
}

const saveStorage = (key: string, data: any) => {
 localStorage.setItem(key, JSON.stringify(data));
};

const getItems = (key: string, fallback: any) => {
 if (typeof window === "undefined") return fallback;
 const data = localStorage.getItem(key);
 return data ? (JSON.parse(data)) : fallback;
};

const useOrderStore = create<orderStore>((set) => ({
 orders: [],
 search: "",
 filter: "All",

 setSearch: (value: string) => set({ search: value }),
 setFilter: (value: FilterType) => set({ filter: value }),
 setOrders: (data: Order[]) => set({ orders: data }),

 initOrders: () => {
  const data = localStorage.getItem("orders");
  if (data) {
   set({ orders: JSON.parse(data) });
  }
 },

 addOrder: (order) =>
  set((state) => {
   const newOrders = [...state.orders, order];
   saveStorage("orders", newOrders);
   return { orders: newOrders };
  }),
 removeOrder: (id) =>
  set((state) => {
   const newOrders = state.orders.filter((or) => or.id !== id);
   saveStorage("orders", newOrders);
   return { orders: newOrders };
  }),

 updateOrder: (id, newData) =>
  set((state) => {
   const newOrders = state.orders.map((o) =>
    o.id === id ? { ...o, ...newData } : o
   );
   saveStorage("orders", newOrders);
   return { orders: newOrders };
  }),
}));

export default useOrderStore;

