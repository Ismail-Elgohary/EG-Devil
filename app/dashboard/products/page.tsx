"use client";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import useProductStore, { Product } from "../store/products";

export default function ProductsPage() {
 const products = useProductStore((state) => state.products);
 const addProduct = useProductStore((state) => state.addProduct);
 const removeProduct = useProductStore((state) => state.removeProduct);
 const updateProduct = useProductStore((state) => state.updateProduct);
 const initProducts = useProductStore((s) => s.initProducts);

 const [editingId, setEditingId] = useState<string | null>(null);
 const [form, setForm] = useState<Partial<Product>>({});
 const [showAddModal, setShowAddModal] = useState(false);
 const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
  name: "",
  price: 0,
  category: "",
  stock: 0,
  status: "Active",
 });

 useEffect(() => {
  initProducts();
 }, []);

 const handleDelete = (id: string) => {
  removeProduct(id);
 };

 const handleEdit = (product: Product) => {
  setEditingId(product.id);
  setForm(product);
 };

 const handleSaveEdit = () => {
  if (!editingId) return;
  updateProduct(editingId, form);
  setEditingId(null);
  setForm({});
 };

 const handleAdd = () => {
  if (!newProduct.name || !newProduct.category) return;
  addProduct(newProduct);
  setNewProduct({ name: "", price: 0, category: "", stock: 0, status: "Active" });
  setShowAddModal(false);
 };

 return (
  <div className="p-6">
   <div className="flex items-center justify-between mb-4">
    <h1 className="text-3xl font-bold text-gray-800">Products</h1>
    <button
     onClick={() => setShowAddModal(true)}
     className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg transition"
    >
     Add Product
    </button>
   </div>

   <div className="overflow-x-auto rounded-xl shadow-xl">
    <table className="w-full text-lg font-bold text-left">
     <thead className="bg-gray-800 text-yellow-400">
      <tr>
       <th className="px-4 py-3">id</th>
       <th className="px-4 py-3">Name</th>
       <th className="px-4 py-3">Price</th>
       <th className="px-4 py-3">Category</th>
       <th className="px-4 py-3">Stock</th>
       <th className="px-4 py-3">Status</th>
       <th className="px-4 py-3">Actions</th>
      </tr>
     </thead>
     <tbody>
      {products.map((product) => (
       <tr
        key={product.id}
        className="border-b border-gray-100 hover:bg-gray-50 transition"
       >
        <td className="px-4 py-3 text-gray-500">{product.id}</td>

        {editingId === product.id ? (
         <>
          <td className="px-4 py-3">
           <input
            className="border rounded px-2 py-1 w-full"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
           />
          </td>
          <td className="px-4 py-3">
           <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={form.price || 0}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
           />
          </td>
          <td className="px-4 py-3">
           <input
            className="border rounded px-2 py-1 w-full"
            value={form.category || ""}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
           />
          </td>
          <td className="px-4 py-3">
           <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={form.stock || 0}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
           />
          </td>
          <td className="px-4 py-3">
           <select
            className="border rounded px-2 py-1"
            value={form.status || "Active"}
            onChange={(e) =>
             setForm({ ...form, status: e.target.value as Product["status"] })
            }
           >
            <option>Active</option>
            <option>Inactive</option>
           </select>
          </td>
          <td className="px-4 py-3 flex gap-2">
           <button onClick={handleSaveEdit} className="text-green-500">
            <Check className="w-6 h-6" />
           </button>
           <button onClick={() => setEditingId(null)} className="text-gray-400">
            <X className="w-6 h-6" />
           </button>
          </td>
         </>
        ) : (
         <>
          <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
          <td className="px-4 py-3 text-gray-600">${product.price.toFixed(2)}</td>
          <td className="px-4 py-3 text-gray-600">{product.category}</td>
          <td className="px-4 py-3 text-gray-600">{product.stock}</td>
          <td className="px-4 py-3">
           <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${product.status === "Active"
             ? "bg-green-100 text-green-700"
             : "bg-red-100 text-red-500"
             }`}
           >
            {product.status}
           </span>
          </td>
          <td className="px-4 py-3">
           <div className="flex gap-2">
            <button onClick={() => handleEdit(product)} className="text-blue-400">
             <Pencil className="w-6 h-6" />
            </button>
            <button onClick={() => handleDelete(product.id)} className="text-red-400">
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
       <h2 className="text-xl font-bold text-gray-800">Add Product</h2>
       <button
        onClick={() => setShowAddModal(false)}
        className="text-gray-400 hover:text-gray-600"
       >
        <X className="w-6 h-6" />
       </button>
      </div>
      <div className="flex flex-col gap-3">
       <input
        placeholder="Product Name"
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
       />
       <input
        type="number"
        placeholder="Price"
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newProduct.price || ""}
        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
       />
       <input
        placeholder="Category"
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
       />
       <input
        type="number"
        placeholder="Stock"
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newProduct.stock || ""}
        onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
       />
       <select
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newProduct.status}
        onChange={(e) =>
         setNewProduct({ ...newProduct, status: e.target.value as Product["status"] })
        }
       >
        <option>Active</option>
        <option>Inactive</option>
       </select>
       <button
        onClick={handleAdd}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
       >
        Add Product
       </button>
      </div>
     </div>
    </div>
   )}
  </div>
 );
}
