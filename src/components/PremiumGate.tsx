import React from "react";
import { Button } from "@/components/ui/button";
import { Crown, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PremiumGateProps {
  children: React.ReactNode;
  isPremium: boolean;
  featureName: string;
  description?: string;
}

const PremiumGate = ({ children, isPremium, featureName, description }: PremiumGateProps) => {
  if (isPremium) return <>{children}</>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative cursor-pointer group">
          <div className="absolute inset-0 bg-gray-50/50 backdrop-blur-[1px] z-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white p-2 rounded-full shadow-lg">
              <Lock className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <div className="opacity-60 grayscale-[0.5] pointer-events-none">
            {children}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-[2rem]">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-4">
            <Crown className="w-6 h-6 text-amber-600" />
          </div>
          <DialogTitle className="text-2xl font-bold">Unlock {featureName}</DialogTitle>
          <DialogDescription className="text-gray-500 pt-2">
            {description || `The ${featureName} system is a premium feature designed for users committed to long-term growth.`}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-1 text-sm">Premium Benefits:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Unlimited active goals</li>
              <li>• AI-powered Smart Planning</li>
              <li>• Full Strategy System access</li>
              <li>• Advanced PDCA weekly reviews</li>
            </ul>
          </div>
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl h-12 text-lg font-semibold">
            <Link to="/pricing">Upgrade to Premium</Link>
          </Button>
          <Button variant="ghost" className="w-full rounded-xl" onClick={() => {}}>
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumGate;