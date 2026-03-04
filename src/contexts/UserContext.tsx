import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/types';
import { signIn, signUp, logout, onAuthStateChangedListener } from '@/firebase/auth';

interface UserContextType {
  user: UserProfile | null;
  isPremium: boolean;
  togglePremium: () => void;
  login: (name: string) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, get profile from Firestore
        try {
          const response = await fetch(`/api/users/${firebaseUser.uid}`);
          if (response.ok) {
            const userProfile = await response.json();
            setUser(userProfile);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isPremium = user?.isPremium ?? false;

  const togglePremium = () => {
    if (user) {
      setUser({ ...user, isPremium: !user.isPremium });
      // TODO: Update in Firestore
    }
  };

  const login = async (name: string) => {
    // This is now handled by Firebase auth
    // Keeping for backward compatibility
    console.log('Use signIn() from firebase/auth instead');
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isPremium, togglePremium, login, logout: handleLogout, loading }}>
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