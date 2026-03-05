import Layout from "@/components/Layout";
import { useEffect, useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showError, showSuccess } from "@/utils/toast";
import { useUser } from "@/contexts/UserContext";
import { upsertDailyCheckIn } from "@/firebase/checkins";
import { updateUserStreak } from "@/firebase/users";
import { useCheckIns, computeStreakFromDates } from "@/hooks/useCheckIns";

const toDateKeyLocal = (d: Date): string => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const CheckIn = () => {
  const { user } = useUser();
  const { checkIns, stats } = useCheckIns();

  const todayKey = useMemo(() => toDateKeyLocal(new Date()), []);
  const todayExisting = useMemo(() => checkIns.find((c) => c.date === todayKey), [checkIns, todayKey]);

  const [hydration, setHydration] = useState<boolean>(todayExisting?.hydration ?? false);
  const [healthyEating, setHealthyEating] = useState<boolean>(todayExisting?.healthyEating ?? false);
  const [exercise, setExercise] = useState<boolean>(todayExisting?.exercise ?? false);
  const [notes, setNotes] = useState<string>(todayExisting?.notes ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setHydration(todayExisting?.hydration ?? false);
    setHealthyEating(todayExisting?.healthyEating ?? false);
    setExercise(todayExisting?.exercise ?? false);
    setNotes(todayExisting?.notes ?? "");
  }, [todayExisting]);

  const handleSave = async () => {
    if (!user) {
      showError("Please sign in to save your check-in.");
      return;
    }

    setSaving(true);
    try {
      await upsertDailyCheckIn({
        userId: user.id,
        date: todayKey,
        hydration,
        healthyEating,
        exercise,
        notes: notes.trim() ? notes.trim() : undefined,
      });

      const nextDates = Array.from(new Set([todayKey, ...checkIns.map((c) => c.date)]));
      const nextCurrentStreak = computeStreakFromDates(nextDates, todayKey);
      const nextLongestStreak = Math.max(user.stats.longestStreak ?? 0, nextCurrentStreak);
      await updateUserStreak(user.id, nextCurrentStreak, nextLongestStreak);

      showSuccess("Daily check-in saved!");
    } catch (e: unknown) {
      const raw = e instanceof Error ? e.message : "Failed to save check-in";
      const message = raw.toLowerCase().includes("insufficient permissions")
        ? "Missing or insufficient permissions. Update your Firestore rules to allow authenticated users to write their own daily check-ins."
        : raw;
      showError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Check-in</h1>
          <p className="text-gray-500">Build consistency and keep your streak alive.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stats.streak}</div>
              <div className="text-sm text-gray-500">Current Streak</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">{stats.avgLast7CompletionPct}%</div>
              <div className="text-sm text-gray-500">Last 7 Days Completion</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{stats.totalCheckIns}</div>
              <div className="text-sm text-gray-500">Total Check-ins</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm rounded-[2.5rem]">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Today ({todayKey})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                <input type="checkbox" checked={hydration} onChange={(e) => setHydration(e.target.checked)} />
                <span className="font-medium text-gray-900">Hydration</span>
              </label>
              <label className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                <input type="checkbox" checked={healthyEating} onChange={(e) => setHealthyEating(e.target.checked)} />
                <span className="font-medium text-gray-900">Healthy Eating</span>
              </label>
              <label className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                <input type="checkbox" checked={exercise} onChange={(e) => setExercise(e.target.checked)} />
                <span className="font-medium text-gray-900">Exercise</span>
              </label>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="checkin-notes">Notes (optional)</Label>
              <Input id="checkin-notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded-xl" />
            </div>

            <Button onClick={handleSave} disabled={saving} className="rounded-full bg-blue-600 hover:bg-blue-700">
              {saving ? "Saving..." : "Save Check-in"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CheckIn;