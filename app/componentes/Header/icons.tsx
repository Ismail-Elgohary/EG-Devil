"use client";

import { Bell, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "../../(base)/context/Cartshop";
import { useHeart } from "../../(base)/context/FavoritesContext";
import ALoginPage from "../ALogin/page";

export default function Icons() {
 const { cartCount } = useCart();
 const { favourites } = useHeart();
 const favouritesCount = favourites.length;

 return (

  <div className="flex items-center gap-1">

   <button className="text-white hover:text-indigo-400 transition">
    <Bell size={20} />
   </button>

   <Link
    href="/Favoutites"
    className="relative flex items-center gap-2 px-3 py-2 rounded-lg transition group"
   >
    <div className="relative">
     <Heart
      size={20}
      className="text-white group-hover:text-rose-500 transition"
     />
     {favouritesCount > 0 && (
      <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white text-[9px] font-bold">
       {favouritesCount}
      </span>
     )}
    </div>
   </Link>

   <Link
    href="/cart"
    className="relative flex items-center gap-2 px-3 py-2 rounded-lg transition group"
   >
    <div className="relative">
     <ShoppingCart
      size={20}
      className="text-white group-hover:text-teal-600 transition"
     />
     {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-white text-[9px] font-bold">
       {cartCount}
      </span>
     )}
    </div>
   </Link>
   < ALoginPage />
  </div>
 );
}
