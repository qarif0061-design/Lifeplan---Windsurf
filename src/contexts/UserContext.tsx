import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '@/types';

interface UserContextType {
  user: UserProfile | null;
  isPremium: boolean;
  togglePremium: () => void;
  login: (name: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>({
    id: 'u1',
    email: 'arif@example.com',
    displayName: 'Arif',
    isPremium: false,
    preferences: {
      theme: 'light',
      notifications: true,
      reminderFrequency: 'daily',
    },
    stats: {
      totalGoals: 3,
      completedGoals: 12,
      currentStreak: 5,
      longestStreak: 14,
      strategiesCreated: 2,
      plansCompleted: 8,
    }
  });

  const isPremium = user?.isPremium ?? false;

  const togglePremium = () => {
    if (user) {
      setUser({ ...user, isPremium: !user.isPremium });
    }
  };

  const login = (name: string) => {
    setUser({
      id: 'u1',
      email: `${name.toLowerCase()}@example.com`,
      displayName: name,
      isPremium: false,
      preferences: { theme: 'light', notifications: true, reminderFrequency: 'daily' },
      stats: { totalGoals: 0, completedGoals: 0, currentStreak: 0, longestStreak: 0, strategiesCreated: 0, plansCompleted: 0 }
    });
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, isPremium, togglePremium, login, logout }}>
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