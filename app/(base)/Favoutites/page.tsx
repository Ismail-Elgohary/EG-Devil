"use client";

import Link from "next/link";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useHeart } from "../context/FavoritesContext";
import { useCart } from "../context/Cartshop";

export default function FavouritesPage() {
  const { favourites, toggleFavorite } = useHeart();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <header className="border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Your <span className="text-red-500">Favourites</span>
        </h1>
        <span className="text-sm text-gray-400 font-medium">{favourites.length} Items</span>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {favourites.length === 0 ? (

             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center py-24 gap-5">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
              <Heart size={36} className="text-red-300" />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-700">No favourites yet</p>
              <p className="text-sm text-gray-400 mt-1">Add some products to your wishlist!</p>
            </div>
            <Link
              href="/products"
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              Browse Products
            </Link>
          </div>

        ) : (

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            <div className="grid grid-cols-[2fr_1fr_1fr] px-6 py-4 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Product Details</span>
              <span className="text-center">Price</span>
              <span className="text-center">Actions</span>
            </div>

            {favourites.map((item: any) => (
              <div
                key={item.id}
                className="grid grid-cols-[2fr_1fr_1fr] items-center px-6 py-6 border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
              >

                <div className="flex items-center gap-5">
                  <div className="w-32 h-32 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-3 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
                      {item.name}
                    </p>

                    <button
                      onClick={() => toggleFavorite(item)}
                      className="flex items-center gap-1.5 text-sm font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all w-fit"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>

                <p className="text-center text-base font-extrabold text-gray-800">
                  ${item.price.toFixed(2)}
                </p>

                <div className="flex justify-center">
                  <button
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      })
                    }
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    <ShoppingCart size={15} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}

            <div className="px-6 py-5">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
