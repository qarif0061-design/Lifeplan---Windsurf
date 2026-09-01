import { ANALYTICS_EVENTS, type AnalyticsEventName } from "@/constants/product";
import { db } from "@/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

type EventProperties = Record<string, unknown>;

export const logEvent = async (
  userId: string,
  eventName: AnalyticsEventName,
  properties?: EventProperties
): Promise<void> => {
  try {
    await addDoc(collection(db, "analytics"), {
      userId,
      event: eventName,
      properties: properties ?? {},
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.warn("[analytics] Failed to log event:", eventName, err);
  }
};

export const trackGoalCreated = (userId: string) =>
  logEvent(userId, ANALYTICS_EVENTS.GOAL_CREATED);

export const trackGoalCompleted = (userId: string) =>
  logEvent(userId, ANALYTICS_EVENTS.GOAL_COMPLETED);

export const trackDailyPlanCreated = (userId: string) =>
  logEvent(userId, ANALYTICS_EVENTS.DAILY_PLAN_CREATED);

export const trackShareCreated = (userId: string, shareType: string) =>
  logEvent(userId, ANALYTICS_EVENTS.SHARE_CREATED, { shareType });

export const trackReferralInviteCreated = (userId: string) =>
  logEvent(userId, ANALYTICS_EVENTS.REFERRAL_INVITE_CREATED);

export const trackReferralSignup = (userId: string, referrerId?: string) =>
  logEvent(userId, ANALYTICS_EVENTS.REFERRAL_SIGNUP, { referrerId });

export const trackReferralRewardEarned = (userId: string, days?: number) =>
  logEvent(userId, ANALYTICS_EVENTS.REFERRAL_REWARD_EARNED, { days });

export const trackAccountabilityInviteSent = (userId: string) =>
  logEvent(userId, ANALYTICS_EVENTS.ACCOUNTABILITY_INVITE_SENT);

export const trackChallengeJoined = (userId: string, challengeId: string) =>
  logEvent(userId, ANALYTICS_EVENTS.CHALLENGE_JOINED, { challengeId });

export const trackCopyPlanClicked = (userId: string, publicId: string) =>
  logEvent(userId, ANALYTICS_EVENTS.COPY_PLAN_CLICKED, { publicId });

export const trackShareLinkOpened = (userId: string, publicId: string) =>
  logEvent(userId, ANALYTICS_EVENTS.SHARE_LINK_OPENED, { publicId });

export const trackPremiumViewed = (userId: string) =>
  logEvent(userId, ANALYTICS_EVENTS.PREMIUM_VIEWED);

export const trackPremiumPurchased = (userId: string, source: string) =>
  logEvent(userId, ANALYTICS_EVENTS.PREMIUM_PURCHASED, { source });
