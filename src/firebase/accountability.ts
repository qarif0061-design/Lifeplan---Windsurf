import {
  addDoc, collection, doc, getDocs, getDoc, updateDoc, deleteDoc,
  query, where, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export type AccountabilityStatus = "pending" | "accepted" | "declined";

export interface Accountability {
  id: string;
  plannerId: string;
  plannerType: "weekly" | "custom";
  plannerTitle: string;
  inviterId: string;
  inviterName: string;
  partnerEmail: string;
  partnerId?: string;
  partnerName?: string;
  status: AccountabilityStatus;
  // Progress % (0-100) the inviter self-reports for the shared planner. Partners only
  // ever see this number — never the planner's private tasks/notes — since the
  // customPlanners/weeklyPlanners collections are read-locked to their owner.
  progressPercent?: number;
  progressUpdatedAt?: unknown;
  createdAt: unknown;
}

const accCol = collection(db, "accountabilities");

export async function createInvite(
  plannerId: string,
  plannerType: "weekly" | "custom",
  plannerTitle: string,
  inviterId: string,
  inviterName: string,
  partnerEmail: string
): Promise<string> {
  const data = {
    plannerId,
    plannerType,
    plannerTitle,
    inviterId,
    inviterName,
    partnerEmail,
    status: "pending" as AccountabilityStatus,
    createdAt: serverTimestamp(),
  };
  const ref = await addDoc(accCol, data);
  return ref.id;
}

export async function acceptInvite(
  inviteId: string,
  partnerId: string,
  partnerName: string
): Promise<void> {
  const ref = doc(accCol, inviteId);
  await updateDoc(ref, {
    status: "accepted",
    partnerId,
    partnerName,
  });
}

export async function declineInvite(inviteId: string): Promise<void> {
  await updateDoc(doc(accCol, inviteId), { status: "declined" });
}

export async function getPendingInvites(email: string): Promise<Accountability[]> {
  const q = query(
    accCol,
    where("partnerEmail", "==", email),
    where("status", "==", "pending")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Accountability));
}

export async function getAccountabilities(userId: string): Promise<Accountability[]> {
  const q1 = query(accCol, where("inviterId", "==", userId));
  const q2 = query(accCol, where("partnerId", "==", userId));
  const [s1, s2] = await Promise.all([getDocs(q1), getDocs(q2)]);
  const results = [
    ...s1.docs.map((d) => ({ id: d.id, ...d.data() } as Accountability)),
    ...s2.docs.map((d) => ({ id: d.id, ...d.data() } as Accountability)),
  ];
  return results.filter((a) => a.status === "accepted");
}

export async function removeAccountability(id: string): Promise<void> {
  await deleteDoc(doc(accCol, id));
}

// Invites the current user sent that haven't been responded to yet.
export async function getSentInvites(inviterId: string): Promise<Accountability[]> {
  const q = query(
    accCol,
    where("inviterId", "==", inviterId),
    where("status", "==", "pending")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Accountability));
}

export const subscribeSentInvites = (
  inviterId: string,
  callback: (invites: Accountability[]) => void
) => {
  const q = query(
    accCol,
    where("inviterId", "==", inviterId),
    where("status", "==", "pending")
  );
  return import("firebase/firestore").then(({ onSnapshot }) =>
    onSnapshot(q, (snap) => {
      const results = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Accountability[];
      callback(results);
    })
  );
};

// The inviter self-reports progress on the shared planner so their partner can see a
// percentage without needing read access to the (owner-locked) planner document.
export async function updateAccountabilityProgress(
  id: string,
  progressPercent: number
): Promise<void> {
  const ref = doc(accCol, id);
  await updateDoc(ref, {
    progressPercent: Math.max(0, Math.min(100, Math.round(progressPercent))),
    progressUpdatedAt: serverTimestamp(),
  });
}

export const subscribePendingInvites = (
  email: string,
  callback: (invites: Accountability[]) => void
) => {
  const q = query(
    accCol,
    where("partnerEmail", "==", email),
    where("status", "==", "pending")
  );
  return import("firebase/firestore").then(({ onSnapshot }) =>
    onSnapshot(q, (snap) => {
      const results = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Accountability[];
      callback(results);
    })
  );
};

export const subscribeActiveAccountabilities = (
  userId: string,
  callback: (accounts: Accountability[]) => void
) => {
  const q1 = query(accCol, where("inviterId", "==", userId), where("status", "==", "accepted"));
  const q2 = query(accCol, where("partnerId", "==", userId), where("status", "==", "accepted"));
  return import("firebase/firestore").then(({ onSnapshot }) => {
    const update = () => {
      getDocs(q1).then((s1) => {
        getDocs(q2).then((s2) => {
          const results = [
            ...s1.docs.map((d) => ({ id: d.id, ...d.data() } as Accountability)),
            ...s2.docs.map((d) => ({ id: d.id, ...d.data() } as Accountability)),
          ];
          callback(results);
        });
      });
    };
    const unsub1 = onSnapshot(q1, update);
    const unsub2 = onSnapshot(q2, update);
    return () => { unsub1(); unsub2(); };
  });
};
