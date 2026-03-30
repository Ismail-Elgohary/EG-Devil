"use client";

import Link from "next/link";
import { Heart, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useHeart } from "../context/FavoritesContext";
import { useCart } from "../context/Cartshop";

export default function FavouritesPage() {
  const { favourites, toggleFavorite } = useHeart();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <header className="border-b border-gray-200 bg-white px-4 md:px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          Your <span className="text-red-500">Favourites</span>
        </h1>
        <span className="text-xs md:text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-500 font-bold">
          {favourites.length} Items
        </span>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {favourites.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center py-20 px-4 gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-50 flex items-center justify-center">
              <Heart size={32} className="text-red-300" />
            </div>
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-gray-700">No favourites yet</p>
              <p className="text-sm text-gray-400 mt-1">Add some products to your wishlist!</p>
            </div>
            <Link
              href="/products"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-red-100"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            <div className="hidden md:grid grid-cols-[3fr_1fr_1.2fr] px-6 py-4 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Product Details</span>
              <span className="text-center">Price</span>
              <span className="text-center">Actions</span>
            </div>

            <div className="divide-y divide-gray-50">
              {favourites.map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-col md:grid md:grid-cols-[3fr_1fr_1.2fr] items-center p-4 md:px-6 md:py-6 hover:bg-gray-50/60 transition-colors gap-4"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <p className="text-sm md:text-base font-bold text-gray-800 leading-snug line-clamp-2">
                        {item.name}
                      </p>
                      <button
                        onClick={() => toggleFavorite(item)}
                        className="flex items-center gap-1.5 text-[12px] font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-all w-fit"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex md:justify-center items-center w-full md:w-auto justify-between border-t border-gray-50 pt-3 md:pt-0 md:border-none">
                    <span className="md:hidden text-xs font-semibold text-gray-400 uppercase">Price:</span>
                    <p className="text-lg md:text-base font-black md:font-extrabold text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="w-full md:flex md:justify-center">
                    <button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        })
                      }
                      className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 md:py-2.5 bg-gray-900 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-all active:scale-95"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 bg-gray-50/50">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-red-500 transition-colors"
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
