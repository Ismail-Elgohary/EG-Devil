"use client";
import Link from "next/link";
import { ShoppingCart, Heart, UserRound } from "lucide-react";
import { useCart } from "../../(base)/context/Cartshop";
import { useHeart } from "../../(base)/context/FavoritesContext";
import { useEffect, useState } from "react";

export default function Icons() {
  const { cartCount } = useCart();
  const { favourites } = useHeart();
  const favouritesCount = favourites?.length || 0;

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Link
        href="/Favourites"
        className="relative p-2 md:px-3 md:py-2 rounded-lg transition-colors group flex items-center justify-center"
      >
        <div className="relative">
          <Heart size={20} className="text-white group-hover:text-rose-500 transition-colors" />
          {favouritesCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white text-[9px] font-black shadow-sm ring-1 ring-black/10">
              {favouritesCount}
            </span>
          )}
        </div>
      </Link>

      {/* Cart Icon */}
      <Link
        href="/cart"
        className="relative p-2 md:px-3 md:py-2 rounded-lg transition-colors group flex items-center justify-center"
      >
        <div className="relative">
          <ShoppingCart size={20} className="text-white group-hover:text-teal-400 transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-white text-[9px] font-black shadow-sm ring-1 ring-black/10">
              {cartCount}
            </span>
          )}
        </div>
      </Link>

      {/* Login Icon */}
      <Link
        href="/Login"
        className="p-2 md:px-3 md:py-2 rounded-lg transition-colors group flex items-center justify-center text-white"
      >
        <UserRound size={20} className="group-hover:text-blue-400 transition-colors" />
      </Link>
    </div>
  );
}
