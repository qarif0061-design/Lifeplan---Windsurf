import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Copy, Plus, Trophy, UserPlus, Users } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { WEB_BASE_URL } from "@/constants/product";
import {
  CHALLENGE_PRESETS,
  type Challenge,
  type ChallengeParticipant,
  type ChallengePreset,
  createChallenge,
  getChallengesByIds,
  getDiscoverableChallenges,
  joinChallenge,
  subscribeParticipants,
  subscribeUserChallenges,
} from "@/firebase/challenges";
import { trackChallengeJoined } from "@/utils/analytics";
import { showError, showSuccess } from "@/utils/toast";

const todayIso = () => new Date().toISOString().slice(0, 10);

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const [participants, setParticipants] = useState<ChallengeParticipant[]>([]);
  const [copied, setCopied] = useState(false);
  const inviteLink = `${WEB_BASE_URL}/challenge/${challenge.inviteCode}`;

  useEffect(() => {
    const unsub = subscribeParticipants(challenge.id, setParticipants);
    return unsub;
  }, [challenge.id]);

  const preset = CHALLENGE_PRESETS.find((p) => p.category === challenge.category);

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      showSuccess("Invite link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <Card className="border-none shadow-sm rounded-[2rem]">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>{preset?.icon ?? "🏆"}</span> {challenge.title}
            </CardTitle>
            <CardDescription className="mt-1">{challenge.description}</CardDescription>
          </div>
          <Badge variant="secondary" className="rounded-full shrink-0">
            {challenge.durationDays}d
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input value={inviteLink} readOnly className="rounded-xl text-xs" />
          <Button variant="outline" size="icon" className="shrink-0 rounded-xl" onClick={copyInvite}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> {participants.length} participant{participants.length === 1 ? "" : "s"}
          </p>
          <div className="space-y-2">
            {participants
              .sort((a, b) => b.progress - a.progress)
              .map((p) => (
                <div key={p.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground/80">{p.displayName}</span>
                    <span className="text-muted-foreground">{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} className="h-1.5" />
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Challenges = () => {
  const { user } = useUser();
  const { openAuthModal } = useAuthModal();
  const [created, setCreated] = useState<Challenge[]>([]);
  const [joined, setJoined] = useState<Challenge[]>([]);
  const [loadingJoined, setLoadingJoined] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<ChallengePreset>(CHALLENGE_PRESETS[0]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationDays, setDurationDays] = useState(CHALLENGE_PRESETS[0].defaultDurationDays);
  const [creating, setCreating] = useState(false);

  const [discoverable, setDiscoverable] = useState<Challenge[]>([]);
  const [loadingDiscoverable, setLoadingDiscoverable] = useState(true);
  const [joiningId, setJoiningId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeUserChallenges(user.id, setCreated);
    return unsub;
  }, [user]);

  useEffect(() => {
    if (!user) {
      setLoadingJoined(false);
      return;
    }
    let cancelled = false;
    setLoadingJoined(true);
    getChallengesByIds(user.joinedChallengeIds ?? [])
      .then((challenges) => {
        if (!cancelled) setJoined(challenges);
      })
      .finally(() => {
        if (!cancelled) setLoadingJoined(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user, user?.joinedChallengeIds]);

  const joinedOnly = useMemo(
    () => joined.filter((c) => !created.some((k) => k.id === c.id)),
    [joined, created],
  );

  useEffect(() => {
    if (!user) {
      setLoadingDiscoverable(false);
      return;
    }
    let cancelled = false;
    setLoadingDiscoverable(true);
    getDiscoverableChallenges()
      .then((challenges) => {
        if (!cancelled) setDiscoverable(challenges);
      })
      .finally(() => {
        if (!cancelled) setLoadingDiscoverable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const knownIds = useMemo(
    () => new Set([...created.map((c) => c.id), ...joined.map((c) => c.id)]),
    [created, joined],
  );
  const toDiscover = useMemo(
    () => discoverable.filter((c) => !knownIds.has(c.id)),
    [discoverable, knownIds],
  );

  const handleJoinFromDiscover = async (challenge: Challenge) => {
    if (!user) return;
    setJoiningId(challenge.id);
    try {
      await joinChallenge(challenge.id, user.id, user.displayName || user.email);
      trackChallengeJoined(user.id, challenge.id);
      showSuccess(`Joined "${challenge.title}"!`);
      setJoined((prev) => [...prev, challenge]);
      setDiscoverable((prev) => prev.filter((c) => c.id !== challenge.id));
    } catch {
      showError("Failed to join challenge");
    } finally {
      setJoiningId(null);
    }
  };

  const handlePresetChange = (preset: ChallengePreset) => {
    setSelectedPreset(preset);
    setDurationDays(preset.defaultDurationDays);
    if (!title) setTitle(preset.label);
  };

  const handleCreate = async () => {
    if (!user || !title.trim()) {
      showError("Give your challenge a title");
      return;
    }
    setCreating(true);
    try {
      await createChallenge(
        user.id,
        user.displayName || user.email,
        title.trim(),
        description.trim(),
        selectedPreset.category,
        durationDays,
        todayIso(),
      );
      showSuccess("Challenge created!");
      setOpen(false);
      setTitle("");
      setDescription("");
      setSelectedPreset(CHALLENGE_PRESETS[0]);
      setDurationDays(CHALLENGE_PRESETS[0].defaultDurationDays);
    } catch {
      showError("Failed to create challenge");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Layout>
      <Seo
        title="Challenges | Lifeplans"
        description="Create or join a challenge and track progress together with friends."
        canonicalPath="/challenges"
        noIndex
      />
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Trophy className="w-7 h-7 text-primary" /> Challenges
            </h1>
            <p className="text-muted-foreground">Create or join a challenge and track progress together.</p>
          </div>

          {user && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full">
                  <Plus className="w-4 h-4 mr-2" /> New Challenge
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl">
                <DialogHeader>
                  <DialogTitle>Create a Challenge</DialogTitle>
                  <DialogDescription>Pick a type, name it, and share the invite link.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {CHALLENGE_PRESETS.map((preset) => (
                      <button
                        key={preset.category}
                        type="button"
                        onClick={() => handlePresetChange(preset)}
                        className={`rounded-2xl border p-3 text-center text-xs font-medium transition ${
                          selectedPreset.category === preset.category
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-muted-foreground/40"
                        }`}
                      >
                        <div className="text-xl mb-1">{preset.icon}</div>
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={selectedPreset.label}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={selectedPreset.description}
                      className="rounded-xl"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (days)</Label>
                    <Input
                      type="number"
                      min={1}
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value) || 1)}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreate} disabled={creating} className="w-full rounded-full">
                    {creating ? "Creating…" : "Create Challenge"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {!user ? (
          <Card className="border-none shadow-sm rounded-[2rem] text-center">
            <CardContent className="py-10 space-y-4">
              <p className="text-muted-foreground">Sign in to create or join a challenge.</p>
              <Button className="rounded-full" onClick={() => openAuthModal({ intent: "signin" })}>
                Sign In
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Your Challenges
              </h2>
              {created.length === 0 ? (
                <p className="text-sm text-muted-foreground">You haven't created a challenge yet.</p>
              ) : (
                <div className="space-y-4">
                  {created.map((c) => (
                    <ChallengeCard key={c.id} challenge={c} />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Joined Challenges
              </h2>
              {loadingJoined ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : joinedOnly.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  You haven't joined a challenge yet. Ask a friend for their invite link.
                </p>
              ) : (
                <div className="space-y-4">
                  {joinedOnly.map((c) => (
                    <ChallengeCard key={c.id} challenge={c} />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Discover Challenges
              </h2>
              {loadingDiscoverable ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : toDiscover.length === 0 ? (
                <p className="text-sm text-muted-foreground">No open challenges to discover right now.</p>
              ) : (
                <div className="space-y-2">
                  {toDiscover.map((c) => {
                    const preset = CHALLENGE_PRESETS.find((p) => p.category === c.category);
                    return (
                      <div
                        key={c.id}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/40 px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {preset?.icon} {c.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {c.durationDays} days · {c.participantCount} joined
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full shrink-0"
                          disabled={joiningId === c.id}
                          onClick={() => handleJoinFromDiscover(c)}
                        >
                          <UserPlus className="w-3.5 h-3.5 mr-1" />
                          {joiningId === c.id ? "Joining…" : "Join"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Challenges;
