import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Dumbbell,
  GraduationCap,
  Wallet,
  Sparkles,
  Compass,
  Plus,
  X,
  Check,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { createGoal } from "@/firebase/goals";
import { trackGoalCreated } from "@/utils/analytics";
import type { GoalCheckpoint, Priority, Timeframe } from "@/types";

const EXAMPLES = [
  { label: "Launch my business", icon: Briefcase, category: "Business" },
  { label: "Get in shape", icon: Dumbbell, category: "Health & Fitness" },
  { label: "Learn to code", icon: GraduationCap, category: "Learning" },
  { label: "Save $10,000", icon: Wallet, category: "Finance" },
  { label: "Get a promotion", icon: Sparkles, category: "Career" },
  { label: "Read 24 books this year", icon: Compass, category: "Personal" },
];

const TIMEFRAMES: { label: string; timeframe: Timeframe; value: number }[] = [
  { label: "4 weeks", timeframe: "weeks", value: 4 },
  { label: "3 months", timeframe: "months", value: 3 },
  { label: "6 months", timeframe: "months", value: 6 },
  { label: "1 year", timeframe: "months", value: 12 },
];

const suggestCheckpoints = (goalName: string): string[] => {
  const trimmed = goalName.trim() || "your goal";
  return [
    `Get started on ${trimmed}`,
    "Reach the halfway point",
    `Finish: ${trimmed}`,
  ];
};

export const WIZARD_DRAFT_KEY = "lifeplans_wizard_draft";

export type WizardDraft = {
  name: string;
  category: string;
  timeframe: Timeframe;
  timeframeValue: number;
  checkpointTitles: string[];
};

const GoalWizard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { openAuthModal } = useAuthModal();

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>("Personal");
  const [timeframe, setTimeframe] = useState<Timeframe>("months");
  const [timeframeValue, setTimeframeValue] = useState(3);
  const [checkpoints, setCheckpoints] = useState<string[]>([]);
  const [newCheckpoint, setNewCheckpoint] = useState("");
  const [creating, setCreating] = useState(false);

  const goToStep2 = () => {
    if (checkpoints.length === 0) setCheckpoints(suggestCheckpoints(name));
    setStep(1);
  };

  const removeCheckpoint = (i: number) => setCheckpoints((c) => c.filter((_, idx) => idx !== i));
  const addCheckpoint = () => {
    const v = newCheckpoint.trim();
    if (!v || checkpoints.length >= 5) return;
    setCheckpoints((c) => [...c, v]);
    setNewCheckpoint("");
  };

  const buildDraft = (): WizardDraft => ({
    name: name.trim(),
    category,
    timeframe,
    timeframeValue,
    checkpointTitles: checkpoints,
  });

  const handleCreate = async () => {
    if (creating) return;
    const draft = buildDraft();
    if (!draft.name) return;

    const now = new Date().toISOString();
    const checkpointDocs: GoalCheckpoint[] = draft.checkpointTitles.map((title) => ({
      id: crypto.randomUUID(),
      title,
      kind: "boolean",
      completed: false,
      createdAt: now,
      updatedAt: now,
    }));

    if (!user) {
      sessionStorage.setItem(WIZARD_DRAFT_KEY, JSON.stringify(draft));
      openAuthModal({ intent: "signup" });
      return;
    }

    setCreating(true);
    try {
      const goalId = await createGoal({
        userId: user.id,
        name: draft.name,
        category: draft.category,
        priority: "medium" as Priority,
        timeframe: draft.timeframe,
        timeframeValue: draft.timeframeValue,
        checkpoints: checkpointDocs,
      });
      trackGoalCreated(user.id);
      navigate(`/goals/${goalId}`);
    } catch {
      setCreating(false);
    }
  };

  return (
    <div className="rounded-[2.5rem] border border-border bg-card shadow-sm overflow-hidden">
      {/* Step indicator */}
      <div className="flex items-center gap-2 px-6 sm:px-10 pt-8">
        {["Goal", "Timeline", "Checkpoints", "Review"].map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                i < step
                  ? "bg-momentum text-momentum-foreground"
                  : i === step
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={`text-xs font-semibold hidden sm:inline ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
              {label}
            </span>
            {i < 3 && <div className={`h-px flex-1 ${i < step ? "bg-momentum" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-10">
        {step === 0 && (
          <div className="animate-in fade-in duration-300">
            <h3 className="text-2xl font-display font-bold text-foreground">What do you want to achieve?</h3>
            <p className="text-muted-foreground mt-1.5 text-sm">Write it in your own words — one clear goal is enough to start.</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Launch my business"
              className="mt-6 h-14 rounded-2xl text-lg px-5"
              autoFocus
            />
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-6 mb-3">Or start from an example</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => {
                    setName(ex.label);
                    setCategory(ex.category);
                  }}
                  className="flex items-center gap-3 text-left rounded-2xl border border-border bg-secondary/40 hover:bg-secondary hover:border-primary/40 transition-colors px-4 py-3"
                >
                  <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <ex.icon className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{ex.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                onClick={goToStep2}
                disabled={!name.trim()}
                className="rounded-full bg-primary hover:bg-primary/90 px-6 h-12"
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-in fade-in duration-300">
            <h3 className="text-2xl font-display font-bold text-foreground">When do you want to achieve it?</h3>
            <p className="text-muted-foreground mt-1.5 text-sm">Pick a realistic timeline — you can always adjust it later.</p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {TIMEFRAMES.map((t) => {
                const active = timeframe === t.timeframe && timeframeValue === t.value;
                return (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => {
                      setTimeframe(t.timeframe);
                      setTimeframeValue(t.value);
                    }}
                    className={`rounded-2xl border px-5 py-6 text-center transition-colors ${
                      active
                        ? "border-primary bg-primary/10 text-primary font-bold"
                        : "border-border bg-secondary/40 text-foreground hover:border-primary/40"
                    }`}
                  >
                    <span className="text-xl font-display font-bold">{t.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(0)} className="rounded-full">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button onClick={() => setStep(2)} className="rounded-full bg-primary hover:bg-primary/90 px-6 h-12">
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in duration-300">
            <h3 className="text-2xl font-display font-bold text-foreground">Break it into checkpoints</h3>
            <p className="text-muted-foreground mt-1.5 text-sm">We started you off — edit these or add your own.</p>
            <div className="mt-6 space-y-2">
              {checkpoints.map((cp, i) => (
                <div key={i} className="flex items-center gap-2 rounded-2xl border border-border bg-secondary/40 px-4 py-2.5">
                  <span className="w-6 h-6 rounded-full bg-momentum/15 text-momentum flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <Input
                    value={cp}
                    onChange={(e) =>
                      setCheckpoints((all) => all.map((c, idx) => (idx === i ? e.target.value : c)))
                    }
                    className="border-none bg-transparent shadow-none h-8 px-0 focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => removeCheckpoint(i)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                    aria-label="Remove checkpoint"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {checkpoints.length < 5 && (
              <div className="flex items-center gap-2 mt-3">
                <Input
                  value={newCheckpoint}
                  onChange={(e) => setNewCheckpoint(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCheckpoint())}
                  placeholder="Add a checkpoint"
                  className="rounded-xl h-10"
                />
                <Button type="button" variant="outline" size="icon" onClick={addCheckpoint} className="rounded-xl h-10 w-10 shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(1)} className="rounded-full">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button onClick={() => setStep(3)} className="rounded-full bg-primary hover:bg-primary/90 px-6 h-12">
                Review <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in duration-300">
            <h3 className="text-2xl font-display font-bold text-foreground">Your goal, ready to go</h3>
            <p className="text-muted-foreground mt-1.5 text-sm">
              {user ? "Confirm and it's added to your goals." : "Create a free account to save it."}
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">{category}</p>
              <h4 className="mt-1 text-xl font-display font-bold text-foreground">{name}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {TIMEFRAMES.find((t) => t.timeframe === timeframe && t.value === timeframeValue)?.label ?? `${timeframeValue} ${timeframe}`}
              </p>
              <div className="mt-4 space-y-1.5">
                {checkpoints.map((cp, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground/85">
                    <span className="w-4 h-4 rounded-full border-2 border-momentum shrink-0" />
                    <span>{cp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(2)} className="rounded-full">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button
                onClick={handleCreate}
                disabled={creating}
                className="rounded-full bg-momentum hover:bg-momentum/90 text-momentum-foreground px-6 h-12 font-semibold"
              >
                {creating ? "Creating…" : user ? "Create my goal" : "Create my free goal"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalWizard;
