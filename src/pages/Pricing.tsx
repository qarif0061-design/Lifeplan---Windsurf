import { Button } from "@/components/ui/button";
import { Check, Crown, Minus, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import HelpDialog from "@/components/HelpDialog";
import Layout from "@/components/Layout";

const Pricing = () => {
  const { isPremium, user } = useUser();
  const navigate = useNavigate();

  const checkoutLinks = {
    monthly:
      "https://goalplanner.lemonsqueezy.com/checkout/buy/1941520?enabled=1242156",
  } as const;

  const buildCheckoutUrl = (base: string) => {
    if (!user) return base;

    const url = new URL(base);
    url.searchParams.set("checkout[custom][user_id]", user.id);
    return url.toString();
  };

  const handleUpgrade = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (isPremium) return;
    window.location.assign(buildCheckoutUrl(checkoutLinks.monthly));
  };

  const comparisonFeatures = [
    { label: "Active Goals", free: "1", premium: "Unlimited" },
    { label: "Weekly Planning", free: true, premium: true },
    { label: "Goal Strategy & Planning", free: "Limited", premium: "Full Access" },
    { label: "Daily Planner Tasks", free: "Up to 3 days", premium: "Unlimited" },
    { label: "Daily Check-ins", free: false, premium: true },
    { label: "Insights & Analytics", free: false, premium: true },
    { label: "Weekly Planning History", free: false, premium: true },
    { label: "Strategy System", free: false, premium: true },
    { label: "Priority Email Support", free: false, premium: true },
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started with basic goal tracking.",
      features: [
        "Create 1 goal",
        "Basic weekly planning",
        "Limited goal strategy & planning",
        "Daily Planner (up to 3 days)",
      ],
      buttonText: isPremium ? "Downgrade" : "Current Plan",
      buttonVariant: "outline" as const,
      highlight: false,
    },
    {
      name: "Premium",
      price: "$0.99",
      period: "/month",
      description: "Unlock unlimited goals, full strategy access, and everything you need to succeed.",
      features: [
        "Unlimited active goals",
        "Full Strategy System access",
        "Smart planning for each goal",
        "Unlimited Daily Planner tasks",
        "Daily check-ins",
        "Insights & analytics",
        "Weekly planning history",
        "Priority Email Support",
      ],
      buttonText: isPremium ? "Current Plan" : "Get Premium",
      buttonVariant: (isPremium ? "outline" : "default") as "outline" | "default",
      highlight: true,
      icon: Crown,
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

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
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
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  </div>
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
                  onClick={() => handleUpgrade()}
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

          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Compare Plans</h2>
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                    <th className="text-center py-4 px-6 font-semibold text-blue-600">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, i) => (
                    <tr key={i} className={`border-b border-gray-50 last:border-0 ${i % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="py-3.5 px-6 text-gray-700">{feature.label}</td>
                      <td className="py-3.5 px-6 text-center">
                        {typeof feature.free === 'boolean' ? (
                          feature.free ? (
                            <Check className="w-4 h-4 text-green-500 mx-auto" />
                          ) : (
                            <Minus className="w-4 h-4 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-600">{feature.free}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        {typeof feature.premium === 'boolean' ? (
                          feature.premium ? (
                            <Check className="w-4 h-4 text-blue-500 mx-auto" />
                          ) : (
                            <Minus className="w-4 h-4 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-blue-600 font-medium">{feature.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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