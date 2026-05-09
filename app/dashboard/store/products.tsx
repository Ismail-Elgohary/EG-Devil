import { create } from "zustand";

export type Product = {
 id: string;
 name: string;
 price: number;
 category: string;
 stock: number;
 status: "Active" | "Inactive";
};

type ProductStore = {
 products: Product[];
 initProducts: () => Promise<void>;
 addProduct: (product: Omit<Product, "id">) => Promise<void>;
 removeProduct: (id: string) => Promise<void>;
 updateProduct: (id: string, newData: Partial<Product>) => Promise<void>;
};

const useProductStore = create<ProductStore>((set, get) => ({
 products: [],

 initProducts: async () => {
  const res = await fetch("/api/products");
  if (!res.ok) {
   console.error("API Error:", res.status, res.statusText);
   return;
  }
 },

 addProduct: async (product) => {
  await fetch("/api/products", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(product),
  });
  await get().initProducts();
 },

 removeProduct: async (id) => {
  await fetch("/api/products", {
   method: "DELETE",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ id }),
  });
  await get().initProducts();
 },

 updateProduct: async (id, newData) => {
  await fetch("/api/products", {
   method: "PATCH",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ id, ...newData }),
  });
  await get().initProducts();
 },
}));

export default useProductStore;
