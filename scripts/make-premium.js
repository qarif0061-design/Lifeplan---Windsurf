import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase/config";

const email = "inertiaenergysolutions6@gmail.com";

async function makeUserPremium() {
  try {
    // First, find the user by email (you'll need to query or know the user ID)
    // For now, let's assume we know the user ID or can query for it
    
    // Method 1: If you know the user ID
    const userId = "USER_ID_HERE"; // Replace with actual user ID
    
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      await updateDoc(userRef, {
        isPremium: true,
        premiumSince: new Date().toISOString(),
        premiumSource: "manual_admin"
      });
      console.log(`Successfully made ${email} a premium user`);
    } else {
      console.log(`User document not found for ID: ${userId}`);
    }
    
  } catch (error) {
    console.error("Error making user premium:", error);
  }
}

// Alternative: If you need to find user by email first
async function findUserByEmailAndMakePremium() {
  try {
    // This would require a query on the users collection
    // Note: You might need to create an email index in Firestore
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log(`No user found with email: ${email}`);
      return;
    }
    
    const userDoc = querySnapshot.docs[0];
    await updateDoc(userDoc.ref, {
      isPremium: true,
      premiumSince: new Date().toISOString(),
      premiumSource: "manual_admin"
    });
    
    console.log(`Successfully made ${email} a premium user`);
    
  } catch (error) {
    console.error("Error finding and making user premium:", error);
  }
}

// Run the function
makeUserPremium();
// or: findUserByEmailAndMakePremium();
