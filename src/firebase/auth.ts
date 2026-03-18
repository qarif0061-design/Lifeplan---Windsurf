import { 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  signInWithEmailAndPassword, 
  signOut, 
  User as FirebaseUser,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { UserProfile } from "@/types";

const buildDefaultUserProfile = (firebaseUser: FirebaseUser, displayNameFallback?: string): UserProfile => {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email ?? "",
    displayName: firebaseUser.displayName ?? displayNameFallback ?? "",
    isPremium: false,
    preferences: {
      theme: "light",
      notifications: true,
      reminderFrequency: "daily",
    },
    stats: {
      totalGoals: 0,
      completedGoals: 0,
      currentStreak: 0,
      longestStreak: 0,
      strategiesCreated: 0,
      plansCompleted: 0,
    },
  };
};

const getOrCreateUserProfile = async (firebaseUser: FirebaseUser, displayNameFallback?: string): Promise<UserProfile> => {
  const ref = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return { ...(snap.data() as UserProfile), id: firebaseUser.uid };
  }

  const profile = buildDefaultUserProfile(firebaseUser, displayNameFallback);
  await setDoc(ref, profile);
  return profile;
};

export const signUp = async (email: string, password: string, displayName: string): Promise<UserProfile> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const firebaseUser = userCredential.user;
  
  // Create user profile in Firestore
  const userProfile: UserProfile = buildDefaultUserProfile(firebaseUser, displayName);
  
  await setDoc(doc(db, "users", firebaseUser.uid), userProfile);
  return userProfile;
};

export const signIn = async (email: string, password: string): Promise<UserProfile> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const firebaseUser = userCredential.user;

  return getOrCreateUserProfile(firebaseUser);
};

export const signInWithGoogle = async (): Promise<UserProfile> => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  return getOrCreateUserProfile(userCredential.user);
};

export const signInWithGithub = async (): Promise<UserProfile> => {
  const provider = new GithubAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  return getOrCreateUserProfile(userCredential.user);
};

export const signInWithApple = async (): Promise<UserProfile> => {
  const provider = new OAuthProvider("apple.com");
  const userCredential = await signInWithPopup(auth, provider);
  return getOrCreateUserProfile(userCredential.user);
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};