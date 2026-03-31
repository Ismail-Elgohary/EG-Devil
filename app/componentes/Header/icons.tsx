"use client";
import Link from "next/link";
import { ShoppingCart, Heart, UserRound, LogIn, UserPlus } from "lucide-react";
import { useCart } from "../../(base)/context/Cartshop";
import { useHeart } from "../../(base)/context/FavoritesContext";
import { useState } from "react";

export default function Icons() {
  const { cartCount } = useCart();
  const { favourites } = useHeart();
  const favouritesCount = favourites.length;
  const [userMenu, setUserMenu] = useState(false);

  const userLinks = [
    { name: "Login", href: "/Login", icon: LogIn },
    { name: "Register", href: "/Register", icon: UserPlus },
  ];

  return (
    <div className="flex items-center gap-1">

         <Link href="/Favoutites" className="relative flex items-center gap-2 px-3 py-2 rounded-lg transition group">
        <div className="relative">
          <Heart size={20} className="text-white group-hover:text-rose-500 transition" />
          {favouritesCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white text-[9px] font-bold leading-none">
              {favouritesCount}
            </span>
          )}
        </div>
      </Link>

      <Link href="/cart" className="relative flex items-center gap-2 px-3 py-2 rounded-lg transition group">
        <div className="relative">
          <ShoppingCart size={20} className="text-white group-hover:text-teal-600 transition" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-white text-[9px] font-bold leading-none">
              {cartCount}
            </span>
          )}
        </div>
      </Link>

      <div
        className="relative"
        onMouseEnter={() => setUserMenu(true)}
        onMouseLeave={() => setUserMenu(false)}
      >
        <button
          className={`p-2 rounded-lg transition-colors group ${
            userMenu ? "bg-white/5" : "hover:bg-white/5"
          }`}
        >
          <UserRound
            size={20}
            className={`transition-colors ${
              userMenu ? "text-indigo-400" : "text-gray-400 group-hover:text-indigo-400"
            }`}
          />
        </button>

        {/* Dropdown */}
        {userMenu && (
          <div className="absolute right-0 top-full pt-2 w-52">
           <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-1">
              {userLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-indigo-600 group transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-white/10 flex items-center justify-center shrink-0 transition-colors">
                    <link.icon size={20} className="text-indigo-400 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-sm font-semibold text-white">{link.name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
