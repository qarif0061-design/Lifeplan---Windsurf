const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.makeUserPremium = functions.https.onCall(async (data, context) => {
  // Check if the caller is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }

  // Check if the caller is an admin (you can implement your own admin check)
  const callerEmail = context.auth.token.email || '';
  const adminEmails = ['shumailasahervu@gmail.com', 'faranh31@gmail.com']; // Add your admin email(s)
  
  if (!adminEmails.includes(callerEmail)) {
    throw new functions.https.HttpsError('permission-denied', 'User is not authorized to perform this action.');
  }

  const { email } = data;
  
  if (!email) {
    throw new functions.https.HttpsError('invalid-argument', 'Email is required.');
  }

  try {
    // Find user by email (this requires admin privileges)
    const userRecord = await admin.auth().getUserByEmail(email);
    const userId = userRecord.uid;

    // Update user document in Firestore
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);
    
    await userRef.update({
      isPremium: true,
      premiumSince: new Date().toISOString(),
      premiumSource: 'admin_cloud_function',
      updatedAt: new Date().toISOString()
    });

    return {
      success: true,
      message: `Successfully made ${email} a premium user`,
      userId: userId
    };

  } catch (error) {
    console.error('Error making user premium:', error);
    
    if (error.code === 'auth/user-not-found') {
      throw new functions.https.HttpsError('not-found', 'User not found with this email.');
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to make user premium.');
  }
});

exports.removeUserPremium = functions.https.onCall(async (data, context) => {
  // Check if the caller is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }

  // Check if the caller is an admin
  const callerEmail = context.auth.token.email || '';
  const adminEmails = ['shumailasahervu@gmail.com', 'faranh31@gmail.com'];
  
  if (!adminEmails.includes(callerEmail)) {
    throw new functions.https.HttpsError('permission-denied', 'User is not authorized to perform this action.');
  }

  const { email } = data;
  
  if (!email) {
    throw new functions.https.HttpsError('invalid-argument', 'Email is required.');
  }

  try {
    // Find user by email
    const userRecord = await admin.auth().getUserByEmail(email);
    const userId = userRecord.uid;

    // Update user document in Firestore
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);
    
    await userRef.update({
      isPremium: false,
      premiumSource: null,
      updatedAt: new Date().toISOString()
    });

    return {
      success: true,
      message: `Successfully removed premium status from ${email}`,
      userId: userId
    };

  } catch (error) {
    console.error('Error removing premium:', error);
    
    if (error.code === 'auth/user-not-found') {
      throw new functions.https.HttpsError('not-found', 'User not found with this email.');
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to remove premium status.');
  }
});

exports.getUserInfo = functions.https.onCall(async (data, context) => {
  // Check if the caller is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }

  // Check if the caller is an admin
  const callerEmail = context.auth.token.email || '';
  const adminEmails = ['shumailasahervu@gmail.com', 'faranh31@gmail.com'];
  
  if (!adminEmails.includes(callerEmail)) {
    throw new functions.https.HttpsError('permission-denied', 'User is not authorized to perform this action.');
  }

  const { email } = data;
  
  if (!email) {
    throw new functions.https.HttpsError('invalid-argument', 'Email is required.');
  }

  try {
    // Find user by email
    const userRecord = await admin.auth().getUserByEmail(email);
    const userId = userRecord.uid;

    // Get user document from Firestore
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return {
        success: true,
        user: {
          uid: userId,
          email: email,
          displayName: userRecord.displayName || '',
          isPremium: false,
          existsInFirestore: false
        }
      };
    }

    const userData = userDoc.data();
    
    return {
      success: true,
      user: {
        uid: userId,
        email: email,
        displayName: userData.displayName || userRecord.displayName || '',
        isPremium: userData.isPremium || false,
        existsInFirestore: true,
        premiumSince: userData.premiumSince || null,
        premiumSource: userData.premiumSource || null
      }
    };

  } catch (error) {
    console.error('Error getting user info:', error);
    
    if (error.code === 'auth/user-not-found') {
      throw new functions.https.HttpsError('not-found', 'User not found with this email.');
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to get user info.');
  }
});
