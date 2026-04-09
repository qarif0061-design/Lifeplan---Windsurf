export type Timeframe = 'weeks' | 'months';
export type GoalStatus = 'active' | 'completed' | 'paused' | 'not-started';
export type Priority = 'low' | 'medium' | 'high';
export type EnergyLevel = 'low' | 'medium' | 'high';

export type GoalTodo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GoalCheckpoint = {
  id: string;
  title: string;
  kind?: 'boolean' | 'number';
  completed: boolean;
  current?: number;
  target?: number;
  createdAt: string;
  updatedAt: string;
};

export type GoalNote = {
  id: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  isPremium: boolean;
  premiumExpiresAt?: string;
  featuredGoalId?: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    reminderFrequency: 'daily' | 'weekly' | 'monthly';
  };
  stats: {
    totalGoals: number;
    completedGoals: number;
    currentStreak: number;
    longestStreak: number;
    strategiesCreated: number;
    plansCompleted: number;
  };
}

export interface Goal {
  id: string;
  userId: string;
  name: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  dueAt?: string; // derived from endDate for legacy views
  timeframe?: Timeframe;
  timeframeValue?: number;
  strategy?: {
    whyMatters: string;
    whoBenefits: string;
    sayNoTo: string;
  };
  planning?: {
    obstacles?: string;
    nextActions?: string;
    aiPreview?: string;
  };
  todos?: GoalTodo[];
  successMetric: {
    type: 'number' | 'yes-no';
    target?: number;
    unit?: string;
  };
  status: GoalStatus;
  progress: number;
  checkpoints?: GoalCheckpoint[];
  notes?: GoalNote[]; // Add notes field
  priority: Priority;
  category: string;
  description?: string;
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

export interface Strategy {
  id: string;
  userId: string;
  goalId: string;
  answers: {
    whyMatters: string;
    whoBenefits: string;
    sayNoTo: string;
  };
  summary?: string;
  isPremium?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlanTask {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
  isDistraction?: boolean;
}

export interface Plan {
  id: string;
  userId: string;
  goalId: string;
  strategyId?: string;
  weekStart: string;
  priorities: string[];
  tasks: PlanTask[];
  status: 'active' | 'completed' | 'reviewed';
  pdcaReview?: {
    whatWorked: string;
    whatDidnt: string;
    whatShouldChange: string;
    reviewedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DailyCheckIn {
  id: string;
  userId: string;
  dateKey: string;
  exercise: { done: boolean; notes?: string };
  healthyEating: { done: boolean; notes?: string };
  hydration: { done: boolean; notes?: string };
  createdAt: string;
  updatedAt: string;
}