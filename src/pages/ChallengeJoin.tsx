import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Loader2, Search, Target, Trophy, Users } from "lucide-react";
import Seo from "@/components/Seo";
import { useUser } from "@/contexts/UserContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import {
  CHALLENGE_PRESETS,
  type Challenge,
  getChallengeByInviteCode,
  getParticipant,
  joinChallenge,
} from "@/firebase/challenges";
import { trackChallengeJoined } from "@/utils/analytics";
import { showError, showSuccess } from "@/utils/toast";

const ChallengeJoin = () => {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const { openAuthModal } = useAuthModal();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!inviteCode) {
        setLoading(false);
        return;
      }
      try {
        const record = await getChallengeByInviteCode(inviteCode);
        if (cancelled) return;
        setChallenge(record);
        if (record && user) {
          const participant = await getParticipant(record.id, user.id);
          if (!cancelled) setAlreadyJoined(!!participant);
        }
      } catch {
        if (!cancelled) setChallenge(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [inviteCode, user]);

  const preset = challenge ? CHALLENGE_PRESETS.find((p) => p.category === challenge.category) : undefined;

  const handleJoin = async () => {
    if (!challenge || !user) return;
    setJoining(true);
    try {
      await joinChallenge(challenge.id, user.id, user.displayName || user.email);
      trackChallengeJoined(user.id, challenge.id);
      setAlreadyJoined(true);
      showSuccess(`Joined "${challenge.title}"!`);
      navigate("/challenges");
    } catch {
      showError("Failed to join challenge");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background flex flex-col">
      <Seo
        title={challenge ? `Join "${challenge.title}" | Lifeplans` : "Join a Challenge | Lifeplans"}
        description={
          challenge
            ? `${challenge.description || challenge.title} — a ${challenge.durationDays}-day challenge on Lifeplans.`
            : "Join a challenge on Lifeplans."
        }
        noIndex
      />

      <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
              <Target className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="text-xl font-bold text-foreground">Lifeplans</span>
          </Link>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-start sm:items-center justify-center px-4 py-10 sm:py-16">
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm">Loading challenge…</p>
          </div>
        ) : !challenge ? (
          <Card className="w-full max-w-md rounded-[2rem] border-border shadow-xl shadow-primary/10 text-center">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Search className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Challenge not found</h1>
              <p className="mt-2 text-muted-foreground">This invite link doesn't exist or the challenge has ended.</p>
              <Button asChild size="lg" className="mt-6 w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-semibold">
                <Link to="/">Explore Lifeplans</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="rounded-[2rem] border-border shadow-xl shadow-primary/10 overflow-hidden">
              <div className="h-2 w-full bg-primary" />
              <CardHeader className="items-center text-center pb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  <Trophy className="h-3.5 w-3.5" />
                  {preset?.label ?? "Challenge"}
                </span>
                <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words pt-2">
                  {preset?.icon} {challenge.title}
                </CardTitle>
                {challenge.description && (
                  <CardDescription className="text-base">{challenge.description}</CardDescription>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border bg-secondary/40 p-4 text-center">
                    <p className="text-2xl font-extrabold text-foreground">{challenge.durationDays}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Days</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-secondary/40 p-4 text-center">
                    <p className="text-2xl font-extrabold text-foreground flex items-center justify-center gap-1">
                      <Users className="h-5 w-5" /> {challenge.participantCount}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Joined</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex-col gap-3 pb-8">
                {!user ? (
                  <>
                    <Button
                      size="lg"
                      className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold shadow-lg shadow-primary/20"
                      onClick={() => openAuthModal({ intent: "signup" })}
                    >
                      Sign Up to Join
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-xs text-muted-foreground/70">Free to start · Web + mobile</p>
                  </>
                ) : alreadyJoined ? (
                  <Button asChild size="lg" className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold">
                    <Link to="/challenges">
                      You're In — View Challenges
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    disabled={joining}
                    onClick={handleJoin}
                    className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold shadow-lg shadow-primary/20"
                  >
                    {joining ? "Joining…" : "Join Challenge"}
                    {!joining && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-xs text-muted-foreground/70">
        Shared with <span className="font-semibold text-muted-foreground">Lifeplans</span> · goalplanner.io
      </footer>
    </div>
  );
};

export default ChallengeJoin;
