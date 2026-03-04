import Layout from "@/components/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Target, Users, Ban, Save, Sparkles, Loader2, Brain, Lightbulb } from "lucide-react";
import PremiumGate from "@/components/PremiumGate";
import { useUser } from "@/contexts/UserContext";
import { showSuccess } from "@/utils/toast";

const Strategy = () => {
  const { isPremium } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState("");
  const [strategyData, setStrategyData] = useState({
    whyMatters: "",
    whoBenefits: "",
    sayNoTo: ""
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setSummary("I will launch LifePlan Web to empower high achievers with a structured goal-planning system, benefiting my future self and the community, by saying 'No' to distractions and low-impact tasks.");
      showSuccess("AI Strategy Statement generated!");
    }, 2000);
  };

  const handleSave = () => {
    showSuccess("Strategy saved successfully!");
  };

  const updateStrategyData = (field: string, value: string) => {
    setStrategyData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Strategy System</h1>
            <p className="text-gray-500">Define the foundation of your success.</p>
          </div>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 rounded-full">
            <Save className="w-4 h-4 mr-2" /> Save Strategy
          </Button>
        </div>

        <PremiumGate 
          isPremium={isPremium} 
          featureName="Strategy System"
          description="The Strategy System helps you build deep conviction and focus for your goals."
        >
          <div className="grid gap-8">
            {/* Why it matters */}
            <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
              <div className="h-2 bg-blue-600" />
              <CardHeader className="flex flex-row items-center gap-4 pt-8">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Why does this matter?</CardTitle>
                  <p className="text-sm text-gray-500">Define your core motivation and purpose.</p>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <textarea 
                  value={strategyData.whyMatters}
                  onChange={(e) => updateStrategyData("whyMatters", e.target.value)}
                  className="w-full min-h-[150px] rounded-2xl border-gray-100 p-4 text-base focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" 
                  placeholder="If I achieve this goal, my life will change because..."
                />
              </CardContent>
            </Card>

            {/* Who benefits */}
            <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
              <div className="h-2 bg-purple-600" />
              <CardHeader className="flex flex-row items-center gap-4 pt-8">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Who benefits from your success?</CardTitle>
                  <p className="text-sm text-gray-500">Think about your family, community, or future self.</p>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <textarea 
                  value={strategyData.whoBenefits}
                  onChange={(e) => updateStrategyData("whoBenefits", e.target.value)}
                  className="w-full min-h-[150px] rounded-2xl border-gray-100 p-4 text-base focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50/50" 
                  placeholder="The people who will be proud of me or benefit from this are..."
                />
              </CardContent>
            </Card>

            {/* Say No To */}
            <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
              <div className="h-2 bg-rose-600" />
              <CardHeader className="flex flex-row items-center gap-4 pt-8">
                <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
                  <Ban className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">What will you say 'No' to?</CardTitle>
                  <p className="text-sm text-gray-500">Success is as much about what you don't do.</p>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <textarea 
                  value={strategyData.sayNoTo}
                  onChange={(e) => updateStrategyData("sayNoTo", e.target.value)}
                  className="w-full min-h-[150px] rounded-2xl border-gray-100 p-4 text-base focus:ring-2 focus:ring-rose-500 outline-none bg-gray-50/50" 
                  placeholder="To achieve this, I must stop doing..."
                />
              </CardContent>
            </Card>

            {/* AI Summary (Premium) */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-blue-200" />
                  <span className="text-sm font-bold uppercase tracking-widest text-blue-100">AI Strategy Summary</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Generate your Strategy Statement</h3>
                <p className="text-blue-100 mb-6 max-w-xl">Our AI will analyze your answers to create a powerful, concise mission statement you can use as a daily mantra.</p>
                
                {summary ? (
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 mb-6 animate-in zoom-in duration-300">
                    <p className="text-lg font-medium italic">"{summary}"</p>
                  </div>
                ) : null}

                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating}
                  variant="secondary" 
                  className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl px-8"
                >
                  {isGenerating ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                  ) : (
                    "Generate Statement"
                  )}
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            </div>

            {/* Strategy Tips */}
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-amber-50 border border-amber-100">
              <CardHeader className="flex flex-row items-center gap-4 pt-8">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-amber-900">Pro Tips</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-amber-800">Be Specific</h4>
                    <p className="text-sm text-amber-700">Instead of "help people," say "help 1000 professionals achieve their career goals."</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-amber-800">Focus on Impact</h4>
                    <p className="text-sm text-amber-700">Think about the transformation, not just the outcome. What will change?</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-amber-800">Be Honest</h4>
                    <p className="text-sm text-amber-700">Identify real distractions. What actually pulls you away from your goals?</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-amber-800">Think Long-term</h4>
                    <p className="text-sm text-amber-700">Consider how this affects your future self and legacy, not just immediate results.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </PremiumGate>
      </div>
    </Layout>
  );
};

export default Strategy;