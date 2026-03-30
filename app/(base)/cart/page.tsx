"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Trash2, Tag, MapPin, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/Cartshop";

const TAX_RATE = 0.02;

export default function CartPage() {
  const { cart, removeFromCart, updateCart } = useCart();

  const [promoCode, setPromoCode] = useState<string>("");
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showAddAddress, setShowAddAddress] = useState<boolean>(false);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const increase = (id: number | string, currentQty: number): void =>
    updateCart(id, currentQty + 1);

  const decrease = (id: number | string, currentQty: number): void =>
    updateCart(id, currentQty - 1);

  const applyPromo = (): void => {
    if (promoCode.trim()) setPromoApplied(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Your <span className="text-blue-600">Cart</span>
        </h1>
        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
          {itemCount} Items
        </span>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">

        {cart.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center py-32 gap-5">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
              <ShoppingBag size={36} className="text-blue-300" />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-700">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-1">Add some products to get started!</p>
            </div>
            <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
              Browse Products
            </Link>
          </div>

        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 items-start">

            {/* ── Left: Items ── */}
            <div className="w-full lg:col-span-2 flex flex-col gap-3">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4"
                >
                  {/* Image */}
                  <div className="w-full sm:w-28 h-32 sm:h-28 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 flex-1">
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Price + Qty + Subtotal */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">

                      {/* Unit Price */}
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Unit Price</span>
                        <span className="text-sm font-bold text-gray-700">${item.price.toFixed(2)}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1.5">
                        <button
                          onClick={() => decrease(item.id, item.quantity)}
                          className="w-6 h-6 rounded-full border border-gray-200 bg-white hover:border-blue-400 hover:text-blue-500 flex items-center justify-center transition-colors"
                        >
                          <ChevronLeft size={13} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increase(item.id, item.quantity)}
                          className="w-6 h-6 rounded-full border border-gray-200 bg-white hover:border-blue-400 hover:text-blue-500 flex items-center justify-center transition-colors"
                        >
                          <ChevronRight size={13} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Subtotal</span>
                        <span className="text-base font-black text-blue-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors mt-2"
              >
                <ArrowLeft size={15} />
                Continue Shopping
              </Link>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="w-full lg:col-span-1 lg:sticky lg:top-20">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">

                <h2 className="text-base font-bold text-gray-900">Order Summary</h2>

                {/* Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <MapPin size={11} className="text-blue-400" />
                    Select Address
                  </label>
                  <select
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  >
                    <option value="">Select Address</option>
                    <option value="home">🏠 Home Address</option>
                    <option value="work">🏢 Work Address</option>
                  </select>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="w-full py-2 border border-dashed border-gray-300 rounded-xl text-xs font-semibold text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus size={13} />
                    Add New Address
                  </button>
                  {showAddAddress && (
                    <input
                      type="text"
                      placeholder="Enter new address..."
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    />
                  )}
                </div>

                {/* Promo */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-4 py-2.5 bg-gray-900 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    {promoApplied ? "✓" : "Apply"}
                  </button>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Price Breakdown */}
                <div className="flex flex-col gap-2.5 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Tax (2%)</span>
                    <span className="font-semibold text-gray-800">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-blue-600">${total.toFixed(2)}</span>
                </div>

                <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-100">
                  Place Order
                </button>

              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
