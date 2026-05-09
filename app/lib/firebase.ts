import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
 apiKey: "AIzaSyBKrOwRJabjZdSIVO4jDtOVIbM1bOUpg-E",
 authDomain: "flxx-ecc59.firebaseapp.com",
 projectId: "flxx-ecc59",
 storageBucket: "flxx-ecc59.firebasestorage.app",
 messagingSenderId: "379511026505",
 appId: "1:379511026505:web:890767eefe022c0810e098",
 measurementId: "G-CM3J7V4NXX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;

