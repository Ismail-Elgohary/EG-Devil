"use client";

import { useCartStore } from "@/app/dashboard/store/cartStore";
import { useFavouriteStore } from "@/app/dashboard/store/favouriteStore";

import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import ALoginPage from "../ALogin/page";

export default function Icons() {

 const cart = useCartStore(
  (state) => state.cart
 );

 const cartCount = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
 );

 const favourites = useFavouriteStore(
  (state) => state.favourites
 );

 const favouritesCount =
  favourites.length;

 return (

  <div className="flex items-center gap-1">


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
   <ALoginPage />
  </div>
 );
}
