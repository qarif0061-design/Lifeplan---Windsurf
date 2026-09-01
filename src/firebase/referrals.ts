import {
  doc, setDoc, getDoc, getDocs, updateDoc,
  collection, query, where, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export interface Referral {
  id: string;
  userId: string;
  code: string;
  totalSignups: number;
  premiumGranted: number;
  createdAt: unknown;
}

const referralsCol = collection(db, "referrals");

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function getOrCreateReferral(userId: string): Promise<Referral> {
  const q = query(referralsCol, where("userId", "==", userId));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const d = snap.docs[0];
    return { id: d.id, ...d.data() } as Referral;
  }
  const code = generateCode();
  const data = {
    userId,
    code,
    totalSignups: 0,
    premiumGranted: 0,
    createdAt: serverTimestamp(),
  };
  const ref = doc(referralsCol);
  await setDoc(ref, data);
  return { id: ref.id, ...data } as Referral;
}

export async function getReferralByCode(code: string): Promise<Referral | null> {
  const q = query(referralsCol, where("code", "==", code));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Referral;
}

/**
 * Called from the NEW user's own session right after they sign up with someone
 * else's referral code. Only bumps totalSignups — nothing else. Firestore rules
 * only allow a non-owner to touch that one field (see firestore.rules), because
 * this session's auth.uid is the new user, not the referral's owner.
 */
export async function incrementReferralSignups(referralId: string): Promise<void> {
  const ref = doc(referralsCol, referralId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const current = snap.data().totalSignups ?? 0;
  await updateDoc(ref, { totalSignups: current + 1 });
}

/**
 * Grant any REFERRAL_TIERS rewards the signed-in user has newly qualified for, based
 * on their own referral doc's totalSignups vs. the highest tier already rewarded
 * (`premiumGranted`, which stores the highest tier threshold granted so far).
 *
 * Must be called with the current user's own uid — it only ever writes to the
 * caller's own `users/{uid}` and `referrals/{their doc}`, both owner-permitted.
 * Deliberately NOT called from signUp() for the *referrer's* side: a new signee's
 * session can never write another user's `users/{uid}` doc, so this has to run in
 * the referrer's own session instead (e.g. when they open the Referrals page).
 */
export async function checkAndGrantReferralRewards(userId: string): Promise<void> {
  const q = query(referralsCol, where("userId", "==", userId));
  const snap = await getDocs(q);
  if (snap.empty) return;
  const referralDoc = snap.docs[0];
  const data = referralDoc.data();
  const totalSignups: number = data.totalSignups ?? 0;
  const premiumGranted: number = data.premiumGranted ?? 0;

  const { REFERRAL_TIERS } = await import("@/constants/product");
  const nextTier = REFERRAL_TIERS
    .filter((t): t is typeof t & { days: number } => "days" in t && !!t.days && t.referrals > premiumGranted && totalSignups >= t.referrals)
    .sort((a, b) => b.referrals - a.referrals)[0];
  if (!nextTier) return;

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return;

  const user = userSnap.data();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + nextTier.days * 24 * 60 * 60 * 1000).toISOString();
  const existingExpiry = user.premiumExpiresAt ? new Date(user.premiumExpiresAt) : null;
  const finalExpiry = existingExpiry && existingExpiry > now
    ? new Date(existingExpiry.getTime() + nextTier.days * 24 * 60 * 60 * 1000).toISOString()
    : expiresAt;

  await updateDoc(userRef, {
    isPremium: true,
    premiumExpiresAt: finalExpiry,
    premiumSource: "referral",
  });
  await updateDoc(referralDoc.ref, { premiumGranted: nextTier.referrals });

  const { trackReferralRewardEarned } = await import("@/utils/analytics");
  trackReferralRewardEarned(userId, nextTier.days);
}

export const subscribeReferral = (
  userId: string,
  callback: (r: Referral | null) => void
) => {
  const q = query(referralsCol, where("userId", "==", userId));
  return import("firebase/firestore").then(({ onSnapshot }) =>
    onSnapshot(q, (snap) => {
      if (snap.empty) { callback(null); return; }
      const d = snap.docs[0];
      callback({ id: d.id, ...d.data() } as Referral);
    })
  );
};
