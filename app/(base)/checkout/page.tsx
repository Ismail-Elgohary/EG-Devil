"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCartStore } from "../../dashboard/store/cartStore";
type FormData = {
 name: string;
 email: string;
 address: string;
 phone: string;
};

export default function Checkout() {
 const router = useRouter();
 const cart = useCartStore((state) => state.cart);

 const [form, setForm] = useState<FormData>({
  name: "",
  email: "",
  address: "",
  phone: "",
 });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };

 const isFormValid =
  form.name && form.email && form.address && form.phone;

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (cart.length === 0) {
   toast("Cart is empty");
   return;
  }

  if (!isFormValid) {
   toast("Please fill all fields");
   return;
  }

  console.log("Order Data:", {
   customer: form,
   items: cart,
  });

  router.push("/sucess");
 };

 const total = cart.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
 );

 return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
   <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

    <div className="bg-white p-6 rounded-2xl shadow">
     <h1 className="text-2xl font-bold mb-6">Checkout</h1>

     <form onSubmit={handleSubmit} className="space-y-4">

      <input
       type="text"
       name="name"
       placeholder="Full Name"
       value={form.name}
       onChange={handleChange}
       className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />

      <input
       type="email"
       name="email"
       placeholder="Email"
       value={form.email}
       onChange={handleChange}
       className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />

      <input
       type="text"
       name="address"
       placeholder="Shipping Address"
       value={form.address}
       onChange={handleChange}
       className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />

      <input
       type="text"
       name="phone"
       placeholder="Phone Number"
       value={form.phone}
       onChange={handleChange}
       className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button
       type="submit"
       className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
      >
       Place Order
      </button>

     </form>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow h-fit">
     <h2 className="text-xl font-bold mb-4">Order Summary</h2>

     {cart.length === 0 ? (
      <p className="text-gray-500 text-sm">Your cart is empty</p>
     ) : (
      <div className="space-y-4">

       {cart.map((item) => (
        <div
         key={item.id}
         className="flex items-center justify-between border-b pb-3"
        >
         <div className="flex items-center gap-3">
          <Image
           src={item.image}
           alt={item.name}
           width={50}
           height={50}
           className="rounded-md object-cover"
          />

          <div>
           <p className="text-lg font-semibold">{item.name}</p>
           <p className="text-lg text-gray-500">
            Qty: {item.quantity}
           </p>
          </div>
         </div>

         <p className="text-lg font-bold text-indigo-700">
          ${item.price * item.quantity}
         </p>
        </div>
       ))}

       <div className="pt-4 flex justify-between font-bold text-lg text-red-500">
        <span>Total</span>
        <span>${total}</span>
       </div>

      </div>
     )}

     <p className="text-xs text-gray-500 mt-4">
      your orders
     </p>
    </div>

   </div>
  </div>
 );
}
