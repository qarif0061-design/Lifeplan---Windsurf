import { Button } from "@/components/ui/button";
import { Check, Minus, Sparkles } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import HelpDialog from "@/components/HelpDialog";
import Layout from "@/components/Layout";
import { FREE_GOAL_LIMIT, PRICING_TIERS, PREMIUM_FEATURES, type PricingTierId } from "@/constants/product";
import { showError } from "@/utils/toast";

// LemonSqueezy checkout links, one per paid tier. Website-specific (RevenueCat product
// IDs live in the mobile app instead) — not moved into constants/product.ts because
// that file is shared with mobile, which has no use for a LemonSqueezy URL.
// Annual and Lifetime aren't wired yet: create those two products/variants in the
// LemonSqueezy dashboard, then drop their checkout URLs in here.
const CHECKOUT_LINKS: Partial<Record<PricingTierId, string>> = {
  monthly: "https://goalplanner.lemonsqueezy.com/checkout/buy/1941520?enabled=1242156",
};

const Pricing = () => {
  const { isPremium, user } = useUser();
  const { openAuthModal } = useAuthModal();

  const buildCheckoutUrl = (base: string) => {
    if (!user) return base;
    const url = new URL(base);
    url.searchParams.set("checkout[custom][user_id]", user.id);
    return url.toString();
  };

  const handleUpgrade = (tierId: PricingTierId) => {
    if (!user) {
      openAuthModal({ intent: "signup" });
      return;
    }
    if (isPremium) return;
    const link = CHECKOUT_LINKS[tierId];
    if (!link) {
      showError("This plan isn't available on the website yet — try Monthly, or get it in the mobile app.");
      return;
    }
    window.location.assign(buildCheckoutUrl(link));
  };

  const comparisonFeatures = [
    { label: "Active Goals", free: String(FREE_GOAL_LIMIT), premium: "Unlimited" },
    { label: "Adaptive Goal Execution", free: false, premium: true },
    { label: "AI-Assisted Planning", free: false, premium: true },
    { label: "Weekly Planning", free: true, premium: true },
    { label: "Goal Strategy & Planning", free: "Limited", premium: "Full Access" },
    { label: "Daily Planner Tasks", free: "Up to 3 days", premium: "Unlimited" },
    { label: "Daily Check-ins", free: false, premium: true },
    { label: "Advanced Progress & Analytics", free: false, premium: true },
    { label: "Weekly Planning History", free: false, premium: true },
    { label: "Shareable Progress Stories", free: "Basic", premium: "Full" },
    { label: "Ad-Free Experience", free: false, premium: true },
    { label: "Priority Email Support", free: false, premium: true },
  ];

  return (
    <Layout>
      <div className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your ambition. Start for free and upgrade as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-stretch">
            {/* Free tier */}
            <div className="relative bg-card rounded-[2rem] p-7 border-2 border-transparent shadow-sm flex flex-col">
              <h3 className="text-xl font-display font-bold text-foreground mb-1">Free</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-extrabold text-foreground">$0</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Get started with basic goal tracking.
              </p>
              <ul className="space-y-3 mb-6 flex-1">
                {[
                  `Create up to ${FREE_GOAL_LIMIT} goals`,
                  "Basic weekly planning",
                  "Limited goal strategy & planning",
                  "Daily Planner (up to 3 days)",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <div className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-secondary text-muted-foreground">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-2xl h-11 font-bold" disabled>
                {isPremium ? "Downgrade" : "Current Plan"}
              </Button>
            </div>

            {/* Paid tiers, sourced from PRICING_TIERS */}
            {PRICING_TIERS.map((tier) => {
              const highlight = tier.id === "annual";
              return (
                <div
                  key={tier.id}
                  className={`relative bg-card rounded-[2rem] p-7 border-2 transition-all hover:shadow-xl flex flex-col ${
                    highlight ? "border-primary shadow-lg lg:scale-105 z-10" : "border-transparent shadow-sm"
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap">
                      <Sparkles className="w-3.5 h-3.5 fill-current" /> {tier.badge}
                    </div>
                  )}

                  <h3 className="text-xl font-display font-bold text-foreground mb-1">{tier.label}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-extrabold text-foreground">{tier.price}</span>
                    {!tier.isOneTime && <span className="text-muted-foreground font-medium text-sm">{tier.period}</span>}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {tier.isOneTime ? "One-time payment. No recurring charge, ever." : `Billed ${tier.period.replace("/", "")}.`}
                  </p>

                  <ul className="space-y-3 mb-6 flex-1">
                    {PREMIUM_FEATURES.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <div className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleUpgrade(tier.id)}
                    className={`w-full rounded-2xl h-11 font-bold ${!isPremium ? "bg-primary hover:bg-primary/90" : ""}`}
                    variant={isPremium ? "outline" : "default"}
                  >
                    {isPremium ? "Current Plan" : tier.isOneTime ? `Get Lifetime — ${tier.price}` : `Get ${tier.label}`}
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Compare Plans</h2>
            <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-6 font-semibold text-foreground">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-foreground">Free</th>
                    <th className="text-center py-4 px-6 font-semibold text-primary">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, i) => (
                    <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-secondary/40' : ''}`}>
                      <td className="py-3.5 px-6 text-foreground/80">{feature.label}</td>
                      <td className="py-3.5 px-6 text-center">
                        {typeof feature.free === 'boolean' ? (
                          feature.free ? (
                            <Check className="w-4 h-4 text-momentum mx-auto" />
                          ) : (
                            <Minus className="w-4 h-4 text-muted-foreground/70 mx-auto" />
                          )
                        ) : (
                          <span className="text-muted-foreground">{feature.free}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        {typeof feature.premium === 'boolean' ? (
                          feature.premium ? (
                            <Check className="w-4 h-4 text-primary mx-auto" />
                          ) : (
                            <Minus className="w-4 h-4 text-muted-foreground/70 mx-auto" />
                          )
                        ) : (
                          <span className="text-primary font-medium">{feature.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Lifetime is a one-time payment with no subscription — no renewal, no cancellation, ever.
            </p>
          </div>

          <div className="mt-20 bg-primary rounded-[3rem] p-12 text-primary-foreground text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-display font-bold mb-4">Still have questions?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                We're here to help you find the right plan for your goals. Contact our support team anytime.
              </p>
              <HelpDialog triggerVariant="secondary" triggerClassName="rounded-full px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90" />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
