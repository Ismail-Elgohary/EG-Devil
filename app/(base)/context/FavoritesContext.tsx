"use client";
import { Tpost } from "../../types/type";
import { createContext, useContext, useState, useEffect } from "react";

interface HeartContextType {
  favourites: Tpost[];
  toggleFavorite: (product: Tpost) => void;
  isFavorite: (productId: number | string) => boolean; // ✅
}

const HeartContext = createContext<HeartContextType | undefined>(undefined);

export default function HeartProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourites] = useState<Tpost[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const isFavorite = (productId: number | string) => { // ✅
    return favourites.some(p => p.id === productId);
  };

  const toggleFavorite = (product: Tpost) => {
    if (isFavorite(product.id)) {
      setFavourites(favourites.filter(p => p.id !== product.id));
    } else {
      setFavourites([...favourites, product]);
    }
  };

  return (
    <HeartContext.Provider value={{ favourites, toggleFavorite, isFavorite }}>
      {children}
    </HeartContext.Provider>
  );
}

export const useHeart = () => {
  const context = useContext(HeartContext);
  if (!context) {
    throw new Error("useHeart must be used within HeartProvider");
  }
  return context;
};
