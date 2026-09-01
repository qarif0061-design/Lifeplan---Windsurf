// LIFEPLANS — Single Product Specification / Source of Truth
// This file defines the canonical product rules shared across mobile and website.
// Both platforms MUST use these values. Do not duplicate these constants elsewhere.

// ─── FREE / PREMIUM TIERS ──────────────────────────────────────
export const FREE_GOAL_LIMIT = 3;
export const FREE_DAILY_PLANNER_DAYS = 3;
export const FREE_STRATEGY_ACCESS = false; // strategies are premium-only
export const FREE_SMART_PLANNING = false;
export const FREE_CHECKINS = false;
export const FREE_INSIGHTS = false;
export const FREE_WEEKLY_HISTORY = false;

// ─── PREMIUM PRICING ──────────────────────────────────────────
// Single source of truth for every Pro tier. Never hardcode a price string in a
// screen — read it from PRICING_TIERS. RevenueCat package identifiers (mobile) and
// LemonSqueezy checkout URLs (website) are attached per-tier below so both platforms
// resolve "which product did the user pick" the same way.
export type PricingTierId = 'monthly' | 'annual' | 'lifetime';

export interface PricingTier {
  id: PricingTierId;
  label: string;
  price: string;
  /** Billing period shown next to the price, e.g. "/month". Empty for one-time purchases. */
  period: string;
  /** Short badge shown on the tier card, e.g. "Best Value". Omit for no badge. */
  badge?: string;
  /** RevenueCat's built-in package type — maps to offering.monthly / .annual / .lifetime. */
  revenueCatPackageType: 'MONTHLY' | 'ANNUAL' | 'LIFETIME';
  /** True for a one-time, non-recurring purchase (no renewal, no cancellation). */
  isOneTime: boolean;
}

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: 'monthly',
    label: 'Monthly',
    price: '$4.99',
    period: '/month',
    revenueCatPackageType: 'MONTHLY',
    isOneTime: false,
  },
  {
    id: 'annual',
    label: 'Annual',
    price: '$39.99',
    period: '/year',
    badge: 'Best Value',
    revenueCatPackageType: 'ANNUAL',
    isOneTime: false,
  },
  {
    id: 'lifetime',
    label: 'Lifetime',
    price: '$79.99',
    period: 'one-time',
    badge: 'Pay Once',
    revenueCatPackageType: 'LIFETIME',
    isOneTime: true,
  },
] as const;

export const DEFAULT_PRICING_TIER: PricingTierId = 'annual';

export const getPricingTier = (id: PricingTierId): PricingTier =>
  PRICING_TIERS.find((t) => t.id === id) ?? PRICING_TIERS[0];

// Legacy aliases — a handful of older screens/content still read these directly.
// They now resolve to the monthly tier so nothing breaks; prefer PRICING_TIERS in new code.
export const PREMIUM_MONTHLY_PRICE = getPricingTier('monthly').price;
export const PREMIUM_MONTHLY_PERIOD = 'month';

export const PREMIUM_REFERRAL_REWARD_DAYS = 30;

// ─── PREMIUM MESSAGING ────────────────────────────────────────
// What the paywall advertises. Every line here must correspond to a real, shipped
// feature — do not add marketing copy for anything not actually built.
export const PREMIUM_FEATURES: readonly string[] = [
  'Adaptive Goal Execution — plans recalibrate to what you actually complete',
  'AI-assisted planning for every goal',
  'Unlimited active goals',
  'Advanced progress & analytics',
  'Full Strategy, PDCA & weekly planning history',
  'Shareable Progress Stories',
  'Ad-free experience',
] as const;

// ─── REFERRAL TIERS ──────────────────────────────────────────
export const REFERRAL_TIERS = [
  { referrals: 1, reward: 'premium_template', label: 'Premium Template' },
  { referrals: 3, reward: 'pro_7_days', label: '7 Days Pro', days: 7 },
  { referrals: 5, reward: 'pro_30_days', label: '30 Days Pro', days: 30 },
] as const;

// ─── GOAL MODEL ──────────────────────────────────────────────
export type GoalStatus = 'active' | 'completed' | 'paused' | 'not-started';
export type GoalPriority = 'low' | 'medium' | 'high';
export type GoalCategory = string; // extensible

export const GOAL_STATUSES: readonly GoalStatus[] = ['active', 'completed', 'paused', 'not-started'];
export const GOAL_PRIORITIES: readonly GoalPriority[] = ['low', 'medium', 'high'];

// ─── CHECKPOINT MODEL ────────────────────────────────────────
export type CheckpointKind = 'boolean' | 'number';

// ─── PLAN MODEL ──────────────────────────────────────────────
export type PlanStatus = 'active' | 'completed' | 'reviewed';

// ─── SHARING ─────────────────────────────────────────────────
export type ShareType = 'daily' | 'weekly' | 'goal' | 'month' | 'year' | 'achievement';

export const SHARE_TYPES: readonly ShareType[] = ['daily', 'weekly', 'goal', 'month', 'year', 'achievement'];

export const SHARE_IMAGE_WIDTH = 800;
export const SHARE_IMAGE_HEIGHT_DEFAULT = 500;
export const SHARE_IMAGE_HEIGHT_STREAK = 600;

// ─── ACHIEVEMENTS ────────────────────────────────────────────
export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'goal' | 'plan' | 'streak' | 'share' | 'referral' | 'accountability';
}

export const ACHIEVEMENTS: readonly AchievementDefinition[] = [
  { id: 'first_goal', title: 'First Goal', description: 'Created your first goal', icon: '🎯', category: 'goal' },
  { id: 'first_week', title: 'First Week', description: 'Completed your first week of planning', icon: '📅', category: 'plan' },
  { id: 'streak_7', title: '7-Day Streak', description: '7 days of consistent planning', icon: '🔥', category: 'streak' },
  { id: 'streak_30', title: '30-Day Streak', description: '30 days of consistent planning', icon: '🔥', category: 'streak' },
  { id: 'goal_completed', title: 'Goal Completed', description: 'Completed your first goal', icon: '🏆', category: 'goal' },
  { id: 'goals_10', title: '10 Goals', description: 'Created 10 goals', icon: '🎯', category: 'goal' },
  { id: 'tasks_100', title: '100 Tasks', description: 'Completed 100 tasks', icon: '✅', category: 'plan' },
  { id: 'first_share', title: 'First Share', description: 'Shared your progress for the first time', icon: '📤', category: 'share' },
  { id: 'first_referral', title: 'First Referral', description: 'Referred your first friend', icon: '🤝', category: 'referral' },
] as const;

// ─── ANALYTICS EVENT NAMES ───────────────────────────────────
// Both platforms MUST use these exact event names.
export const ANALYTICS_EVENTS = {
  APP_OPENED: 'app_opened',
  SIGNUP_COMPLETED: 'signup_completed',
  GOAL_CREATED: 'goal_created',
  GOAL_COMPLETED: 'goal_completed',
  DAILY_PLAN_CREATED: 'daily_plan_created',
  WEEKLY_PLAN_CREATED: 'weekly_plan_created',
  PLAN_COMPLETED: 'plan_completed',
  PROGRESS_VIEWED: 'progress_viewed',
  SHARE_STARTED: 'share_started',
  SHARE_CREATED: 'share_created',
  SHARE_LINK_OPENED: 'share_link_opened',
  SHARE_SIGNUP: 'share_signup',
  REFERRAL_INVITE_CREATED: 'referral_invite_created',
  REFERRAL_CLICKED: 'referral_clicked',
  REFERRAL_SIGNUP: 'referral_signup',
  REFERRAL_REWARD_EARNED: 'referral_reward_earned',
  ACCOUNTABILITY_INVITE_SENT: 'accountability_invite_sent',
  CHALLENGE_JOINED: 'challenge_joined',
  TEMPLATE_USED: 'template_used',
  COPY_PLAN_CLICKED: 'copy_plan_clicked',
  SUBSCRIPTION_STARTED: 'subscription_started',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
  STRATEGY_SAVED: 'strategy_saved',
  PREMIUM_VIEWED: 'premium_viewed',
  PREMIUM_PURCHASED: 'premium_purchased',
} as const;

// ─── ANALYTICS EVENT PROPERTIES ──────────────────────────────
export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

// ─── DEEP LINK / URL STRUCTURE ──────────────────────────────
export const WEB_BASE_URL = 'https://goalplanner.io';
export const SHARE_URL_PREFIX = `${WEB_BASE_URL}/progress`;
export const GOAL_SHARE_URL_PREFIX = `${WEB_BASE_URL}/goal`;
export const REFERRAL_URL_PREFIX = `${WEB_BASE_URL}/referral`;

// ─── FIRESTORE COLLECTIONS ──────────────────────────────────
// Canonical collection names. Both platforms must use these.
export const COLLECTIONS = {
  USERS: 'users',
  GOALS: 'goals',
  PLANS: 'plans',
  STRATEGIES: 'strategies',
  CHECKINS: 'checkins',
  DAILY_TASKS: 'daily_tasks',
  ANALYTICS: 'analytics',
  SHARES: 'shares',
  REFERRALS: 'referrals',
  ACCOUNTABILITIES: 'accountabilities',
  TEMPLATES: 'templates',
  CUSTOM_PLANNERS: 'customPlanners',
  WEEKLY_PLANNERS: 'weeklyPlanners',
  ACHIEVEMENTS: 'achievements',
  CHALLENGES: 'challenges',
} as const;
