"use client";
import { createContext, useContext, useState } from "react";

interface CartItem {
  id: number | string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: number | string) => void;
  updateCart: (productId: number | string, quantity: number) => void;
  isInCart: (productId: number | string) => boolean;
  clearCart: () => void;
  cartCount: number;
}

const CartshopContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number | string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCart = (productId: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const isInCart = (productId: number | string) => {
    return cart.some((item) => item.id === productId);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartshopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCart,
        isInCart,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartshopContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartshopContext);
  if (!context) {
    throw new Error("useCart is used");
  }
  return context;
};
