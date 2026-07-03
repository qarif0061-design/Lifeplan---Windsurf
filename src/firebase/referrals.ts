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

export async function incrementReferralSignups(referralId: string): Promise<void> {
  const ref = doc(referralsCol, referralId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const current = snap.data().totalSignups ?? 0;
  await updateDoc(ref, { totalSignups: current + 1 });
}

export async function grantReferrerPremium(referralId: string): Promise<void> {
  const ref = doc(referralsCol, referralId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const data = snap.data();
  const referrerId = data.userId;

  // Grant 30 days premium to referrer
  const userRef = doc(db, "users", referrerId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return;

  const user = userSnap.data();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const existingExpiry = user.premiumExpiresAt ? new Date(user.premiumExpiresAt) : null;

  // Extend existing premium or set new
  const finalExpiry = existingExpiry && existingExpiry > now
    ? new Date(existingExpiry.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()
    : expiresAt;

  await updateDoc(userRef, {
    isPremium: true,
    premiumExpiresAt: finalExpiry,
    premiumSource: "referral",
  });

  const currentGranted = data.premiumGranted ?? 0;
  await updateDoc(ref, { premiumGranted: currentGranted + 1 });
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
