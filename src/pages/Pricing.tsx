import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Shield, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { showSuccess } from "@/utils/toast";
import HelpDialog from "@/components/HelpDialog";
import Layout from "@/components/Layout";

const Pricing = () => {
  const { isPremium, togglePremium, user } = useUser();
  const navigate = useNavigate();

  const handleUpgrade = (planName: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    if (planName === "Free") return;

    togglePremium();
    showSuccess(`Successfully upgraded to ${planName}!`);
    navigate("/dashboard");
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started with basic goal tracking.",
      features: [
        "Up to 3 active goals",
        "Basic weekly planning",
        "Daily check-ins",
        "Community support",
      ],
      buttonText: isPremium ? "Downgrade" : "Current Plan",
      buttonVariant: "outline" as const,
      highlight: false,
    },
    {
      name: "Premium",
      price: "$4.99",
      period: "/month",
      description: "The complete system for high achievers and professionals.",
      features: [
        "Unlimited active goals",
        "Full Strategy System access",
        "AI-powered Strategy Summaries",
        "Advanced PDCA Weekly Reviews",
        "Detailed Progress Analytics",
        "Priority Email Support",
      ],
      buttonText: isPremium ? "Current Plan" : "Upgrade to Premium",
      buttonVariant: (isPremium ? "outline" : "default") as "outline" | "default",
      highlight: true,
      icon: Crown,
    },
    {
      name: "Yearly",
      price: "$49.99",
      period: "/year",
      description: "Save with annual billing for full access to all Premium features.",
      features: [
        "Everything in Premium",
        "Annual billing",
        "Priority email support",
      ],
      buttonText: "Get Yearly Access",
      buttonVariant: "outline" as const,
      highlight: false,
    },
  ];

  return (
    <Layout>
      <div className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your ambition. Start for free and upgrade as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-[3rem] p-8 border-2 transition-all hover:shadow-xl ${
                  plan.highlight ? 'border-blue-600 shadow-lg scale-105 z-10' : 'border-transparent shadow-sm'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                    <Star className="w-4 h-4 fill-white" /> Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 font-medium">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handleUpgrade(plan.name)}
                  variant={plan.buttonVariant} 
                  className={`w-full rounded-2xl h-12 text-lg font-bold ${
                    plan.highlight && !isPremium ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-blue-600 rounded-[3rem] p-12 text-white text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                We're here to help you find the right plan for your goals. Contact our support team anytime.
              </p>
              <HelpDialog triggerVariant="secondary" triggerClassName="rounded-full px-8 bg-white text-blue-600 hover:bg-blue-50" />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700 rounded-full -ml-32 -mb-32 blur-3xl" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;