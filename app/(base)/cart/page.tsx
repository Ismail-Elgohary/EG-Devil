"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Trash2, MapPin, Plus, ShoppingBag, Tag } from "lucide-react";
import { useCart } from "../context/Cartshop";

const TAX_RATE = 0.02;

export default function CartPage() {
  const { cart, removeFromCart, updateCart } = useCart();

  const [promoCode, setPromoCode] = useState<string>("");
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showAddAddress, setShowAddAddress] = useState<boolean>(false);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal   = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax        = subtotal * TAX_RATE;
  const total      = subtotal + tax;

  const increase = (id: number | string, qty: number) => updateCart(id, qty + 1);
  const decrease = (id: number | string, qty: number) => updateCart(id, qty - 1);

  const applyPromo = () => {
    if (promoCode.trim()) setPromoApplied(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f6]">

      <header className="bg-white border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
        <Link href="/products" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline font-medium">Continue Shopping</span>
        </Link>

        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Your <span className="text-blue-600">Cart</span>
        </h1>

        <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center py-28 gap-6 shadow-sm">
            <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-2">Looks like you haven't added anything yet.</p>
            </div>
            <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
              Browse Products
            </Link>
          </div>

        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

            <div className="flex flex-col gap-3">
              {cart.map((item, i) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                  style={{ animation: `fadeUp 0.4s ease ${i * 0.06}s both` }}
                >
                  <div className="flex">
                    {/* Image */}
                    <div className="w-28 sm:w-36 shrink-0 bg-gray-50 flex items-center justify-center p-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-24 sm:h-28 object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 p-4 flex flex-col justify-between min-w-0">

                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 flex-1">
                          {item.name}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                        <span className="text-lg font-bold text-red-500">
                          ${item.price.toFixed(2)}
                        </span>

                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2 py-1.5 border border-gray-100">
                          <button
                            onClick={() => decrease(item.id, item.quantity)}
                            className="w-6 h-6 rounded-lg bg-white border border-gray-200 hover:border-gray-900 flex items-center justify-center transition-colors"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <span className="w-5 text-center text-sm font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increase(item.id, item.quantity)}
                            className="w-6 h-6 rounded-lg bg-white border border-gray-200 hover:border-gray-900 flex items-center justify-center transition-colors"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>

                        <span className="text-base font-black text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-24 flex flex-col gap-4">

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-2">
                <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <Tag size={14} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 text-sm bg-transparent text-gray-700 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
                <button
                  onClick={applyPromo}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  {promoApplied ? "✓" : "Apply"}
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin size={11} />
                  Delivery Address
                </label>
                <select
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
                >
                  <option value="">Select address</option>
                  <option value="home">🏠 Home</option>
                  <option value="work">🏢 Work</option>
                </select>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="w-full py-2.5 border border-dashed border-gray-200 rounded-xl text-xs font-semibold text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus size={20} />
                  Add new address
                </button>
                {showAddAddress && (
                  <input
                    type="text"
                    placeholder="Enter address..."
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
                  />
                )}
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Order Summary</h2>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-600">Free</span>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-gray-900">${total.toFixed(2)}</span>
                </div>

                <Link href="/sucess" className="w-full py-4 bg-gray-900 hover:bg-gray-800 active:scale-[0.98] text-white font-bold text-sm rounded-xl transition-all tracking-wide text-center">
                  Place Order
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
