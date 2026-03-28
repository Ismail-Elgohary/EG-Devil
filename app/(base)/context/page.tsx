"use client";
import { useCart } from "../context/Cartshop";
import Link from "next/link";
import { ShoppingCart, Trash2,  ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart} = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity ?? 1), 0);

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-indigo-600" />
            <h1 className="text-lg font-extrabold text-slate-800">Your Cart</h1>

            {itemCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>

          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">


        {cart.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 gap-6"
            style={{ animation: "fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center">
              <ShoppingBag size={40} className="text-indigo-300" />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-slate-700">Your cart is empty</p>
              <p className="text-sm text-slate-400 mt-1">Add some products to get started!</p>
            </div>
            <Link
              href="/products"
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200"
            >
              Browse Products
            </Link>
          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 flex flex-col gap-4">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4 group"
                  style={{
                    animation: `fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s both`,
                  }}
                >
                  <div className="w-20 h-20 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">
                      {item.name}
                    </p>
                    <p className="text-indigo-600 font-black text-base mt-1">
                      ${item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-xl text-slate-300 hover:bg-rose-50 hover:text-rose-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div
              className="lg:col-span-1"
              style={{ animation: "fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}
            >
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4 sticky top-24">

                <h2 className="text-base font-extrabold text-slate-800">Order Summary</h2>

                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold text-slate-700">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-semibold">Free</span>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100" />

                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">Total</span>
                  <span className="text-2xl font-black text-indigo-600">${total.toFixed(2)}</span>
                </div>

                <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-100 mt-2">
                  Checkout
                </button>
                <p className="text-xs text-slate-400 text-center">
                  Secure checkout
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
