"use client";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../../context/Cartshop";

export default function Icons() {
  const { cartCount } = useCart();

  return (
    <>
      <Link href="/Favoutites" className="p-2 rounded-lg hover:bg-gray-50 transition group" aria-label="Wishlist">
        <Heart size={20} className="text-gray-600 group-hover:text-rose-500 transition" />
      </Link>
      <Link href="/cart" className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition group">
        <div className="relative">
          <ShoppingCart size={20} className="text-gray-600 group-hover:text-teal-600 transition" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-white text-[9px] font-bold leading-none">
              {cartCount}
            </span>
          )}
        </div>
        <span className="hidden sm:inline text-sm font-medium text-gray-700 group-hover:text-teal-600 transition">
          Cart
        </span>
      </Link>
    </>
  );
}
