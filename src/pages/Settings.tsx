import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { useUser } from "@/contexts/UserContext";
import { getOrCreateReferral, subscribeReferral } from "@/firebase/referrals";
import { subscribePendingInvites, subscribeActiveAccountabilities, removeAccountability } from "@/firebase/accountability";
import { Copy, Check, Users, Link as LinkIcon, UserCheck, UserX } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const SettingsPage = () => {
  const { user: authUser } = useUser();
  const uid = authUser?.uid;

  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [totalSignups, setTotalSignups] = useState(0);
  const [copied, setCopied] = useState(false);

  const [pendingInvites, setPendingInvites] = useState<Array<{ id: string; planTitle: string; inviterName: string }>>([]);
  const [activePartners, setActivePartners] = useState<Array<{ id: string; planTitle: string; partnerName: string }>>([]);

  useEffect(() => {
    if (!uid) return;
    const unsubs: Array<() => void> = [];

    getOrCreateReferral(uid).then((r) => {
      setReferralCode(r.code);
      const base = window.location.origin;
      setReferralLink(`${base}/signup?ref=${r.code}`);
      setTotalSignups(r.totalSignups);
    });

    subscribeReferral(uid, (r) => {
      if (r) {
        setReferralCode(r.code);
        setTotalSignups(r.totalSignups);
      }
    }).then((u) => unsubs.push(u));

    subscribePendingInvites(uid, (invites) => {
      setPendingInvites(invites.map((i) => ({ id: i.id, planTitle: i.planTitle, inviterName: i.inviterName })));
    }).then((u) => unsubs.push(u));

    subscribeActiveAccountabilities(uid, (accounts) => {
      setActivePartners(accounts.map((a) => ({ id: a.id, planTitle: a.planTitle, partnerName: a.partnerName })));
    }).then((u) => unsubs.push(u));

    return () => unsubs.forEach((u) => u());
  }, [uid]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      showSuccess("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleLeave = async (id: string) => {
    try {
      await removeAccountability(id);
      showSuccess("Removed accountability partner");
    } catch {}
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5" /> Referral Program
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              Share your referral link. For every friend who signs up, you get <strong>30 days premium</strong> and they get <strong>7 days free</strong>.
            </p>
            <div className="flex items-center gap-2">
              <Input value={referralLink} readOnly className="rounded-xl text-sm" />
              <Button variant="outline" className="shrink-0" onClick={copyLink}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <div className="flex gap-6 text-sm">
              <span className="text-slate-600">
                <strong className="text-slate-800">{totalSignups}</strong> signups
              </span>
              <span className="text-slate-600">
                Code: <Badge variant="secondary">{referralCode}</Badge>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" /> Accountability Partners
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingInvites.length === 0 && activePartners.length === 0 && (
              <p className="text-sm text-slate-500">No accountability partners yet. Open a plan and click Partner to invite someone.</p>
            )}
            {pendingInvites.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Pending Invites</h3>
                <div className="space-y-2">
                  {pendingInvites.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2">
                      <div>
                        <span className="text-sm font-medium">{inv.planTitle}</span>
                        <span className="text-xs text-slate-500 ml-2">from {inv.inviterName}</span>
                      </div>
                      <Badge variant="outline" className="text-amber-600">
                        <UserX className="w-3 h-3 mr-1" /> Pending
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activePartners.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Active Partners</h3>
                <div className="space-y-2">
                  {activePartners.map((p) => (
                    <div key={p.id} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2">
                      <div>
                        <span className="text-sm font-medium">{p.planTitle}</span>
                        <span className="text-xs text-slate-500 ml-2">with {p.partnerName}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-rose-500" onClick={() => handleLeave(p.id)}>
                        Leave
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
export default SettingsPage;
