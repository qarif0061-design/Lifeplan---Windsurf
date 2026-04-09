import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/contexts/UserContext";
import { createGoal, deleteGoal, getGoalById, updateGoal } from "@/firebase/goals";
import { updateFeaturedGoalId } from "@/firebase/users";
import type { Goal, GoalCheckpoint, GoalTodo, Priority } from "@/types";
import { showError, showSuccess } from "@/utils/toast";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    ChevronLeft,
    Copy,
    Crown,
    Edit3,
    FileText,
    GripVertical,
    Lock,
    Plus,
    Star,
    Target,
    Trash2,
    TrendingUp,
    Trophy
} from "lucide-react";
import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { CSS, type Transform } from "@dnd-kit/utilities";

const newId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const SortableItem = ({
  id,
  children,
}: {
  id: string;
  children: (props: {
    setNodeRef: (node: HTMLElement | null) => void;
    listeners: any;
    attributes: any;
    transform: Transform | null;
    transition: string | undefined;
    isDragging: boolean;
  }) => ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <>
      {children({
        setNodeRef,
        listeners,
        attributes,
        transform,
        transition,
        isDragging,
      })}
    </>
  );
};

const getProgressIndicatorClass = (pct: number): string => {
  if (pct >= 100) return "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:via-emerald-400 [&>div]:to-lime-400";
  if (pct < 20) return "[&>div]:bg-gradient-to-r [&>div]:from-rose-600 [&>div]:via-rose-500 [&>div]:to-amber-500";
  if (pct < 50) return "[&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:via-orange-500 [&>div]:to-yellow-400";
  if (pct < 80) return "[&>div]:bg-gradient-to-r [&>div]:from-sky-500 [&>div]:via-blue-600 [&>div]:to-indigo-500";
  return "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:via-teal-500 [&>div]:to-sky-500";
};

const getProgressStroke = (pct: number): { from: string; to: string } => {
  if (pct >= 100) return { from: "#22c55e", to: "#a3e635" };
  if (pct < 20) return { from: "#e11d48", to: "#f59e0b" };
  if (pct < 50) return { from: "#f59e0b", to: "#fde047" };
  if (pct < 80) return { from: "#0ea5e9", to: "#4f46e5" };
  return { from: "#22c55e", to: "#0ea5e9" };
};

const getDaysPassedText = (g: Goal): string => {
  const startValue = (g as unknown as { startDate?: unknown }).startDate;
  const start = typeof startValue === "string" ? startValue.trim() : "";
  if (!start) return "No date set";
  const parsedStart = new Date(start);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  parsedStart.setHours(0, 0, 0, 0);
  const diffMs = today.getTime() - parsedStart.getTime();
  const daysPassed = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  return `${daysPassed} day${daysPassed === 1 ? "" : "s"} passed`;
};

const getRemainingDaysText = (g: Goal): string => {
  const endValue = (g as unknown as { endDate?: unknown }).endDate;
  const end = typeof endValue === "string" ? endValue.trim() : "";
  if (!end) return "No date set";
  const parsedEnd = new Date(end);
  const endAt = Number.isNaN(parsedEnd.getTime())
    ? new Date(`${end}T23:59:59.999`).getTime()
    : parsedEnd.getTime();
  if (Number.isNaN(endAt)) return "No date set";
  const now = Date.now();
  const diffMs = endAt - now;
  const days = Math.ceil(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
  if (diffMs < 0) return `Overdue ${days}d`;
  return `${days}d left`;
};

const getRemainingDaysBadgeClass = (g: Goal, pct: number): string => {
  if (!g.endDate) return "bg-slate-100 text-slate-700";
  if (pct >= 100) return "bg-emerald-100 text-emerald-700";
  if (pct < 20) return "bg-rose-100 text-rose-700";
  if (pct < 50) return "bg-amber-100 text-amber-800";
  return "bg-blue-100 text-blue-700";
};

const normalizeCheckpointList = (
  input: unknown,
  newId: () => string,
  nowIso: string,
): GoalCheckpoint[] => {
  const arr = Array.isArray(input) ? input : [];
  return arr
    .map((raw) => {
      const c = raw as Record<string, unknown>;

      const id = typeof c.id === "string" && c.id.trim() ? c.id.trim() : newId();
      const title = typeof c.title === "string" ? c.title.trim() : "";

      const createdAt = typeof c.createdAt === "string" && c.createdAt ? c.createdAt : nowIso;
      const updatedAt = nowIso;

      const kindFromField = typeof c.kind === "string" ? c.kind : undefined;
      const currentRaw = typeof c.current === "number" ? c.current : Number(c.current);
      const targetRaw = typeof c.target === "number" ? c.target : Number(c.target);
      const hasNumberShape = Number.isFinite(currentRaw) || Number.isFinite(targetRaw);

      const kind: "boolean" | "number" =
        kindFromField === "number" || (kindFromField !== "boolean" && hasNumberShape) ? "number" : "boolean";

      const completedRaw = c.completed;
      const completedBool = Boolean(completedRaw);

      if (kind === "number") {
        const target = Math.max(1, Math.trunc(Number.isFinite(targetRaw) ? targetRaw : 1));
        const current = Math.max(0, Math.trunc(Number.isFinite(currentRaw) ? currentRaw : 0));
        const clampedCurrent = Math.min(current, target);
        return {
          id,
          title,
          kind,
          target,
          current: clampedCurrent,
          completed: clampedCurrent >= target,
          createdAt,
          updatedAt,
        };
      }

      return {
        id,
        title,
        kind,
        completed: completedBool,
        createdAt,
        updatedAt,
      };
    })
    .filter((c) => c.title.trim().length > 0);
};

const getDerivedProgress = (g: Goal, checkpoints?: GoalCheckpoint[]): number => {
  const cps = checkpoints ?? g.checkpoints ?? [];
  if (cps.length > 0) {
    const per = cps.map((c) => {
      if (c.kind === "number") {
        const target = Math.max(0, c.target ?? 0);
        const current = Math.max(0, c.current ?? 0);
        if (target <= 0) return 0;
        return Math.min(1, current / target);
      }
      return c.completed ? 1 : 0;
    });
    const avg = per.reduce((s, v) => s + v, 0) / cps.length;
    return Math.round(avg * 100);
  }
  return g.progress ?? 0;
};

const CircularProgress = ({ value, size = 64 }: { value: number; size?: number }) => {
  const gradId = useId();
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, value));
  const dash = (pct / 100) * circumference;
  const strokeColors = getProgressStroke(pct);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={strokeColors.from} />
            <stop offset="100%" stopColor={strokeColors.to} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className="text-gray-100"
          stroke="currentColor"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          stroke={`url(#${gradId})`}
          fill="transparent"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-gray-900">
        {pct}%
      </div>
    </div>
  );
};

const GoalDetails = () => {
  const { isPremium, user } = useUser();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTarget, setEditTarget] = useState<"strategy" | "planning" | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingStrategy, setIsSavingStrategy] = useState(false);
  const [isSavingPlanning, setIsSavingPlanning] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checkpoints, setCheckpoints] = useState<GoalCheckpoint[]>([]);
  const [newCheckpointTitle, setNewCheckpointTitle] = useState("");
  const [todos, setTodos] = useState<GoalTodo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [notes, setNotes] = useState<GoalNote[]>([]);
  const [newNoteContent, setNewNoteContent] = useState("");

  const isFeatured = Boolean(user?.featuredGoalId && goal?.id && user.featuredGoalId === goal.id);

  const handleToggleFavorite = async () => {
    if (!goal) return;
    setIsSaving(true);
    try {
      const next = !goal.isFavorite;
      await updateGoal(goal.id, { isFavorite: next });
      setGoal((prev) => (prev ? { ...prev, isFavorite: next } : prev));
      showSuccess(next ? "Added to favorites" : "Removed from favorites");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update favorite";
      showError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetFeatured = async () => {
    if (!user || !goal) return;
    setIsSaving(true);
    try {
      const nextId = isFeatured ? undefined : goal.id;
      await updateFeaturedGoalId(user.id, nextId);
      showSuccess(isFeatured ? "Featured goal cleared" : "Goal set as featured");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update featured goal";
      showError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const [strategyWhy, setStrategyWhy] = useState("");
  const [strategyWho, setStrategyWho] = useState("");
  const [strategyNo, setStrategyNo] = useState("");

  const [planningObstacles, setPlanningObstacles] = useState("");
  const [planningNextActions, setPlanningNextActions] = useState("");
  const [planningAiPreview, setPlanningAiPreview] = useState("");

  useEffect(() => {
    const goalId = id ?? "";
    if (!goalId) {
      setGoal(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    getGoalById(goalId)
      .then((g) => {
        setGoal(g);
        if (g) {
          const nowIso = new Date().toISOString();
          setName(g.name);
          setCategory(g.category);
          setDescription(g.description ?? "");
          setPriority(g.priority);
          setStartDate(g.startDate ?? "");
          setEndDate(g.endDate ?? "");
          setCheckpoints(normalizeCheckpointList(g.checkpoints, newId, nowIso));

          setStrategyWhy(g.strategy?.whyMatters ?? "");
          setStrategyWho(g.strategy?.whoBenefits ?? "");
          setStrategyNo(g.strategy?.sayNoTo ?? "");

          setPlanningObstacles(g.planning?.obstacles ?? "");
          setPlanningNextActions(g.planning?.nextActions ?? "");
          setPlanningAiPreview(g.planning?.aiPreview ?? "");

          // Load todos
          setTodos(g.todos || []);
          // Load notes
          setNotes(g.notes || []);
        }
      })
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : "Failed to load goal";
        showError(message);
        setGoal(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const state = location.state as { openEdit?: boolean } | null;
    if (state?.openEdit) {
      setEditMode(true);
      setEditTarget(null);
      setIsEditOpen(true);
    }
  }, [location.state]);

  const derivedProgress = useMemo(() => {
    if (!goal) return 0;
    return getDerivedProgress(goal, checkpoints);
  }, [goal, checkpoints]);

  const derivedCheckpointStats = useMemo(() => {
    const total = checkpoints.length;
    const done = checkpoints.filter((c) => {
      if (c.kind === "number") {
        const target = Math.max(0, c.target ?? 0);
        const current = Math.max(0, c.current ?? 0);
        return target > 0 && current >= target;
      }
      return c.completed;
    }).length;
    return { total, done };
  }, [checkpoints]);

  const handleSave = async () => {
    if (!goal) return;
    if (!name.trim() || !category.trim()) {
      showError("Please enter a goal name and category.");
      return;
    }

    setIsSaving(true);
    try {
      const nowIso = new Date().toISOString();
      const sanitizedCheckpoints = normalizeCheckpointList(checkpoints, newId, nowIso);
      const computedProgress = sanitizedCheckpoints.length ? getDerivedProgress(goal, sanitizedCheckpoints) : (goal.progress ?? 0);
      const computedStatus =
        sanitizedCheckpoints.length > 0 && computedProgress === 100 ? "completed" : "active";
      await updateGoal(goal.id, {
        name: name.trim(),
        category: category.trim(),
        description: description.trim() ? description.trim() : undefined,
        priority,
        startDate: startDate.trim() ? startDate.trim() : undefined,
        endDate: endDate.trim() ? endDate.trim() : undefined,
        checkpoints: sanitizedCheckpoints,
        notes: notes.map((n, idx) => ({
          ...n,
          id: n.id || `note_${Date.now()}_${idx}`,
          createdAt: n.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })),
        progress: computedProgress,
        status: computedStatus,
      });
      const refreshed = await getGoalById(goal.id);
      setGoal(refreshed);
      showSuccess("Goal updated!");
      setIsEditOpen(false);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update goal";
      showError(message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!isEditOpen) {
      setEditMode(false);
    }
  }, [isEditOpen]);

  const handleDelete = async () => {
    if (!goal) return;
    if (!window.confirm("Delete this goal? This cannot be undone.")) return;
    try {
      await deleteGoal(goal.id);
      showSuccess("Goal deleted.");
      navigate("/goals");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to delete goal";
      showError(message);
    }
  };

  const handleSaveStrategy = async () => {
    if (!goal) return;
    if (!isPremium) {
      showError("Strategy is a Premium feature. Upgrade to edit strategy.");
      return;
    }
    setIsSavingStrategy(true);
    try {
      await updateGoal(goal.id, {
        strategy: {
          whyMatters: strategyWhy.trim(),
          whoBenefits: strategyWho.trim(),
          sayNoTo: strategyNo.trim(),
        },
      });
      const refreshed = await getGoalById(goal.id);
      setGoal(refreshed);
      showSuccess("Strategy saved!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save strategy";
      showError(message);
    } finally {
      setIsSavingStrategy(false);
    }
  };

  const generateLocalAiPreview = () => {
    const lines: string[] = [];
    if (goal) {
      lines.push(`Goal: ${goal.name}`);
      if (goal.startDate || goal.endDate) {
        lines.push(`Dates: ${goal.startDate ?? ""} → ${goal.endDate ?? ""}`.trim());
      }
      lines.push("");
    }
    lines.push("Suggested next actions:");
    lines.push("- 1 small action you can do today (15 minutes)");
    lines.push("- 1 medium action this week (60–90 minutes)");
    lines.push("- 1 accountability action (message someone / calendar block)");
    lines.push("");
    lines.push("Common obstacles to plan for:");
    lines.push("- Low energy / time constraints");
    lines.push("- Forgetting to start (use a calendar reminder)");
    lines.push("- Lack of clarity (define the very next step)");
    return lines.join("\n");
  };

  const handleSavePlanning = async () => {
    if (!goal) return;
    if (!isPremium) {
      showError("Planning is a Premium feature. Upgrade to edit planning.");
      return;
    }
    setIsSavingPlanning(true);
    try {
      await updateGoal(goal.id, {
        planning: {
          obstacles: planningObstacles.trim() ? planningObstacles.trim() : undefined,
          nextActions: planningNextActions.trim() ? planningNextActions.trim() : undefined,
          aiPreview: planningAiPreview.trim() ? planningAiPreview.trim() : undefined,
        },
      });
      const refreshed = await getGoalById(goal.id);
      setGoal(refreshed);
      showSuccess("Planning saved!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save planning";
      showError(message);
    } finally {
      setIsSavingPlanning(false);
    }
  };

  const handleMarkComplete = async () => {
    if (!goal) return;
    setIsSaving(true);
    try {
      const now = new Date().toISOString();
      const cpsRaw = normalizeCheckpointList(checkpoints, newId, now);
      const cps = cpsRaw.length
        ? cpsRaw.map((c) => {
            if (c.kind === "number") {
              const target = Math.max(1, c.target ?? 1);
              return { ...c, target, current: target, completed: true, updatedAt: now };
            }
            return { ...c, completed: true, updatedAt: now };
          })
        : cpsRaw;
      await updateGoal(goal.id, {
        checkpoints: cps,
        progress: 100,
        status: "completed",
      });
      const refreshed = await getGoalById(goal.id);
      setGoal(refreshed);
      setCheckpoints(cps);
      showSuccess("Goal marked as completed!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to mark complete";
      showError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const persistCheckpoints = async (next: GoalCheckpoint[]) => {
    if (!goal) return;
    setIsSaving(true);
    try {
      const now = new Date().toISOString();
      const sanitized = normalizeCheckpointList(next, newId, now);

      const total = next.length;
      const nextProgress = total > 0 ? getDerivedProgress(goal, sanitized) : (goal.progress ?? 0);
      await updateGoal(goal.id, {
        checkpoints: sanitized,
        progress: nextProgress,
        status: total > 0 && nextProgress === 100 ? "completed" : "active",
      });
      const refreshed = await getGoalById(goal.id);
      setGoal(refreshed);
      setCheckpoints(sanitized);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update checkpoints";
      showError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCheckpoint = async () => {
    const title = newCheckpointTitle.trim();
    if (!goal) return;
    if (!title) return;
    const now = new Date().toISOString();
    const next: GoalCheckpoint[] = [
      ...checkpoints,
      { id: newId(), title, kind: "boolean", completed: false, createdAt: now, updatedAt: now },
    ];
    setNewCheckpointTitle("");
    await persistCheckpoints(next);
  };

  const handleSetCheckpointLocalNumbers = (
    checkpointId: string,
    patch: { current?: number; target?: number },
  ) => {
    const now = new Date().toISOString();
    setCheckpoints((prev) =>
      prev.map((c) => {
        if (c.id !== checkpointId) return c;
        const target = Math.max(1, Math.trunc(patch.target ?? c.target ?? 1));
        const current = Math.max(0, Math.trunc(patch.current ?? c.current ?? 0));
        const clampedCurrent = Math.min(current, target);
        return {
          ...c,
          kind: "number" as const,
          target,
          current: clampedCurrent,
          completed: clampedCurrent >= target,
          updatedAt: now,
        };
      }),
    );
  };

  const handleToggleCheckpoint = async (checkpointId: string) => {
    const c = checkpoints.find((x) => x.id === checkpointId);
    if (!c) return;
    if (c.kind === "number") {
      const target = Math.max(1, c.target ?? 1);
      await handleUpdateCheckpointNumbers(checkpointId, { current: target, target });
      return;
    }
    const now = new Date().toISOString();
    const next = checkpoints.map((x) => (x.id === checkpointId ? { ...x, completed: !x.completed, updatedAt: now } : x));
    await persistCheckpoints(next);
  };

  const handleSetCheckpointKind = async (checkpointId: string, kind: "boolean" | "number") => {
    const now = new Date().toISOString();
    const next = checkpoints.map((c) => {
      if (c.id !== checkpointId) return c;
      if (kind === "number") {
        const target = Math.max(1, c.target ?? 1);
        const current = Math.max(0, c.current ?? 0);
        return {
          ...c,
          kind,
          target,
          current: Math.min(current, target),
          completed: Math.min(current, target) >= target,
          updatedAt: now,
        };
      }
      return {
        ...c,
        kind,
        current: 0,
        target: 1,
        completed: Boolean(c.completed),
        updatedAt: now,
      };
    });
    await persistCheckpoints(next);
  };

  const handleUpdateCheckpointNumbers = async (
    checkpointId: string,
    patch: { current?: number; target?: number },
  ) => {
    const now = new Date().toISOString();
    const next = checkpoints.map((c) => {
      if (c.id !== checkpointId) return c;
      const target = Math.max(1, Math.trunc(patch.target ?? c.target ?? 1));
      const current = Math.max(0, Math.trunc(patch.current ?? c.current ?? 0));
      const clampedCurrent = Math.min(current, target);
      return {
        ...c,
        kind: "number" as const,
        target,
        current: clampedCurrent,
        completed: clampedCurrent >= target,
        updatedAt: now,
      };
    });
    await persistCheckpoints(next);
  };

  const handleRenameCheckpoint = (checkpointId: string, title: string) => {
    const now = new Date().toISOString();
    setCheckpoints((prev) =>
      prev.map((c) => (c.id === checkpointId ? { ...c, title, updatedAt: now } : c)),
    );
  };

  const handleCommitRenameCheckpoint = async () => {
    await persistCheckpoints(checkpoints);
  };

  const handleDeleteCheckpoint = async (checkpointId: string) => {
    const next = checkpoints.filter((c) => c.id !== checkpointId);
    await persistCheckpoints(next);
  };

  // Notes handlers
  const handleAddNote = async () => {
    const content = newNoteContent.trim();
    if (!goal) return;
    if (!content) return;
    const now = new Date().toISOString();
    const next: GoalNote[] = [
      ...notes,
      { id: newId(), content, createdAt: now, updatedAt: now },
    ];
    setNewNoteContent("");
    setNotes(next);
    try {
      await updateGoal(goal.id, { notes: next });
      showSuccess("Note added!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to add note";
      showError(message);
      setNotes(notes); // Revert on error
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!goal) return;
    const next = notes.filter((n) => n.id !== noteId);
    setNotes(next);
    try {
      await updateGoal(goal.id, { notes: next });
      showSuccess("Note deleted!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to delete note";
      showError(message);
      setNotes(notes); // Revert on error
    }
  };

  const handleDragEndNotes = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = notes.findIndex((n) => n.id === active.id);
    const newIndex = notes.findIndex((n) => n.id === over.id);
    const reordered = arrayMove(notes, oldIndex, newIndex);
    setNotes(reordered);
    if (goal) {
      updateGoal(goal.id, { notes: reordered }).catch((e) => {
        const message = e instanceof Error ? e.message : "Failed to reorder notes";
        showError(message);
        setNotes(notes); // Revert on error
      });
    }
  };

  // Todo management functions
  const persistTodos = async (nextTodos: GoalTodo[]) => {
    if (!goal) return;
    setIsSaving(true);
    try {
      await updateGoal(goal.id, { todos: nextTodos });
      setGoal((prev) => prev ? { ...prev, todos: nextTodos } : null);
      setTodos(nextTodos);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update todos";
      showError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTodo = async () => {
    const title = newTodoTitle.trim();
    if (!goal) return;
    if (!title) return;
    
    const now = new Date().toISOString();
    const newTodo: GoalTodo = {
      id: newId(),
      title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    
    const nextTodos = [...todos, newTodo];
    setNewTodoTitle("");
    await persistTodos(nextTodos);
  };

  const handleToggleTodo = async (todoId: string) => {
    const nextTodos = todos.map((todo) =>
      todo.id === todoId
        ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
        : todo
    );
    await persistTodos(nextTodos);
  };

  const handleDeleteTodo = async (todoId: string) => {
    const nextTodos = todos.filter((todo) => todo.id !== todoId);
    await persistTodos(nextTodos);
  };

  const handleDuplicateGoal = async () => {
    if (!goal) return;
    try {
      const newId = await createGoal({
        userId: goal.userId,
        name: `${goal.name} (Copy)`,
        category: goal.category,
        priority: goal.priority,
        startDate: goal.startDate,
        endDate: goal.endDate,
        checkpoints: goal.checkpoints ?? [],
        todos: todos,
        description: goal.description,
        strategy: goal.strategy,
        planning: goal.planning,
      });
      showSuccess("Goal duplicated!");
      navigate(`/goals/${newId}`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to duplicate goal";
      showError(message);
    }
  };

  const handleReorderCheckpoints = async (activeId: string | null, overId: string | null) => {
    if (!activeId || !overId || activeId === overId) return;
    const oldIndex = checkpoints.findIndex(c => c.id === activeId);
    const newIndex = checkpoints.findIndex(c => c.id === overId);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(checkpoints, oldIndex, newIndex);
    setCheckpoints(reordered);
    await persistCheckpoints(reordered);
  };

  const handleReorderTodos = async (activeId: string | null, overId: string | null) => {
    if (!activeId || !overId || activeId === overId) return;
    const oldIndex = todos.findIndex(t => t.id === activeId);
    const newIndex = todos.findIndex(t => t.id === overId);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(todos, oldIndex, newIndex);
    setTodos(reordered);
    await persistTodos(reordered);
  };

  const handleDragEndCheckpoints = async (event: DragEndEvent) => {
    const activeId = typeof event.active?.id === "string" ? event.active.id : null;
    const overId = typeof event.over?.id === "string" ? event.over.id : null;
    await handleReorderCheckpoints(activeId, overId);
  };

  const handleDragEndTodos = async (event: DragEndEvent) => {
    const activeId = typeof event.active?.id === "string" ? event.active.id : null;
    const overId = typeof event.over?.id === "string" ? event.over.id : null;
    await handleReorderTodos(activeId, overId);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : !goal ? (
          <div className="text-gray-600">Goal not found.</div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold text-gray-900">{goal.name}</h1>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      goal.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {goal.status}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold ${getRemainingDaysBadgeClass(
                      goal,
                      derivedProgress,
                    )}`}
                  >
                    {getRemainingDaysText(goal)}
                  </span>
                </div>
                {goal.description && <p className="text-gray-500 max-w-2xl">{goal.description}</p>}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/goals"
                  className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back to Goals
                </Link>

                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={handleToggleFavorite}
                  disabled={isSaving}
                >
                  <Star className={`w-4 h-4 mr-2 ${goal.isFavorite ? "text-amber-400 fill-amber-400" : "text-gray-500"}`} />
                  {goal.isFavorite ? "Favorited" : "Favorite"}
                </Button>

                <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-full">
                      <FileText className="w-4 h-4 mr-2" /> Summary
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[760px] rounded-[2rem]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Goal Summary</DialogTitle>
                      <DialogDescription>Complete view of this goal.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-2 max-h-[70vh] overflow-auto pr-1">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="text-lg font-bold text-gray-900">{goal.name}</div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              goal.status === "completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {goal.status}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700">
                            {derivedProgress}%
                          </span>
                        </div>
                        {goal.description ? <div className="text-sm text-gray-600">{goal.description}</div> : null}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-gray-100 bg-white p-4">
                          <div className="text-sm font-semibold text-gray-900">Details</div>
                          <div className="mt-2 space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between gap-3">
                              <span className="font-medium text-gray-500">Category</span>
                              <span className="text-gray-900">{goal.category}</span>
                            </div>
                            <div className="flex justify-between gap-3">
                              <span className="font-medium text-gray-500">Priority</span>
                              <span className="text-gray-900">{goal.priority}</span>
                            </div>
                            <div className="flex justify-between gap-3">
                              <span className="font-medium text-gray-500">Days Passed</span>
                              <span className="text-gray-900">{getDaysPassedText(goal)}</span>
                            </div>
                            <div className="flex justify-between gap-3">
                              <span className="font-medium text-gray-500">Start</span>
                              <span className="text-gray-900">{goal.startDate?.trim() ? goal.startDate : "No date set"}</span>
                            </div>
                            <div className="flex justify-between gap-3">
                              <span className="font-medium text-gray-500">End</span>
                              <span className="text-gray-900">{goal.endDate?.trim() ? goal.endDate : "No date set"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-white p-4">
                          <div className="text-sm font-semibold text-gray-900">Success Metric</div>
                          <div className="mt-2 text-sm text-gray-600">
                            {goal.successMetric.type === "number" ? (
                              <div>
                                Reach {goal.successMetric.target ?? 0}
                                {goal.successMetric.unit ? ` ${goal.successMetric.unit}` : ""}
                              </div>
                            ) : (
                              <div>Complete goal</div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-gray-100 bg-white p-4">
                        <div className="text-sm font-semibold text-gray-900">Checkpoints</div>
                        <div className="mt-3 space-y-2">
                          {checkpoints.length === 0 ? (
                            <div className="text-sm text-gray-600">No checkpoints yet.</div>
                          ) : (
                            checkpoints.map((c) => (
                              <div key={c.id} className="flex items-start gap-2 text-sm">
                                {c.kind === "number" ? (
                                  <span className="text-gray-500">
                                    {Math.max(0, c.current ?? 0) >= Math.max(1, c.target ?? 1) ? "[x]" : "[ ]"}
                                  </span>
                                ) : (
                                  <span className="text-gray-500">{c.completed ? "[x]" : "[ ]"}</span>
                                )}
                                <div className="flex-1">
                                  <div className="text-gray-900">{c.title}</div>
                                  {c.kind === "number" ? (
                                    <div className="text-xs text-gray-500">
                                      {Math.max(0, c.current ?? 0)}/{Math.max(1, c.target ?? 1)}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-gray-100 bg-white p-4">
                        <div className="text-sm font-semibold text-gray-900">Notes/Key Points</div>
                        <div className="mt-3 space-y-2">
                          {todos.length === 0 ? (
                            <div className="text-sm text-gray-600">No notes yet.</div>
                          ) : (
                            todos.map((t) => (
                              <div key={t.id} className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">{t.completed ? "[x]" : "[ ]"}</span>
                                <span className={t.completed ? "line-through text-gray-400" : "text-gray-900"}>{t.title}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-gray-100 bg-white p-4">
                          <div className="text-sm font-semibold text-gray-900">Strategy</div>
                          <div className="mt-3 space-y-2 text-sm text-gray-600">
                            {goal.strategy ? (
                              <>
                                <div>
                                  <span className="font-medium text-gray-500">Why:</span> {goal.strategy.whyMatters}
                                </div>
                                <div>
                                  <span className="font-medium text-gray-500">Who benefits:</span> {goal.strategy.whoBenefits}
                                </div>
                                <div>
                                  <span className="font-medium text-gray-500">Say no to:</span> {goal.strategy.sayNoTo}
                                </div>
                              </>
                            ) : (
                              <div>No strategy set.</div>
                            )}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-white p-4">
                          <div className="text-sm font-semibold text-gray-900">Planning</div>
                          <div className="mt-3 space-y-2 text-sm text-gray-600">
                            {goal.planning ? (
                              <>
                                {goal.planning.obstacles ? <div><span className="font-medium text-gray-500">Obstacles:</span> {goal.planning.obstacles}</div> : null}
                                {goal.planning.nextActions ? <div><span className="font-medium text-gray-500">Next actions:</span> {goal.planning.nextActions}</div> : null}
                                {goal.planning.aiPreview ? <div><span className="font-medium text-gray-500">AI preview:</span> {goal.planning.aiPreview}</div> : null}
                              </>
                            ) : (
                              <div>No planning set.</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsSummaryOpen(false)} className="rounded-xl">
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={handleSetFeatured}
                  disabled={isSaving || !user}
                >
                  <Crown className="w-4 h-4 mr-2 text-amber-600" /> {isFeatured ? "Unfeature" : "Set Featured"}
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={handleDuplicateGoal}
                  disabled={isSaving}
                >
                  <Copy className="w-4 h-4 mr-2" /> Duplicate
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setEditMode(true);
                    setIsEditOpen(true);
                  }}
                >
                  <Edit3 className="w-4 h-4 mr-2" /> Edit Goal
                </Button>
                <Button variant="outline" className="rounded-full text-rose-600" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>

                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                  <DialogContent className="sm:max-w-[640px] rounded-[2rem]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Edit Goal</DialogTitle>
                      <DialogDescription>Update goal details.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-5 py-2">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-name">Goal Name</Label>
                        <Input
                          id="edit-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-category">Category</Label>
                        <Input
                          id="edit-category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-description">Description (optional)</Label>
                        <textarea
                          id="edit-description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Priority</Label>
                          <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                            <SelectTrigger className="rounded-xl">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Start Date</Label>
                          <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditOpen(false)}
                        className="rounded-xl"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-700 rounded-xl"
                      >
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={handleMarkComplete}
                  disabled={isSaving || goal.status === "completed"}
                  className="bg-blue-600 hover:bg-blue-700 rounded-full"
                >
                  Mark Completed
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Overall Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="flex justify-between items-end">
                      <span
                        className={`text-5xl font-black ${
                          goal.status === "completed" ? "text-emerald-600" : "text-gray-900"
                        }`}
                      >
                        {derivedProgress}%
                      </span>
                      <span className="text-sm font-medium text-gray-500">Target: 100%</span>
                    </div>
                    <Progress
                      value={derivedProgress}
                      className={`h-4 bg-gray-100 ${getProgressIndicatorClass(derivedProgress)} ${
                        goal.status === "completed" ? "[&>div]:from-emerald-500 [&>div]:to-lime-400" : ""
                      }`}
                    />
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold flex items-center justify-between">
                      <span>Checkpoints</span>
                      <span className="text-sm font-medium text-gray-500">
                        {derivedCheckpointStats.done}/{derivedCheckpointStats.total}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-5">
                    <div className="space-y-3">
                      <Input
                        value={newCheckpointTitle}
                        onChange={(e) => setNewCheckpointTitle(e.target.value)}
                        className="rounded-xl resize-none min-h-[44px]"
                        placeholder="Add a checkpoint (e.g., Week 1 complete)"
                      />
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Select defaultValue="boolean">
                          <SelectTrigger className="w-full sm:w-[180px] rounded-xl">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="boolean">Checkpoint</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={handleAddCheckpoint}
                          disabled={isSaving || !newCheckpointTitle.trim()}
                          className="rounded-xl bg-blue-600 hover:bg-blue-700"
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    {checkpoints.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5 text-sm text-gray-600">
                        Add checkpoints to automatically calculate progress.
                      </div>
                    ) : (
                      <DndContext sensors={sensors} onDragEnd={handleDragEndCheckpoints}>
                        <SortableContext items={checkpoints.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                          {checkpoints.map((c, index) => (
                            <SortableItem key={c.id} id={c.id}>
                              {(dragProps) => (
                                <div
                                  ref={dragProps.setNodeRef}
                                  {...dragProps.listeners}
                                  {...dragProps.attributes}
                                  className="rounded-2xl border border-gray-100 bg-white p-3"
                                  style={{
                                    transform: CSS.Transform.toString(dragProps.transform),
                                    transition: dragProps.isDragging ? 'none' : undefined,
                                    opacity: dragProps.isDragging ? 0.5 : 1,
                                  }}
                                >
                                  <div className="flex items-start gap-2">
                                    <button className="cursor-move p-1 text-gray-400 hover:text-gray-600">
                                      <GripVertical className="w-4 h-4" />
                                    </button>
                                    <div className="flex-1">
                                      <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                          <input
                                            type="checkbox"
                                            checked={
                                              c.kind === "number"
                                                ? Math.max(0, c.current ?? 0) >= Math.max(1, c.target ?? 1)
                                                : c.completed
                                            }
                                            onChange={() => handleToggleCheckpoint(c.id)}
                                            className="h-4 w-4"
                                          />
                                          <Input
                                            value={c.title}
                                            onChange={(e) => handleRenameCheckpoint(c.id, e.target.value)}
                                            onBlur={handleCommitRenameCheckpoint}
                                            className="rounded-xl resize-none min-h-[44px]"
                                          />
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                          <Select
                                            value={c.kind ?? "boolean"}
                                            onValueChange={(v) => handleSetCheckpointKind(c.id, v as "boolean" | "number")}
                                          >
                                            <SelectTrigger className="w-full sm:w-[150px] rounded-xl">
                                              <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="boolean">Checkpoint</SelectItem>
                                              <SelectItem value="number">Number</SelectItem>
                                            </SelectContent>
                                          </Select>

                                          <Button
                                            variant="outline"
                                            className="rounded-xl text-rose-600"
                                            onClick={() => handleDeleteCheckpoint(c.id)}
                                          >
                                            Delete
                                          </Button>
                                        </div>

                                        {c.kind === "number" && (
                                          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
                                            <div className="flex items-center gap-2">
                                              <Input
                                                type="number"
                                                inputMode="numeric"
                                                value={c.current ?? 0}
                                                onChange={(e) =>
                                                  handleSetCheckpointLocalNumbers(c.id, {
                                                    current: Number.isFinite(Number(e.target.value)) ? Number(e.target.value) : 0,
                                                  })
                                                }
                                                onBlur={() =>
                                                  handleUpdateCheckpointNumbers(c.id, {
                                                    current: c.current ?? 0,
                                                    target: c.target ?? 1,
                                                  })
                                                }
                                                className="w-full sm:w-[120px] rounded-xl"
                                              />
                                              <span className="text-sm text-gray-500">/</span>
                                              <Input
                                                type="number"
                                                inputMode="numeric"
                                                value={c.target ?? 1}
                                                onChange={(e) =>
                                                  handleSetCheckpointLocalNumbers(c.id, {
                                                    target: Number.isFinite(Number(e.target.value)) ? Number(e.target.value) : 1,
                                                  })
                                                }
                                                onBlur={() =>
                                                  handleUpdateCheckpointNumbers(c.id, {
                                                    current: c.current ?? 0,
                                                    target: c.target ?? 1,
                                                  })
                                                }
                                                className="w-full sm:w-[120px] rounded-xl"
                                              />
                                            </div>
                                            <div className="text-xs font-semibold text-gray-500 sm:ml-auto">
                                              {Math.max(0, (c.target ?? 1) - (c.current ?? 0))} remaining
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </SortableItem>
                          ))}
                        </SortableContext>
                      </DndContext>
                    )}
                  </CardContent>
                </Card>

                {/* Notes Section */}
                <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold flex items-center justify-between">
                      <span>Notes/Key Points</span>
                      <span className="text-sm font-medium text-gray-500">
                        {notes.length} notes
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-5">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        className="rounded-xl"
                        placeholder="Add a new note/key point..."
                      />
                      <Button
                        onClick={handleAddNote}
                        disabled={isSaving || !newNoteContent.trim()}
                        className="rounded-xl bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add new note
                      </Button>
                    </div>

                    {notes.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5 text-sm text-gray-600">
                        Add notes/key points to track specific action items for this goal.
                      </div>
                    ) : (
                      <DndContext sensors={sensors} onDragEnd={handleDragEndNotes}>
                        <SortableContext items={notes.map((n) => n.id)} strategy={verticalListSortingStrategy}>
                          {notes.map((note) => (
                            <SortableItem key={note.id} id={note.id}>
                              {(dragProps) => (
                                <div
                                  ref={dragProps.setNodeRef}
                                  {...dragProps.listeners}
                                  {...dragProps.attributes}
                                  className="rounded-2xl border border-gray-100 bg-white p-3"
                                  style={{
                                    transform: CSS.Transform.toString(dragProps.transform),
                                    transition: dragProps.isDragging ? 'none' : undefined,
                                    opacity: dragProps.isDragging ? 0.5 : 1,
                                  }}
                                >
                                  <div className="flex items-start gap-2">
                                    <button className="cursor-move p-1 text-gray-400 hover:text-gray-600">
                                      <GripVertical className="w-4 h-4" />
                                    </button>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3">
                                        <span className="flex-1 text-sm text-gray-900">
                                          {note.content}
                                        </span>
                                        <Button
                                          variant="outline"
                                          className="rounded-xl text-rose-600 h-8 w-8 p-0"
                                          onClick={() => handleDeleteNote(note.id)}
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </SortableItem>
                          ))}
                        </SortableContext>
                      </DndContext>
                    )}
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm rounded-[2.5rem]">
                  <CardContent className="space-y-6">
                    {notes.length > 0 && (
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">Notes/Key Points</h4>
                          <p className="text-sm text-gray-500">Quick preview of your notes.</p>
                        </div>
                        <div className="space-y-2">
                          {notes.slice(0, 6).map((note) => (
                            <div key={note.id} className="flex items-start gap-2 text-sm">
                              <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                              <span className="text-gray-700">{note.content}</span>
                            </div>
                          ))}
                          {notes.length > 6 && (
                            <div className="text-xs font-semibold text-gray-500">+ {notes.length - 6} more</div>
                          )}
                        </div>
                      </div>
                    )}

                    {!goal.strategy && !goal.planning ? (
                      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5">
                        <p className="font-semibold text-gray-900">No strategy or planning set for this goal yet.</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Add a simple “why” and a plan for the week to stay consistent. Use the buttons below to set it now.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {!!goal.strategy && (
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">Strategy</h4>
                              <p className="text-sm text-gray-500">Your motivation and focus.</p>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-semibold text-gray-900">Why does this goal matter?</p>
                                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{goal.strategy.whyMatters}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">Who benefits if you succeed?</p>
                                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{goal.strategy.whoBenefits}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">What will you say “No” to?</p>
                                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{goal.strategy.sayNoTo}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {!!goal.planning && (
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">Planning</h4>
                              <p className="text-sm text-gray-500">What could block you, and what you’ll do next.</p>
                            </div>

                            <div className="space-y-4">
                              {goal.planning.obstacles ? (
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">Common obstacles</p>
                                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{goal.planning.obstacles}</p>
                                </div>
                              ) : null}
                              {goal.planning.nextActions ? (
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">Next actions for this week</p>
                                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{goal.planning.nextActions}</p>
                                </div>
                              ) : null}
                              {goal.planning.aiPreview ? (
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">AI reflection</p>
                                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{goal.planning.aiPreview}</p>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {editMode && (
                      <div className="space-y-6 pt-4 border-t">
                        {(editTarget === null || editTarget === "strategy") && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Strategy</h4>
                            <div className="space-y-3">
                              <div className="grid gap-2">
                                <Label>Why does this goal matter?</Label>
                                <textarea
                                  value={strategyWhy}
                                  onChange={(e) => setStrategyWhy(e.target.value)}
                                  disabled={!editMode}
                                  className="min-h-[110px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label>Who benefits if you succeed?</Label>
                                <textarea
                                  value={strategyWho}
                                  onChange={(e) => setStrategyWho(e.target.value)}
                                  disabled={!editMode}
                                  className="min-h-[110px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label>What will you say “No” to?</Label>
                                <textarea
                                  value={strategyNo}
                                  onChange={(e) => setStrategyNo(e.target.value)}
                                  disabled={!editMode}
                                  className="min-h-[110px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {(editTarget === null || editTarget === "planning") && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Planning</h4>
                            <div className="space-y-3">
                              <div className="grid gap-2">
                                <Label>Common obstacles</Label>
                                <textarea
                                  value={planningObstacles}
                                  onChange={(e) => setPlanningObstacles(e.target.value)}
                                  disabled={!editMode}
                                  className="min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label>Next actions for this week</Label>
                                <textarea
                                  value={planningNextActions}
                                  onChange={(e) => setPlanningNextActions(e.target.value)}
                                  disabled={!editMode}
                                  className="min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label>AI-style preview (local)</Label>
                                <textarea
                                  value={planningAiPreview}
                                  onChange={(e) => setPlanningAiPreview(e.target.value)}
                                  disabled={!editMode}
                                  className="min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditMode(true);
                          setEditTarget("strategy");
                        }}
                        className="rounded-full"
                      >
                        {!isPremium && <Lock className="w-4 h-4 mr-2" />}
                        {goal.strategy ? "Edit Strategy" : "Add Strategy"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditMode(true);
                          setEditTarget("planning");
                        }}
                        className="rounded-full"
                      >
                        {!isPremium && <Lock className="w-4 h-4 mr-2" />}
                        {goal.planning ? "Edit Planning" : "Add Planning"}
                      </Button>
                      {editMode && (
                        <>
                          {(editTarget === null || editTarget === "strategy") && (
                            <Button
                              onClick={handleSaveStrategy}
                              disabled={isSavingStrategy}
                              className="rounded-full bg-blue-600 hover:bg-blue-700"
                            >
                              {isSavingStrategy ? "Saving..." : "Save Strategy"}
                            </Button>
                          )}
                          {(editTarget === null || editTarget === "planning") && (
                            <Button
                              onClick={handleSavePlanning}
                              disabled={isSavingPlanning}
                              className="rounded-full bg-blue-600 hover:bg-blue-700"
                            >
                              {isSavingPlanning ? "Saving..." : "Save Planning"}
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card
                  className={`border-none shadow-sm rounded-[2.5rem] text-white transition-colors ${
                    goal.status === "completed" ? "bg-emerald-600" : "bg-blue-600"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-blue-200" />
                      Success Metric
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-50 leading-relaxed">
                      {goal.successMetric.type === "number" ? "Reach target" : "Complete goal"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[2.5rem]">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Target className="w-5 h-5 text-amber-500" />
                      Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Category</span>
                      <span className="text-gray-900">{goal.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Priority</span>
                      <span className="text-gray-900">{goal.priority}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Days Passed</span>
                      <span className="text-gray-900">{getDaysPassedText(goal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Start</span>
                      <span className="text-gray-900">{typeof (goal as unknown as { startDate?: unknown }).startDate === "string" && (goal as unknown as { startDate?: string }).startDate?.trim() ? (goal as unknown as { startDate?: string }).startDate : "No date set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">End</span>
                      <span className="text-gray-900">{typeof (goal as unknown as { endDate?: unknown }).endDate === "string" && (goal as unknown as { endDate?: string }).endDate?.trim() ? (goal as unknown as { endDate?: string }).endDate : "No date set"}</span>
                    </div>
                    <div className="pt-3">
                      <CircularProgress value={derivedProgress} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default GoalDetails;
