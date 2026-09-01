import React, { useState } from 'react';
import { doc, updateDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import PublicPageLayout from "@/components/PublicPageLayout";

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userFound, setUserFound] = useState<any>(null);

  const searchUser = async () => {
    if (!email) {
      setMessage('Please enter an email address');
      return;
    }

    setLoading(true);
    setMessage('');
    setUserFound(null);

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage('No user found with this email address');
      } else {
        const userData = querySnapshot.docs[0].data();
        setUserFound({
          id: querySnapshot.docs[0].id,
          ...userData
        });
        setMessage(`User found: ${userData.displayName || userData.email}`);
      }
    } catch (error: any) {
      console.error('Error searching for user:', error);
      if (error.code === 'permission-denied') {
        setMessage('🔧 Permission denied. Please update Firestore rules to allow admin access. See console for instructions.');
        console.log(`
        🔧 FIRESTORE RULES UPDATE NEEDED:
        
        Add these rules to your firestore.rules file:
        
        match /users/{userId} {
          allow read: if signedIn() && (request.auth.uid == userId || request.auth.token.email == 'shumailasahervu@gmail.com' || request.auth.token.email == 'faranh31@gmail.com');
          allow update: if signedIn() && (request.auth.uid == userId || request.auth.token.email == 'shumailasahervu@gmail.com' || request.auth.token.email == 'faranh31@gmail.com');
        }
        
        Then deploy: firebase deploy --only firestore:rules
        `);
      } else {
        setMessage('Error searching for user: ' + (error.message || 'Unknown error'));
      }
    } finally {
      setLoading(false);
    }
  };

  const makePremium = async () => {
    if (!userFound) {
      setMessage('Please search for a user first');
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, "users", userFound.id);
      await updateDoc(userRef, {
        isPremium: true,
        premiumSince: new Date().toISOString(),
        premiumSource: "admin_manual",
        updatedAt: new Date().toISOString()
      });

      setMessage(`Successfully made ${email} a premium user!`);
      setUserFound(prev => ({ ...prev, isPremium: true }));
    } catch (error: any) {
      console.error('Error making user premium:', error);
      setMessage('Error making user premium: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const removePremium = async () => {
    if (!userFound) {
      setMessage('Please search for a user first');
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, "users", userFound.id);
      await updateDoc(userRef, {
        isPremium: false,
        premiumSource: null,
        updatedAt: new Date().toISOString()
      });

      setMessage(`Successfully removed premium status from ${email}`);
      setUserFound(prev => ({ ...prev, isPremium: false }));
    } catch (error: any) {
      console.error('Error removing premium:', error);
      setMessage('Error removing premium: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicPageLayout>
      <div className="min-h-screen bg-secondary/40 py-8">
        <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-foreground mb-6">Admin Panel - Premium User Management</h1>

          <div className="space-y-6">
            {/* Search Section */}
            <div className="border-b pb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Search User</h2>
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter user email"
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={searchUser}
                  disabled={loading}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>

              {message && (
                <div className={`mt-4 p-4 rounded-lg ${
                  message.includes('Successfully') ? 'bg-momentum/10 text-momentum' : 'bg-red-50 text-red-800'
                }`}>
                  {message}
                </div>
              )}
            </div>

            {/* User Info & Actions */}
            {userFound && (
              <div className="bg-secondary/40 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">User Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-muted-foreground">Name:</span>
                    <p className="font-medium">{userFound.displayName || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <p className="font-medium">{userFound.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">User ID:</span>
                    <p className="font-medium text-sm">{userFound.uid || userFound.id}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Premium Status:</span>
                    <p className={`font-medium ${userFound.isPremium ? 'text-momentum' : 'text-muted-foreground'}`}>
                      {userFound.isPremium ? 'Premium ✅' : 'Free'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  {!userFound.isPremium ? (
                    <button
                      onClick={makePremium}
                      disabled={loading}
                      className="px-6 py-3 bg-momentum text-momentum-foreground rounded-lg hover:bg-momentum/90 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Make Premium'}
                    </button>
                  ) : (
                    <button
                      onClick={removePremium}
                      disabled={loading}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Remove Premium'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setEmail('inertiaenergysolutions6@gmail.com');
                    setMessage('Email pre-filled. Click "Search" to find user.');
                  }}
                  className="w-full px-4 py-2 bg-secondary text-foreground/80 rounded-lg hover:bg-secondary/70 text-left"
                >
                  📧 Pre-fill inertiaenergysolutions6@gmail.com
                </button>
                <button
                  onClick={() => {
                    setEmail('faranh31@gmail.com');
                    setMessage('Email pre-filled. Click "Search" to find user.');
                  }}
                  className="w-full px-4 py-2 bg-secondary text-foreground/80 rounded-lg hover:bg-secondary/70 text-left"
                >
                  👤 Pre-fill faranh31@gmail.com (Admin)
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">🔧 Setup Instructions</h3>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> To use this admin panel, you need to update your Firestore rules to allow admin access.
                </p>
                <ol className="mt-2 text-sm text-yellow-800 list-decimal list-inside">
                  <li>Open <code className="bg-yellow-100 px-1 rounded">firestore.rules</code></li>
                  <li>Add admin access rules (see console for details)</li>
                  <li>Deploy: <code className="bg-yellow-100 px-1 rounded">firebase deploy --only firestore:rules</code></li>
                  <li>Refresh this page and try again</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

export default AdminPanel;
