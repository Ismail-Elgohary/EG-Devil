"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useHeart } from "../context/FavoritesContext";

export default function FavouritesPage() {
  const { favourites, toggleFavorite } = useHeart();

  if (favourites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold text-gray-400">No favourites yet</p>
        <Link href="/products" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Favourites ({favourites.length})
      </h1>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {favourites.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
            <div className="flex-1">
              <p className="font-bold text-slate-700">{item.name}</p>
              <p className="text-indigo-600 font-black">${item.price}</p>
            </div>
            <button
              onClick={() => toggleFavorite(item)}
              className="p-1.5 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition"
            >
              <Heart size={14} className="fill-current" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
