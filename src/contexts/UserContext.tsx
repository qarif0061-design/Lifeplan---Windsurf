import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/types';
import { logout, onAuthStateChangedListener } from '@/firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

interface UserContextType {
  user: UserProfile | null;
  isPremium: boolean;
  login: (name: string) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubUserDoc: (() => void) | null = null;
    const unsubscribe = onAuthStateChangedListener(async (firebaseUser) => {
      if (unsubUserDoc) {
        unsubUserDoc();
        unsubUserDoc = null;
      }

      if (firebaseUser) {
        const fallback: UserProfile = {
          id: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          displayName: firebaseUser.displayName ?? "",
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

        setUser(fallback);
        const ref = doc(db, "users", firebaseUser.uid);
        unsubUserDoc = onSnapshot(
          ref,
          (snap) => {
            if (snap.exists()) {
              const data = snap.data() as UserProfile;
              setUser({ ...data, id: firebaseUser.uid });
            } else {
              setUser(fallback);
            }
          },
          (error) => {
            console.error("Error subscribing to user profile:", error);
            setUser(fallback);
          },
        );
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      if (unsubUserDoc) unsubUserDoc();
      unsubscribe();
    };
  }, []);

  const isPremium = user?.isPremium ?? false;

  const login = async (name: string) => {
    // This is now handled by Firebase auth
    // Keeping for backward compatibility
    console.log('Use signIn() from firebase/auth instead');
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    // Clear remember me on logout
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('userEmail');
  };

  return (
    <UserContext.Provider value={{ user, isPremium, login, logout: handleLogout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};