import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Copy,
  Flame,
  Loader2,
  Search,
  Target,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Seo from "@/components/Seo";
import { WEB_BASE_URL } from "@/constants/product";
import { useUser } from "@/contexts/UserContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import {
  getShareByPublicId,
  type ShareData,
  type ShareRecord,
} from "@/firebase/shares";
import { cloneGoalFromShareData } from "@/firebase/goals";
import { trackCopyPlanClicked, trackShareLinkOpened } from "@/utils/analytics";
import { showError, showSuccess } from "@/utils/toast";

const SITE_URL = WEB_BASE_URL;

const TYPE_META: Record<string, { label: string; icon: typeof Target }> = {
  goal: { label: "Goal Progress", icon: Target },
  daily: { label: "Daily Check-In", icon: CalendarCheck },
  weekly: { label: "Weekly Review", icon: CalendarDays },
  month: { label: "Monthly Review", icon: CalendarDays },
  year: { label: "Yearly Review", icon: CalendarDays },
  streak: { label: "Streak", icon: Flame },
  achievement: { label: "Achievement", icon: Trophy },
};

interface Metric {
  label: string;
  value: string;
}

const buildMetrics = (type: string, data: ShareData): Metric[] => {
  const metrics: Metric[] = [];
  const add = (label: string, value?: number | string) => {
    if (value === undefined || value === null || value === "") return;
    metrics.push({ label, value: String(value) });
  };

  if (type === "goal") {
    add("Total Actions", data.totalActions);
    add("Completed", data.completedActions);
    add("Remaining", data.remainingActions);
  } else if (type === "daily") {
    add("Priorities Done", data.prioritiesCompleted);
    add("Priorities Total", data.prioritiesTotal);
    add("Date", data.date);
  } else if (type === "weekly") {
    add("Tasks Completed", data.tasksCompleted);
    add("Tasks Total", data.tasksTotal);
    add("Goals Progressed", data.goalsProgressed);
    add("Day Streak", data.streak);
  } else if (type === "month" || type === "year") {
    add("Goals Created", data.goalsCreated);
    add("Goals Completed", data.goalsCompleted);
    add("Productive Days", data.productiveDays);
    if (data.avgExecution !== undefined && data.avgExecution !== null) {
      add("Avg Execution", `${data.avgExecution}%`);
    }
  } else if (type === "streak") {
    const streakValue = data.currentStreak ?? data.streak;
    add("Current Streak", streakValue !== undefined ? `${streakValue}` : undefined);
  }

  return metrics;
};

const ProgressShare = () => {
  const { publicId } = useParams<{ publicId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const { openAuthModal } = useAuthModal();
  const [share, setShare] = useState<ShareRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);
  const firedShareOpenRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!publicId) {
        setLoading(false);
        return;
      }
      try {
        const record = await getShareByPublicId(publicId);
        if (!cancelled) setShare(record);
      } catch {
        if (!cancelled) setShare(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [publicId]);

  useEffect(() => {
    if (share && user && !firedShareOpenRef.current) {
      firedShareOpenRef.current = true;
      trackShareLinkOpened(user.id, share.publicId);
    }
  }, [share, user]);

  const type = share ? String(share.type) : "";
  const meta = TYPE_META[type] ?? TYPE_META.goal;
  const TypeIcon = meta.icon;
  const data = share?.data ?? {};
  const metrics = share ? buildMetrics(type, data) : [];

  const progress =
    type === "daily"
      ? data.completionPercent
      : type === "goal"
        ? data.goalProgress
        : undefined;
  const progressLabel = type === "daily" ? "Day completion" : "Goal progress";

  const handleCopyGoal = async () => {
    if (!share) return;
    if (user) trackCopyPlanClicked(user.id, share.publicId);

    if (!user) {
      openAuthModal({ intent: "signup" });
      return;
    }

    setCopying(true);
    try {
      const newGoalId = await cloneGoalFromShareData(
        user.id,
        data.goalName ?? share.title,
        data.goalCategory,
        data.goalCheckpoints,
      );
      showSuccess("Goal copied to your account!");
      navigate(`/goals/${newGoalId}`);
    } catch {
      showError("Failed to copy this goal. Please try again.");
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background flex flex-col">
      <Seo
        title={share ? `${share.title} | Lifeplans` : "Shared Progress | Lifeplans"}
        description={
          share
            ? `${share.title}${share.subtitle ? ` — ${share.subtitle}` : ""}. Shared with Lifeplans.`
            : "View shared progress made with Lifeplans."
        }
        imageUrl={publicId ? `${SITE_URL}/api/og-image?publicId=${encodeURIComponent(publicId)}` : undefined}
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
            <p className="text-sm">Loading shared progress…</p>
          </div>
        ) : !share ? (
          <Card className="w-full max-w-md rounded-[2rem] border-border shadow-xl shadow-primary/10 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Search className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Link not found</h1>
              <p className="mt-2 text-muted-foreground">
                This share link doesn't exist or has been revoked by its owner.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-semibold"
              >
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
                  <TypeIcon className="h-3.5 w-3.5" />
                  {meta.label}
                </span>
                <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words pt-2">
                  {share.title}
                </CardTitle>
                {share.subtitle && (
                  <CardDescription className="text-base">{share.subtitle}</CardDescription>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                {data.goalName && (
                  <div className="rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">Goal</p>
                    <p className="mt-1 font-semibold text-foreground break-words">{data.goalName}</p>
                  </div>
                )}

                {(type === "month" && data.monthLabel) ||
                (type === "year" && data.yearLabel) ||
                (type === "weekly" && data.weekLabel) ? (
                  <p className="text-center text-sm font-medium text-muted-foreground">
                    {data.monthLabel ?? data.yearLabel ?? data.weekLabel}
                  </p>
                ) : null}

                {progress !== undefined && progress !== null && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">{progressLabel}</span>
                      <span className="text-sm font-bold text-primary">{progress}%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.min(100, Math.max(0, Number(progress)))}%` }}
                      />
                    </div>
                  </div>
                )}

                {type === "achievement" && (
                  <div className="rounded-2xl border border-ember/20 bg-ember/10 p-6 text-center">
                    <div className="mb-2 text-5xl leading-none">{data.achievementIcon ?? "🏆"}</div>
                    <p className="text-lg font-bold text-foreground">
                      {data.achievementTitle ?? share.title}
                    </p>
                    {data.achievementDescription && (
                      <p className="mt-1 text-sm text-muted-foreground">{data.achievementDescription}</p>
                    )}
                  </div>
                )}

                {metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-border bg-secondary/40 p-4 text-center"
                      >
                        <p className="text-2xl font-extrabold text-foreground">{metric.value}</p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {type === "weekly" && data.topAchievement && (
                  <div className="rounded-2xl border border-momentum/20 bg-momentum/10 px-4 py-3 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-momentum">
                      Top Achievement
                    </p>
                    <p className="mt-1 font-semibold text-foreground">{data.topAchievement}</p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex-col gap-3 pb-8">
                {type === "goal" && (
                  <Button
                    size="lg"
                    variant="outline"
                    disabled={copying}
                    onClick={handleCopyGoal}
                    className="w-full rounded-full h-12 text-base font-semibold border-primary/30 text-primary hover:bg-primary/10"
                  >
                    {copying ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {copying ? "Copying goal…" : "Copy this goal"}
                  </Button>
                )}
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold shadow-lg shadow-primary/20"
                >
                  <Link to="/">
                    Track Your Goals on Lifeplans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground/70">Free to start · Web + mobile</p>
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

export default ProgressShare;
