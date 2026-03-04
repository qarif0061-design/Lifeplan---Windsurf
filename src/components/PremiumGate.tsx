import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { showSuccess } from '@/utils/toast';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PremiumGate = ({ isPremium, featureName, description, children }) => {
  const { user } = useUser();
  const [showGate, setShowGate] = useState(true);

  const handleClose = () => {
    setShowGate(false);
  };

  if (!isPremium) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-md flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg max-w-4xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Premium Feature</h2>
                <p className="text-gray-500 dark:text-gray-400">{featureName}</p>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              {description}
            </p>
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleClose} 
                variant="secondary" 
                className="rounded-full px-4 py-2 text-gray-900 dark:text-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleClose} 
                variant="primary" 
                className="rounded-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Unlock Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default PremiumGate;