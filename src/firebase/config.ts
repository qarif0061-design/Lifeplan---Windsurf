import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const envConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined,
};

const fallbackConfig = {
  apiKey: "AIzaSyBhL4knfyxOe5P-C-ZQrArw--aKpuRFahQ",
  authDomain: "lifeplans-f63f3.firebaseapp.com",
  projectId: "lifeplans-f63f3",
  storageBucket: "lifeplans-f63f3.firebasestorage.app",
  messagingSenderId: "1021085021939",
  appId: "1:1021085021939:web:26b0da6b80c96dc721e986",
  measurementId: "G-81JE11TRLQ",
};

const firebaseConfig = envConfig.projectId ? (envConfig as typeof fallbackConfig) : fallbackConfig;

// Initialize Firebase only if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch {
    analytics = null;
  }
}

export { app, auth, db, analytics };