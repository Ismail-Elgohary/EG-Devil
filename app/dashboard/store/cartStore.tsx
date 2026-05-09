import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
 id: number;
 name: string;
 price: number;
 quantity: number;
 image: string;
};

type CartStore = {
 cart: CartItem[];

 addToCart: (
  product: Omit<CartItem, "quantity">
 ) => void;

 removeFromCart: (id: number) => void;

 increaseCart: (id: number) => void;

 decreaseCart: (id: number) => void;

 clearCart: () => void;

 total: () => number;

 isInCart: (id: number) => boolean;
};

export const useCartStore = create<CartStore>()(
 persist(
  (set, get) => ({
   cart: [],

   addToCart: (product) =>
    set((state) => {
     const existing = state.cart.find(
      (item) => item.id === product.id
     );

     if (existing) {
      return {
       cart: state.cart.map((item) =>
        item.id === product.id
         ? {
          ...item,
          quantity: item.quantity + 1,
         }
         : item
       ),
      };
     }

     return {
      cart: [
       ...state.cart,
       {
        ...product,
        quantity: 1,
       },
      ],
     };
    }),

   removeFromCart: (id) =>
    set((state) => ({
     cart: state.cart.filter(
      (item) => item.id !== id
     ),
    })),

   increaseCart: (id) =>
    set((state) => ({
     cart: state.cart.map((item) =>
      item.id === id
       ? {
        ...item,
        quantity: item.quantity + 1,
       }
       : item
     ),
    })),

   decreaseCart: (id) =>
    set((state) => ({
     cart: state.cart
      .map((item) =>
       item.id === id
        ? {
         ...item,
         quantity: item.quantity - 1,
        }
        : item
      )
      .filter((item) => item.quantity > 0),
    })),

   clearCart: () =>
    set({
     cart: [],
    }),

   total: () => {
    return get().cart.reduce(
     (acc, item) =>
      acc + item.price * item.quantity,
     0
    );
   },

   isInCart: (id) => {
    return get().cart.some(
     (item) => item.id === id
    );
   },
  }),
  {
   name: "cart-storage",
  }
 )
);
