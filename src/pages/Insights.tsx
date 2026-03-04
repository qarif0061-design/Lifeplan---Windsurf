import PremiumGate from "@/components/PremiumGate";

const Insights = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Insights</h1>
        <p className="text-lg text-gray-600">Analytics and performance metrics for your goals.</p>
        <PremiumGate />
      </div>
    </div>
  );
};

export default Insights;