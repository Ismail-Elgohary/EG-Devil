"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/Cartshop";
import { Tpost } from "../types/type";

export default function ProductCard({ post, index }: { post: Tpost; index: number }) {
  const { addToCart, removeFromCart, isInCart } = useCart();

  const handleAddToCart = () => {
    if (isInCart(post.id)) {
      removeFromCart(post.id);
    } else {
      addToCart({
        id: post.id,
        name: post.name,
        price: post.price,
        image: post.image,
      });
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm flex flex-col overflow-hidden group"
      style={{
        animation: `fadeSlideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.08}s both`,
      }}
    >
      <div className="relative flex items-center justify-center p-3 overflow-hidden">
        <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-indigo-100 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-150" />
        <img
          className="relative z-10 w-full h-28 object-contain drop-shadow transition-transform duration-500 group-hover:scale-110"
          src={post.image}
          alt={post.name}
        />
      </div>
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <span className="w-6 h-0.5 bg-indigo-500 rounded-full" />
        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed flex-1">
          {post.description}
        </p>
        {post.price && (
          <p className="text-indigo-600 font-black text-base">${post.price}</p>
        )}
        <div className="flex gap-2 mt-1">
          <Link
            href={`/products/${post.id}`}
            className="flex-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg text-center hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 ${
              isInCart(post.id)
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-teal-600 hover:text-white"
            }`}
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
