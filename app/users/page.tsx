"use client";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import useStore, { User } from "../store/store";

export default function UsersPage() {
 const users = useStore((state) => state.users);
 const addUser = useStore((state) => state.addUser);
 const removeUser = useStore((state) => state.removeUser);
 const updateUser = useStore((state) => state.updateUser);
 const initUsers = useStore((s) => s.initUsers);

 const [editingId, setEditingId] = useState<number | null>(null);
 const [form, setForm] = useState<Partial<User>>({});
 const [showAddModal, setShowAddModal] = useState(false);
 const [newUser, setNewUser] = useState<Omit<User, "id">>({
  name: "",
  email: "",
  role: "",
  status: "Active",
 });

 useEffect(() => {
  initUsers();
 }, []);

 const handleDelete = (id: number) => {
  removeUser(id);
 };

 const handleEdit = (user: User) => {
  setEditingId(user.id);
  setForm(user);
 };

 const handleSaveEdit = () => {
  if (!editingId) return;

  updateUser(editingId, form);
  setEditingId(null);
  setForm({});
 };

 const handleAdd = () => {
  if (!newUser.name || !newUser.email || !newUser.role) return;

  const id = users.length
   ? Math.max(...users.map((u) => u.id)) + 1
   : 1;

  addUser({
   id,
   ...newUser,
  });

  setNewUser({
   name: "",
   email: "",
   role: "",
   status: "Active",
  });

  setShowAddModal(false);
 };

 return (
  <div className="p-6">
   <div className="flex items-center justify-between mb-4">
    <h1 className="text-3xl font-bold text-gray-800">Users</h1>
    <button
     onClick={() => setShowAddModal(true)}
     className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg transition"
    >
     Add User
    </button>
   </div>

   <div className="overflow-x-auto rounded-xl shadow-xl">
    <table className="w-full text-lg font-bold text-left">
     <thead className="bg-gray-800 text-yellow-400">
      <tr>
       <th className="px-4 py-3">id</th>
       <th className="px-4 py-3">Name</th>
       <th className="px-4 py-3">Email</th>
       <th className="px-4 py-3">Role</th>
       <th className="px-4 py-3">Status</th>
       <th className="px-4 py-3">Actions</th>
      </tr>
     </thead>
     <tbody>
      {users.map((user) => (
       <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
        <td className="px-4 py-3 text-gray-500">{user.id}</td>

        {editingId === user.id ? (
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
            className="border rounded px-2 py-1 w-full"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
           />
          </td>
          <td className="px-4 py-3">
           <input
            className="border rounded px-2 py-1 w-full"
            value={form.role || ""}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
           />
          </td>
          <td className="px-4 py-3">
           <select
            className="border rounded px-2 py-1"
            value={form.status || "Active"}
            onChange={(e) => setForm({ ...form, status: e.target.value as User["status"] })}
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
          <td className="px-4 py-3 font-medium text-gray-800">{user.name}</td>
          <td className="px-4 py-3 text-gray-600">{user.email}</td>
          <td className="px-4 py-3 text-gray-600">{user.role}</td>
          <td className="px-4 py-3">
           <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === "Active"
             ? "bg-green-100 text-green-700"
             : "bg-red-100 text-red-500"
             }`}
           >
            {user.status}
           </span>
          </td>
          <td className="px-4 py-3">
           <div className="flex gap-2">
            <button onClick={() => handleEdit(user)} className="text-blue-400">
             <Pencil className="w-6 h-6" />
            </button>
            <button onClick={() => handleDelete(user.id)} className="text-red-400">
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
       <h2 className="text-xl font-bold text-gray-800">Add User</h2>
       <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
        <X className="w-6 h-6" />
       </button>
      </div>
      <div className="flex flex-col gap-3">
       <input
        placeholder="Name"
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
       />
       <input
        type="text"
        placeholder="your Email"
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
       />
       <input
        placeholder="Role"
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
       />

       <select
        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        value={newUser.status}
        onChange={(e) => setNewUser({ ...newUser, status: e.target.value as User["status"] })}
       >
        <option>Active</option>
        <option>InActive</option>
       </select>
       <button
        onClick={handleAdd}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
       >
        Add User
       </button>
      </div>
     </div>
    </div>
   )}
  </div>
 );
}

