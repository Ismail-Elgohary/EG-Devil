import { create } from "zustand";

export type User = {
 id: string;
 name: string;
 email: string;
 role: string;
 status: "Active" | "Inactive";
};

type Store = {
 users: User[];

 initUsers: () => Promise<void>;
 addUser: (user: Omit<User, "id">) => Promise<void>;
 removeUser: (id: number) => Promise<void>;
 updateUser: (id: number, newData: Partial<User>) => Promise<void>;
};

const useStore = create<Store>((set, get) => ({
 users: [],

 initUsers: async () => {
  const res = await fetch("/api/users");
  const data = await res.json();
  set({ users: data });
 },

 addUser: async (user) => {
  await fetch("/api/users", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(user),
  });

  await get().initUsers();
 },

 removeUser: async (id) => {
  await fetch("/api/users", {
   method: "DELETE",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ id }),
  });

  await get().initUsers();
 },

 updateUser: async (id, newData) => {
  await fetch("/api/users", {
   method: "PATCH",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ id, ...newData }),
  });

  await get().initUsers();
 },
}));

export default useStore;
