import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, Crown } from "lucide-react";
import { Link } from "react-router-dom";

interface PremiumPopupProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

const PremiumPopup = ({ isOpen, onClose, feature }: PremiumPopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Crown className="w-6 h-6 text-yellow-500" />
            Premium Feature
          </DialogTitle>
          <DialogDescription className="text-base">
            {feature} is available for Premium members only. Upgrade to unlock this feature and more.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">With Premium, you get:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Unlimited daily check-ins</li>
              <li>• Streak tracking and analytics</li>
              <li>• Unlimited daily planner tasks</li>
              <li>• Advanced goal tracking</li>
              <li>• Priority support</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 flex-1">
              <Link to="/pricing" onClick={onClose}>
                Upgrade to Premium
              </Link>
            </Button>
            <Button variant="outline" onClick={onClose} className="rounded-full">
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumPopup;
