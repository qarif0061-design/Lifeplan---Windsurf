import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Mail, Users, UserCheck, UserX, X } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import {
  type Accountability,
  acceptInvite,
  createInvite,
  declineInvite,
  getAccountabilities,
  removeAccountability,
  subscribePendingInvites,
  subscribeSentInvites,
  updateAccountabilityProgress,
} from "@/firebase/accountability";
import { type CustomPlanner, subscribeCustomPlanners } from "@/firebase/customPlanner";
import { trackAccountabilityInviteSent } from "@/utils/analytics";
import { showError, showSuccess } from "@/utils/toast";

const computeProgress = (planner: CustomPlanner): number => {
  const tasks = planner.days.flatMap((d) => d.tasks);
  if (tasks.length === 0) return 0;
  const completed = tasks.filter((t) => t.completed).length;
  return Math.round((completed / tasks.length) * 100);
};

const AccountabilityPage = () => {
  const { user } = useUser();
  const uid = user?.id;
  const { openAuthModal } = useAuthModal();

  const [myPlanners, setMyPlanners] = useState<CustomPlanner[]>([]);
  const [selectedPlannerId, setSelectedPlannerId] = useState<string>("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [inviting, setInviting] = useState(false);

  const [receivedInvites, setReceivedInvites] = useState<Accountability[]>([]);
  const [sentInvites, setSentInvites] = useState<Accountability[]>([]);
  const [active, setActive] = useState<Accountability[]>([]);
  const [loadingActive, setLoadingActive] = useState(true);

  // My own custom planners — used to (a) pick what to invite a partner into,
  // and (b) self-report progress on partnerships where I'm the inviter.
  useEffect(() => {
    if (!uid) return;
    const unsub = subscribeCustomPlanners(uid, setMyPlanners);
    return unsub;
  }, [uid]);

  useEffect(() => {
    if (!user?.email) return;
    let unsub: (() => void) | undefined;
    let cancelled = false;
    subscribePendingInvites(user.email, (invites) => {
      if (!cancelled) setReceivedInvites(invites);
    }).then((u) => {
      unsub = u;
    });
    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [user?.email]);

  useEffect(() => {
    if (!uid) return;
    let unsub: (() => void) | undefined;
    let cancelled = false;
    subscribeSentInvites(uid, (invites) => {
      if (!cancelled) setSentInvites(invites);
    }).then((u) => {
      unsub = u;
    });
    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [uid]);

  const loadActive = async () => {
    if (!uid) return;
    setLoadingActive(true);
    try {
      const accounts = await getAccountabilities(uid);
      setActive(accounts);
    } finally {
      setLoadingActive(false);
    }
  };

  useEffect(() => {
    loadActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  // Keep progress on my own active partnerships in sync with my planner's real completion.
  useEffect(() => {
    if (!uid || myPlanners.length === 0 || active.length === 0) return;
    active.forEach((a) => {
      if (a.inviterId !== uid) return;
      const planner = myPlanners.find((p) => p.id === a.plannerId);
      if (!planner) return;
      const current = computeProgress(planner);
      if (current !== a.progressPercent) {
        updateAccountabilityProgress(a.id, current).then(() => {
          setActive((prev) =>
            prev.map((p) => (p.id === a.id ? { ...p, progressPercent: current } : p))
          );
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myPlanners, active, uid]);

  const selectedPlanner = useMemo(
    () => myPlanners.find((p) => p.id === selectedPlannerId),
    [myPlanners, selectedPlannerId]
  );

  const handleInvite = async () => {
    if (!user || !selectedPlanner || !partnerEmail.trim()) {
      showError("Pick a plan and enter your partner's email");
      return;
    }
    setInviting(true);
    try {
      await createInvite(
        selectedPlanner.id,
        "custom",
        selectedPlanner.title,
        user.id,
        user.displayName || user.email,
        partnerEmail.trim().toLowerCase()
      );
      trackAccountabilityInviteSent(user.id);
      showSuccess("Invite sent!");
      setPartnerEmail("");
      setSelectedPlannerId("");
    } catch {
      showError("Failed to send invite");
    } finally {
      setInviting(false);
    }
  };

  const handleAccept = async (invite: Accountability) => {
    if (!user) return;
    try {
      await acceptInvite(invite.id, user.id, user.displayName || user.email);
      showSuccess(`Joined "${invite.plannerTitle}"`);
      loadActive();
    } catch {
      showError("Failed to accept invite");
    }
  };

  const handleDecline = async (invite: Accountability) => {
    try {
      await declineInvite(invite.id);
      showSuccess("Invite declined");
    } catch {
      showError("Failed to decline invite");
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      await removeAccountability(id);
      showSuccess("Partnership removed");
      setActive((prev) => prev.filter((a) => a.id !== id));
      setSentInvites((prev) => prev.filter((a) => a.id !== id));
    } catch {
      showError("Failed to remove");
    }
  };

  return (
    <Layout>
      <Seo
        title="Accountability Partners | Lifeplans"
        description="Invite a friend to keep you accountable. Share progress on a plan without exposing private notes."
        canonicalPath="/accountability"
        noIndex
      />
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Accountability Partners</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Invite someone to follow your progress on a plan. They'll only see the plan's title and completion percentage — never your notes.
          </p>
        </div>

        {!user ? (
          <Card className="border-none shadow-sm rounded-[2rem] text-center">
            <CardContent className="py-10 space-y-4">
              <p className="text-muted-foreground">Sign in to invite an accountability partner.</p>
              <Button className="rounded-full" onClick={() => openAuthModal({ intent: "signin" })}>
                Sign In
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="border-none shadow-sm rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-lg">Invite a Partner</CardTitle>
                <CardDescription>Pick one of your custom plans and enter your partner's email.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {myPlanners.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    You need a custom plan first.{" "}
                    <Link to="/custom-planner" className="text-primary underline">
                      Create one
                    </Link>
                    .
                  </p>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Plan</Label>
                      <Select value={selectedPlannerId} onValueChange={setSelectedPlannerId}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Choose a plan to share" />
                        </SelectTrigger>
                        <SelectContent>
                          {myPlanners.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Partner's email</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground/70 shrink-0" />
                        <Input
                          type="email"
                          placeholder="friend@example.com"
                          value={partnerEmail}
                          onChange={(e) => setPartnerEmail(e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <Button onClick={handleInvite} disabled={inviting} className="w-full rounded-full">
                      {inviting ? "Sending…" : "Send Invite"}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {receivedInvites.length > 0 && (
              <Card className="border-none shadow-sm rounded-[2rem]">
                <CardHeader>
                  <CardTitle className="text-lg">Invites for You</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {receivedInvites.map((inv) => (
                    <div
                      key={inv.id}
                      className="flex items-center justify-between bg-ember/10 border border-ember/20 rounded-2xl px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-foreground">{inv.plannerTitle}</p>
                        <p className="text-xs text-muted-foreground">from {inv.inviterName}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="rounded-full" onClick={() => handleAccept(inv)}>
                          <UserCheck className="w-3.5 h-3.5 mr-1" /> Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                          onClick={() => handleDecline(inv)}
                        >
                          <UserX className="w-3.5 h-3.5 mr-1" /> Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {sentInvites.length > 0 && (
              <Card className="border-none shadow-sm rounded-[2rem]">
                <CardHeader>
                  <CardTitle className="text-lg">Sent Invites</CardTitle>
                  <CardDescription>Waiting for a response.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sentInvites.map((inv) => (
                    <div
                      key={inv.id}
                      className="flex items-center justify-between bg-secondary/40 rounded-2xl px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-foreground">{inv.plannerTitle}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> to {inv.partnerEmail}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-full text-rose-500"
                        onClick={() => handleRevoke(inv.id)}
                      >
                        <X className="w-3.5 h-3.5 mr-1" /> Cancel
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card className="border-none shadow-sm rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-lg">Active Partnerships</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {loadingActive ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : active.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No active partnerships yet.</p>
                ) : (
                  active.map((a) => {
                    const partnerLabel = a.inviterId === uid ? a.partnerName || a.partnerEmail : a.inviterName;
                    const pct = a.progressPercent ?? 0;
                    return (
                      <div key={a.id} className="rounded-2xl border border-border bg-secondary/40 px-4 py-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{a.plannerTitle}</p>
                            <p className="text-xs text-muted-foreground">with {partnerLabel}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="rounded-full">{pct}%</Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-rose-500"
                              onClick={() => handleRevoke(a.id)}
                            >
                              Revoke
                            </Button>
                          </div>
                        </div>
                        <Progress value={pct} className="h-2" />
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AccountabilityPage;
