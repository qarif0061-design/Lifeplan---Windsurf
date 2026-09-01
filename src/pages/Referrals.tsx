import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Copy, Gift, Share2, Sparkles, Users } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { WEB_BASE_URL, REFERRAL_TIERS } from "@/constants/product";
import { checkAndGrantReferralRewards, getOrCreateReferral, subscribeReferral, type Referral } from "@/firebase/referrals";
import { trackReferralInviteCreated } from "@/utils/analytics";
import { showSuccess } from "@/utils/toast";

const Referrals = () => {
  const { user } = useUser();
  const { openAuthModal } = useAuthModal();
  const [referral, setReferral] = useState<Referral | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let unsub: (() => void) | undefined;
    let cancelled = false;

    checkAndGrantReferralRewards(user.id).catch((e) => {
      console.warn("[referrals] Failed to check/grant referral rewards:", e);
    });

    getOrCreateReferral(user.id).then((r) => {
      if (!cancelled) {
        setReferral(r);
        setLoading(false);
      }
    });

    subscribeReferral(user.id, (r) => {
      if (!cancelled && r) setReferral(r);
    }).then((u) => {
      unsub = u;
    });

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [user]);

  const referralLink = referral ? `${WEB_BASE_URL}/auth?ref=${referral.code}` : "";

  const handleCopy = async () => {
    if (!referralLink || !user) return;
    try {
      await navigator.clipboard.writeText(referralLink);
    } catch {
      return;
    }
    setCopied(true);
    showSuccess("Referral link copied!");
    trackReferralInviteCreated(user.id);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!referralLink || !user) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on Lifeplans",
          text: "Plan your goals and build better habits with Lifeplans. Sign up with my link:",
          url: referralLink,
        });
        trackReferralInviteCreated(user.id);
        return;
      } catch {
        // user cancelled the native share sheet — fall through silently
        return;
      }
    }
    handleCopy();
  };

  const totalSignups = referral?.totalSignups ?? 0;
  const premiumGranted = referral?.premiumGranted ?? 0;

  return (
    <Layout>
      <Seo
        title="Refer Friends & Earn Premium | Lifeplans"
        description="Invite friends to Lifeplans. Every signup earns you free Premium — refer 5 friends for 30 days Premium."
        canonicalPath="/referrals"
        noIndex
      />
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Gift className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">Refer & Earn</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Share your link — every friend who signs up earns you free Premium, and they get 7 days free too.
          </p>
        </div>

        {!user ? (
          <Card className="border-none shadow-sm rounded-[2rem] text-center">
            <CardContent className="py-10 space-y-4">
              <p className="text-muted-foreground">Sign in to get your personal referral link.</p>
              <Button className="rounded-full" onClick={() => openAuthModal({ intent: "signin" })}>
                Sign In
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="border-none shadow-sm rounded-[2rem]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Share2 className="w-5 h-5 text-primary" /> Your Referral Link
                </CardTitle>
                <CardDescription>Anyone who signs up through this link is credited to you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input value={loading ? "Loading…" : referralLink} readOnly className="rounded-xl text-sm" />
                  <Button variant="outline" className="shrink-0 rounded-xl" onClick={handleCopy} disabled={loading}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <Button onClick={handleShare} disabled={loading} className="w-full rounded-full">
                  <Share2 className="w-4 h-4 mr-2" /> Share Invite Link
                </Button>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <strong className="text-foreground">{totalSignups}</strong> signups
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Sparkles className="w-4 h-4" />
                    <strong className="text-foreground">{premiumGranted}</strong> rewards earned
                  </span>
                  {referral && (
                    <span className="text-muted-foreground">
                      Code: <Badge variant="secondary" className="rounded-full">{referral.code}</Badge>
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-lg">Reward Ladder</CardTitle>
                <CardDescription>Unlock bigger rewards as more friends join.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {REFERRAL_TIERS.map((tier) => {
                    const reached = totalSignups >= tier.referrals;
                    return (
                      <div
                        key={tier.reward}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                          reached ? "border-primary/20 bg-primary/10" : "border-border bg-secondary/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                              reached ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground/70 border border-border"
                            }`}
                          >
                            {reached ? <Check className="w-4 h-4" /> : tier.referrals}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{tier.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {tier.referrals} referral{tier.referrals > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <Badge variant={reached ? "default" : "secondary"} className="rounded-full">
                          {reached ? "Unlocked" : "Locked"}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Referrals;
