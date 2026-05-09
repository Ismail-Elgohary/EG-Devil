"use client";

import {
 createContext,
 ReactNode,
 useContext,
 useEffect,
 useState,
} from "react";

import {
 createUserWithEmailAndPassword,
 User as FirebaseUser,
 GoogleAuthProvider,
 onAuthStateChanged,
 signInWithEmailAndPassword,
 signInWithPopup,
 signOut,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

type AppUser = {
 uid: string;
 email: string | null;
 image?: string | null;
 role: "user" | "admin";
};

type AuthContextType = {
 user: AppUser | null;
 loading: boolean;

 login: (email: string, password: string) => Promise<void>;
 register: (email: string, password: string) => Promise<void>;
 loginWithGoogle: () => Promise<void>;
 logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
 const [user, setUser] = useState<AppUser | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser: FirebaseUser | null) => {
   if (currentUser) {
    const ref = doc(db, "users", currentUser.uid);
    const snap = await getDoc(ref);

    setUser({
     uid: currentUser.uid,
     email: currentUser.email,
     image: currentUser.photoURL,
     role: snap.exists() ? snap.data().role : "user",
    });
   } else {
    setUser(null);
   }

   setLoading(false);
  });

  return () => unsubscribe();
 }, []);

 // LOGIN
 const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
 };

 // REGISTER + create user in Firestore
 const register = async (email: string, password: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", res.user.uid), {
   email,
   role: "user",
  });
 };

 // GOOGLE LOGIN
 const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);

  const ref = doc(db, "users", res.user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
   await setDoc(ref, {
    email: res.user.email,
    role: "user",
   });
  }
 };

 // LOGOUT
 const logout = async () => {
  await signOut(auth);
  setUser(null);
 };

 return (
  <AuthContext.Provider
   value={{
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
   }}
  >
   {children}
  </AuthContext.Provider>
 );
}

export const useAuth = () => {
 const context = useContext(AuthContext);
 if (!context) throw new Error("useAuth must be inside AuthProvider");
 return context;
};
