import { Button } from "@/components/ui/button";

const PremiumGate = () => {
  const handleClose = () => { /* Add your close logic here */ };
  
  return (
    <Button 
      onClick={handleClose}
      variant="default"
      className="rounded-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
    >
      Unlock Premium
    </Button>
  );
};

export default PremiumGate;