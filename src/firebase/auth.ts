import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User as FirebaseUser,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { UserProfile } from "@/types";

export const signUp = async (email: string, password: string, displayName: string): Promise<UserProfile> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const firebaseUser = userCredential.user;
  
  // Create user profile in Firestore
  const userProfile: UserProfile = {
    id: firebaseUser.uid,
    email: firebaseUser.email!,
    displayName,
    isPremium: false,
    preferences: {
      theme: 'light',
      notifications: true,
      reminderFrequency: 'daily',
    },
    stats: {
      totalGoals: 0,
      completedGoals: 0,
      currentStreak: 0,
      longestStreak: 0,
      strategiesCreated: 0,
      plansCompleted: 0,
    }
  };
  
  await setDoc(doc(db, "users", firebaseUser.uid), userProfile);
  return userProfile;
};

export const signIn = async (email: string, password: string): Promise<UserProfile> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const firebaseUser = userCredential.user;
  
  // Get user profile from Firestore
  const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }
  
  throw new Error("User profile not found");
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};