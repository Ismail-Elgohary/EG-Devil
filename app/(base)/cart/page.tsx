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

  const decrease = (id: number | string, currentQty: number): void => {
    if (currentQty > 1) updateCart(id, currentQty - 1);
  };

  const applyPromo = (): void => {
    if (promoCode.trim()) setPromoApplied(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      <header className="border-b border-gray-200 bg-white px-4 md:px-8 py-5 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          Your <span className="text-orange-500">Cart</span>
          <ShoppingBag className="text-orange-500 md:hidden" size={20} />
        </h1>
        <span className="text-xs md:text-sm bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-bold">
          {itemCount} Items
        </span>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        <section className="lg:col-span-2">
          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center py-20 px-4 gap-5">
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center">
                <Tag size={36} className="text-orange-300" />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-700">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add some products to get started!</p>
              </div>
              <Link href="/products" className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">

              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-4 bg-white rounded-xl border border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <span>Product Details</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-center">Subtotal</span>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl md:rounded-xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-4 md:gap-0">

                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gray-50 border border-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 flex-1">
                        <p className="text-sm md:text-base font-bold text-gray-800 leading-tight line-clamp-2">
                          {item.name}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1 text-xs font-bold text-red-500 hover:bg-red-50 w-fit py-1 md:px-2 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between md:justify-center items-center border-t border-gray-50 pt-3 md:pt-0 md:border-none">
                      <span className="md:hidden text-xs text-gray-400 font-medium uppercase">Unit Price</span>
                      <p className="text-sm md:text-base font-bold text-gray-700">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-xs text-gray-400 font-medium uppercase">Quantity</span>
                      <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-full border border-gray-100">
                        <button
                          onClick={() => decrease(item.id, item.quantity)}
                          className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-orange-500 transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <span className="w-4 text-center text-sm font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increase(item.id, item.quantity)}
                          className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-orange-500 transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-xs text-gray-400 font-medium uppercase">Subtotal</span>
                      <p className="text-base font-black text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <Link
                href="/products"
                className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors mt-2"
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </div>
          )}
        </section>

        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-50 pb-4">Order Summary</h2>

            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <MapPin size={14} className="text-orange-500" />
                Delivery Address
              </label>
              <select
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-200 transition"
              >
                <option value="">Select an address</option>
                <option value="home">🏠 Home (New York, 123 St)</option>
                <option value="work">🏢 Work (Global Office)</option>
              </select>
              <button
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="text-xs font-bold text-orange-500 hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Add new address
              </button>
              {showAddAddress && (
                <input
                  type="text"
                  placeholder="Enter detailed address..."
                  className="w-full px-4 py-3 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 transition"
                />
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="CODE2024"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 transition"
                />
                <button
                  onClick={applyPromo}
                  className="px-4 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors"
                >
                  {promoApplied ? "✓" : "Apply"}
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax (2%)</span>
                <span className="font-bold text-gray-800">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="border-t border-gray-50 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-orange-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-100 transition-all active:scale-[0.98] mt-2">
              Proceed to Checkout
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
