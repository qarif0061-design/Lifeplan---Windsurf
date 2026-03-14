import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useDailyTasks } from "@/hooks/useDailyTasks";
import { useUser } from "@/contexts/UserContext";
import { auth } from "@/firebase/config";
import {
  updateDailyTaskDay,
  type DailyCallEmailItem,
  type DailyPriorityItem,
} from "@/firebase/dailyTasks";
import { showError, showSuccess } from "@/utils/toast";
import { Calendar as CalendarIcon, History } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const toDateKeyLocal = (d: Date): string => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const toDisplayDate = (key: string): string => {
  const [yyyy, mm, dd] = key.split("-");
  return `${dd}/${mm}/${yyyy}`;
};

const newTaskId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const scheduleHours = Array.from({ length: 18 }, (_, i) => String(i + 6).padStart(2, "0") + ":00");

const normalizeTop3 = (items?: DailyPriorityItem[]): DailyPriorityItem[] => {
  const now = new Date().toISOString();
  const base = items ? [...items] : [];
  while (base.length < 3) {
    base.push({ id: newTaskId(), title: "", completed: false, createdAt: now, updatedAt: now });
  }
  return base.slice(0, 3);
};

const normalizeCallEmail3 = (items?: DailyCallEmailItem[]): DailyCallEmailItem[] => {
  const now = new Date().toISOString();
  const base = items ? [...items] : [];
  while (base.length < 3) {
    base.push({ id: newTaskId(), title: "", completed: false, createdAt: now, updatedAt: now });
  }
  return base.slice(0, 3);
};

const DailyPlanner = () => {
  const { user, isPremium } = useUser();
  const { days, distinctDates, freeLimit, canCreateNewDate } = useDailyTasks();
  const [searchParams, setSearchParams] = useSearchParams();

  const dateFromQuery = searchParams.get("date") ?? undefined;

  const [selectedDateKey, setSelectedDateKey] = useState<string>(() => {
    if (dateFromQuery && /^\d{4}-\d{2}-\d{2}$/.test(dateFromQuery)) return dateFromQuery;
    return toDateKeyLocal(new Date());
  });

  useEffect(() => {
    if (!dateFromQuery) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateFromQuery)) return;
    setSelectedDateKey(dateFromQuery);
  }, [dateFromQuery]);

  const selectedDay = useMemo(
    () => days.find((d) => d.date === selectedDateKey),
    [days, selectedDateKey],
  );

  const [schedule, setSchedule] = useState<Record<string, string>>({});
  const [priorities, setPriorities] = useState<DailyPriorityItem[]>(() => normalizeTop3(undefined));
  const [reminder, setReminder] = useState("");
  const [callEmail, setCallEmail] = useState<DailyCallEmailItem[]>(() => normalizeCallEmail3(undefined));
  const [forTomorrow, setForTomorrow] = useState("");
  const [affirmation, setAffirmation] = useState("");
  const [notes, setNotes] = useState("");

  const [saving, setSaving] = useState(false);

  const canWriteToSelectedDate = useMemo(() => {
    if (isPremium) return true;
    if (distinctDates.includes(selectedDateKey)) return true;
    return canCreateNewDate;
  }, [isPremium, distinctDates, selectedDateKey, canCreateNewDate]);

  const limitMessage = useMemo(() => {
    if (isPremium) return null;
    if (canWriteToSelectedDate) return null;
    return `Free users can add daily tasks for up to ${freeLimit} days. Upgrade to Premium for unlimited daily tasks.`;
  }, [isPremium, canWriteToSelectedDate, freeLimit]);

  const persistDay = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      showError("Please sign in to manage your daily planner.");
      return;
    }

    if (!canWriteToSelectedDate) {
      showError(limitMessage ?? "Upgrade to Premium to add more daily tasks.");
      return;
    }

    setSaving(true);
    try {
      await updateDailyTaskDay(uid, selectedDateKey, {
        schedule,
        priorities,
        reminder: reminder.trim() ? reminder.trim() : "",
        callEmail,
        forTomorrow: forTomorrow.trim() ? forTomorrow.trim() : "",
        affirmation: affirmation.trim() ? affirmation.trim() : "",
        notes: notes.trim() ? notes.trim() : "",
      });
      showSuccess("Daily planner saved.");
    } catch (e: unknown) {
      const raw = e instanceof Error ? e.message : "Failed to save daily planner";
      const message = raw.toLowerCase().includes("insufficient permissions")
        ? "Missing or insufficient permissions. Update your Firestore rules to allow authenticated users to write their own daily tasks."
        : raw;
      showError(message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const nextSchedule: Record<string, string> = {};
    for (const h of scheduleHours) {
      nextSchedule[h] = selectedDay?.schedule?.[h] ?? "";
    }
    setSchedule(nextSchedule);
    setPriorities(normalizeTop3(selectedDay?.priorities));
    setReminder(selectedDay?.reminder ?? "");
    setCallEmail(normalizeCallEmail3(selectedDay?.callEmail));
    setForTomorrow(selectedDay?.forTomorrow ?? "");
    setAffirmation(selectedDay?.affirmation ?? "");
    setNotes(selectedDay?.notes ?? "");
  }, [selectedDateKey, selectedDay]);

  const selectedDateObj = useMemo(() => {
    const [yyyy, mm, dd] = selectedDateKey.split("-").map(Number);
    return new Date(yyyy, mm - 1, dd);
  }, [selectedDateKey]);

  const headerSubtitle = useMemo(() => {
    if (isPremium) return "Plan your day and track what matters.";
    return `Free plan: daily tasks for up to ${freeLimit} days. Upgrade for unlimited.`;
  }, [isPremium, freeLimit]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daily Planner</h1>
            <p className="text-gray-500">{headerSubtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/daily-planner/history">
                <History className="w-4 h-4 mr-2" /> History
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={persistDay}
              disabled={!canWriteToSelectedDate || saving}
            >
              {saving ? "Saving..." : "Save Day"}
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-sm rounded-[2.5rem]">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Date</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row md:items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full justify-start">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {toDisplayDate(selectedDateKey)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDateObj}
                  onSelect={(d) => {
                    if (!d) return;
                    const key = toDateKeyLocal(d);
                    setSelectedDateKey(key);
                    setSearchParams((prev) => {
                      const next = new URLSearchParams(prev);
                      next.set("date", key);
                      return next;
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {!canWriteToSelectedDate && (
              <div className="text-sm text-gray-600">
                {limitMessage} <Link className="text-blue-600 hover:underline" to="/pricing">Upgrade</Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {scheduleHours.map((h) => (
                  <div key={h} className="flex items-center gap-3">
                    <div className="w-14 text-xs font-semibold text-gray-500">{h}</div>
                    <Input
                      value={schedule[h] ?? ""}
                      onChange={(e) =>
                        setSchedule((prev) => ({
                          ...prev,
                          [h]: e.target.value,
                        }))
                      }
                      className="rounded-xl"
                      placeholder=""
                      disabled={saving}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[160px] w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder=""
                  disabled={saving}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Top 3 Priorities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {priorities.map((p, idx) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={p.completed}
                      onChange={() => {
                        const now = new Date().toISOString();
                        setPriorities((prev) =>
                          prev.map((x) => (x.id === p.id ? { ...x, completed: !x.completed, updatedAt: now } : x)),
                        );
                      }}
                      disabled={saving}
                    />
                    <Input
                      value={p.title}
                      onChange={(e) => {
                        const now = new Date().toISOString();
                        setPriorities((prev) =>
                          prev.map((x, i) => (i === idx ? { ...x, title: e.target.value, updatedAt: now } : x)),
                        );
                      }}
                      className="rounded-xl"
                      placeholder={idx === 0 ? "Priority 1" : idx === 1 ? "Priority 2" : "Priority 3"}
                      disabled={saving}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Reminder</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="min-h-[120px] w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder=""
                  disabled={saving}
                />
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">To Call / Email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {callEmail.map((c, idx) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={c.completed}
                      onChange={() => {
                        const now = new Date().toISOString();
                        setCallEmail((prev) =>
                          prev.map((x) => (x.id === c.id ? { ...x, completed: !x.completed, updatedAt: now } : x)),
                        );
                      }}
                      disabled={saving}
                    />
                    <Input
                      value={c.title}
                      onChange={(e) => {
                        const now = new Date().toISOString();
                        setCallEmail((prev) =>
                          prev.map((x, i) => (i === idx ? { ...x, title: e.target.value, updatedAt: now } : x)),
                        );
                      }}
                      className="rounded-xl"
                      placeholder={idx === 0 ? "Person / action" : idx === 1 ? "Person / action" : "Person / action"}
                      disabled={saving}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">For Tomorrow</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={forTomorrow}
                  onChange={(e) => setForTomorrow(e.target.value)}
                  className="min-h-[120px] w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder=""
                  disabled={saving}
                />
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Daily Affirmation</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={affirmation}
                  onChange={(e) => setAffirmation(e.target.value)}
                  className="min-h-[80px] w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder=""
                  disabled={saving}
                />
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default DailyPlanner;
