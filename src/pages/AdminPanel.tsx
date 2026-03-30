import React, { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/firebase/config';
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
      const getUserInfo = httpsCallable(functions, 'getUserInfo');
      const result = await getUserInfo({ email });
      
      const data = result.data as any;

      if (data.success) {
        setUserFound(data.user);
        setMessage(`User found: ${data.user.displayName || data.user.email}`);
      } else {
        setMessage('Error: ' + (data.message || 'Unknown error'));
      }
    } catch (error: any) {
      console.error('Error searching for user:', error);
      if (error.code === 'permission-denied') {
        setMessage('Permission denied. You must be an admin to perform this action.');
      } else if (error.code === 'not-found') {
        setMessage('No user found with this email address');
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
      const makeUserPremium = httpsCallable(functions, 'makeUserPremium');
      const result = await makeUserPremium({ email });
      
      const data = result.data as any;

      if (data.success) {
        setMessage(`Successfully made ${email} a premium user!`);
        setUserFound(prev => ({ ...prev, isPremium: true }));
      } else {
        setMessage('Error making user premium: ' + (data.message || 'Unknown error'));
      }
    } catch (error: any) {
      console.error('Error making user premium:', error);
      if (error.code === 'permission-denied') {
        setMessage('Permission denied. You must be an admin to perform this action.');
      } else if (error.code === 'not-found') {
        setMessage('User not found with this email address');
      } else {
        setMessage('Error making user premium: ' + (error.message || 'Unknown error'));
      }
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
      const removeUserPremium = httpsCallable(functions, 'removeUserPremium');
      const result = await removeUserPremium({ email });
      
      const data = result.data as any;

      if (data.success) {
        setMessage(`Successfully removed premium status from ${email}`);
        setUserFound(prev => ({ ...prev, isPremium: false }));
      } else {
        setMessage('Error removing premium: ' + (data.message || 'Unknown error'));
      }
    } catch (error: any) {
      console.error('Error removing premium:', error);
      if (error.code === 'permission-denied') {
        setMessage('Permission denied. You must be an admin to perform this action.');
      } else if (error.code === 'not-found') {
        setMessage('User not found with this email address');
      } else {
        setMessage('Error removing premium: ' + (error.message || 'Unknown error'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicPageLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Panel - Premium User Management</h1>
          
          <div className="space-y-6">
            {/* Search Section */}
            <div className="border-b pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Search User</h2>
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter user email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={searchUser}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
              
              {message && (
                <div className={`mt-4 p-4 rounded-lg ${
                  message.includes('Successfully') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {message}
                </div>
              )}
            </div>

            {/* User Info & Actions */}
            {userFound && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-gray-600">Name:</span>
                    <p className="font-medium">{userFound.displayName || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <p className="font-medium">{userFound.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">User ID:</span>
                    <p className="font-medium text-sm">{userFound.uid || userFound.id}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Premium Status:</span>
                    <p className={`font-medium ${userFound.isPremium ? 'text-green-600' : 'text-gray-600'}`}>
                      {userFound.isPremium ? 'Premium ✅' : 'Free'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  {!userFound.isPremium ? (
                    <button
                      onClick={makePremium}
                      disabled={loading}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setEmail('inertiaenergysolutions6@gmail.com');
                    setMessage('Email pre-filled. Click "Search" to find user.');
                  }}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-left"
                >
                  📧 Pre-fill inertiaenergysolutions6@gmail.com
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

export default AdminPanel;
