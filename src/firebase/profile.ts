import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export const updateDisplayName = async (userId: string, displayName: string): Promise<void> => {
  const ref = doc(db, "users", userId);
  await updateDoc(ref, { displayName });
};
