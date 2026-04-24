"use client";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import useOrderStore, { Order } from "../store/order";
import Btns from "./btns";

export default function OrdersPage() {
 const orders = useOrderStore((state) => state.orders);
 const search = useOrderStore((state) => state.search);
 const filter = useOrderStore((state) => state.filter);

 const addOrder = useOrderStore((state) => state.addOrder);
 const removeOrder = useOrderStore((state) => state.removeOrder);
 const updateOrder = useOrderStore((state) => state.updateOrder);
 const initOrders = useOrderStore((s) => s.initOrders);

 const [editingId, setEditingId] = useState<number | null>(null);
 const [form, setForm] = useState<Partial<Order>>({});
 const [showAddModal, setShowAddModal] = useState(false);
 const [newOrder, setNewOrder] = useState({ customer: "", total: 0, status: "Pending" as Order["status"], date: "" });


 useEffect(() => {
  initOrders();
 }, []);

 const handleDelete = (id: number) => {
  removeOrder(id);
 };

 const handleEdit = (order: Order) => {
  setEditingId(order.id);
  setForm(order);
 };

 const handleSaveEdit = () => {
  if (!editingId) return;
  updateOrder(editingId, form);
  setEditingId(null);
  setForm({});
 };

 const handleAdd = () => {
  if (!newOrder.customer || !newOrder.total || !newOrder.date) return;

  const id = orders.length
   ? Math.max(...orders.map((u) => u.id)) + 1
   : 1;

  addOrder({
   id,
   ...newOrder,
  });

  setNewOrder({ customer: "", total: 0, status: "Pending", date: "" });
  setShowAddModal(false);
 };

 const statusStyle = (status: string) => {
  if (status === "Pending") return "bg-yellow-100 text-yellow-600";
  if (status === "Completed") return "bg-green-100 text-green-600";
  return "bg-blue-100 text-blue-600";
 };

 const filterOrders = orders.filter((order) => {
  const matchSearch =
   order.customer.toLowerCase().includes(search.toLowerCase());

  const matchFilter =
   filter === "All" ? true : order.status === filter;

  return matchSearch && matchFilter;
 });

 return (
  <div className="p-6">

   <div className="flex items-center justify-between mb-4">
    <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
    <button
     onClick={() => setShowAddModal(true)}
     className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg transition"
    >
     Create Order
    </button>
   </div>

   <Btns />
   <div className="overflow-x-auto rounded-xl shadow-xl">
    <table className="w-full text-lg font-bold text-left">
     <thead className="bg-gray-800 text-yellow-400">
      <tr>
       <th className="px-4 py-3">ID</th>
       <th className="px-4 py-3">Customer</th>
       <th className="px-4 py-3">Total</th>
       <th className="px-4 py-3">Status</th>
       <th className="px-4 py-3">Date</th>
       <th className="px-4 py-3">Actions</th>
      </tr>
     </thead>
     <tbody>
      {filterOrders.map((order) => (
       <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
        <td className="px-4 py-3 text-gray-500">{order.id}</td>

        {editingId === order.id ? (
         <>
          <td className="px-4 py-3">
           <input
            className="border rounded px-2 py-1 w-full"
            value={form.customer || ""}
            onChange={(e) => setForm({ ...form, customer: e.target.value })}
           />
          </td>
          <td className="px-4 py-3">
           <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={form.total || 0}
            onChange={(e) => setForm({ ...form, total: Number(e.target.value) })}
           />
          </td>
          <td className="px-4 py-3">
           <select
            className="border rounded px-2 py-1"
            value={form.status || "Pending"}
            onChange={(e) =>
             setForm({
              ...form,
              status: e.target.value as Order["status"],
             })
            }
           >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>

           </select>
          </td>
          <td className="px-4 py-3">
           <select
            className="border rounded px-2 py-1 w-full"
            value={form.date || ""}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
           >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
           </select>
          </td>
          <td className="px-4 py-3 flex gap-2">
           <button onClick={handleSaveEdit} className="text-green-500 hover:text-green-700">
            <Check className="w-6 h-6" />
           </button>
           <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
           </button>
          </td>
         </>
        ) : (
         <>
          <td className="px-4 py-3 font-medium text-gray-800">{order.customer}</td>
          <td className="px-4 py-3 text-gray-600">${order.total}</td>
          <td className="px-4 py-3">
           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyle(order.status)}`}>
            {order.status}
           </span>
          </td>
          <td className="px-4 py-3 text-gray-600">{order.date}</td>
          <td className="px-4 py-3">
           <div className="flex gap-2">
            <button onClick={() => handleEdit(order)} className="text-blue-400 hover:text-blue-600 transition">
             <Pencil className="w-6 h-6" />
            </button>
            <button onClick={() => handleDelete(order.id)} className="text-red-400 hover:text-red-600 transition">
             <Trash2 className="w-6 h-6" />
            </button>
           </div>
          </td>
         </>
        )}
       </tr>
      ))}
     </tbody>
    </table>
   </div>

   {showAddModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
     <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
       <h2 className="text-xl font-bold text-gray-800">Create New Order</h2>
       <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
        <X className="w-6 h-6" />
       </button>
      </div>
      <div className="flex flex-col gap-3">
       <input
        placeholder="Customer Name"
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newOrder.customer}
        onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
       />
       <input
        type="number"
        placeholder="Total"
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newOrder.total || ""}
        onChange={(e) => setNewOrder({ ...newOrder, total: Number(e.target.value) })}
       />
       <select
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newOrder.status}
        onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value as Order["status"] })}
       >
        <option>Pending</option>
        <option>Completed</option>
        <option>Processing</option>
        <option>Cancelled</option>
       </select>

       <select
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newOrder.date}
        onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
       >
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
       </select>
       <button
        onClick={handleAdd}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
       >
        Create Order
       </button>
      </div>
     </div>
    </div>
   )}
  </div>
 );
}

