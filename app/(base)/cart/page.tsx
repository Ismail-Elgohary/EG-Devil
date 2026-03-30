"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Trash2, Tag, MapPin, Plus } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Your <span className="text-orange-500">Cart</span>
        </h1>
        <span className="text-sm text-gray-400 font-medium">{itemCount} Items</span>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        <section className="lg:col-span-2">

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center py-24 gap-5">
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center">
                <Tag size={36} className="text-orange-300" />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-700">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add some products to get started!</p>
              </div>
              <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
                Browse Products
              </Link>
            </div>

          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-4 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <span>Product Details</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-center">Subtotal</span>
              </div>

              {/* Rows */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center px-6 py-6 border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
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
                        onClick={() => removeFromCart(item.id)}
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

                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => decrease(item.id, item.quantity)}
                      className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:border-orange-400 hover:text-orange-500 flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <span className="w-6 text-center text-base font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increase(item.id, item.quantity)}
                      className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:border-orange-400 hover:text-orange-500 flex items-center justify-center transition-colors"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="text-center text-base font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="px-6 py-5">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <ArrowLeft size={15} />
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </section>

        <aside className="lg:col-span-1 sticky top-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">

            <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                <MapPin size={12} className="text-orange-400" />
                Select Address
              </label>
              <select
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              >
                <option value="">Select Address</option>
                <option value="home">🏠 Home Address</option>
                <option value="work">🏢 Work Address</option>
              </select>
              <button
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="w-full py-2.5 border border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus size={14} />
                Add New Address
              </button>
              {showAddAddress && (
                <input
                  type="text"
                  placeholder="Enter new address..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              />
              <button
                onClick={applyPromo}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
              >
                {promoApplied ? "✓ Applied!" : "Apply"}
              </button>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Items {itemCount}</span>
                <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping Fee</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax (2%)</span>
                <span className="font-semibold text-gray-800">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-xl font-black text-gray-900">${total.toFixed(2)}</span>
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
              Place Order
            </button>

          </div>
        </aside>

      </main>
    </div>
  );
}
