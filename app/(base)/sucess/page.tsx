"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully
        </h1>

        <p className="text-gray-500 mb-6">
          Thank you for your purchase! Your order has been placed and is being processed.
        </p>

        <div className="bg-gray-100 rounded-lg p-4 mb-6 text-sm text-gray-600">
          <p>
            Estimated Delivery:{" "}
            <span className="font-semibold text-gray-800">
              3 - 5 days
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/products"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
