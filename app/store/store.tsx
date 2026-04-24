import { create } from 'zustand';

// User
export type User = {
 id: number;
 name: string;
 email: string;
 role: string;
 status: "Active" | "Inactive";
};

type Store = {
 users: User[];
 initUsers: () => void;
 addUser: (user: User) => void;
 removeUser: (id: number) => void;
 updateUser: (id: number, newData: Partial<User>) => void;
}

const saveStorage = (key: string, data: any) => {
 localStorage.setItem(key, JSON.stringify(data));
};

const getItems = (key: string, fallback: any) => {
 if (typeof window === "undefined") return fallback;
 const data = localStorage.getItem(key);
 return data ? (JSON.parse(data)) : fallback;
};

const useStore = create<Store>((set) => ({
 users: [],

 initUsers: () => {
  const data = localStorage.getItem("users");
  if (data) {
   set({ users: JSON.parse(data) });
  }
 },

 // users
 addUser: (user) =>
  set((state) => {
   const newUsers = [...state.users, user];
   saveStorage("users", newUsers);
   return { users: newUsers };
  }),

 removeUser: (id) =>
  set((state) => {
   const newUsers = state.users.filter((user) => user.id !== id);
   saveStorage("users", newUsers);
   return { users: newUsers };
  }),

 updateUser: (id, newData) =>
  set((state) => {
   const newUsers = state.users.map((u) => u.id === id ? { ...u, ...newData } : u
   );
   saveStorage("users", newUsers);
   return { users: newUsers };
  }),
}));

export default useStore;

