import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBhL4knfyxOe5P-C-ZQrArw--aKpuRFahQ",
  authDomain: "lifeplans-f63f3.firebaseapp.com",
  projectId: "lifeplans-f63f3",
  storageBucket: "lifeplans-f63f3.firebasestorage.app",
  messagingSenderId: "1021085021939",
  appId: "1:1021085021939:web:26b0da6b80c96dc721e986",
  measurementId: "G-81JE11TRLQ"
};

// Initialize Firebase only if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, auth, db, analytics };