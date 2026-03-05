import Layout from "@/components/Layout";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { showError, showSuccess } from "@/utils/toast";
import { useGoals } from "@/hooks/useGoals";
import { updateGoal } from "@/firebase/goals";

const Strategy = () => {
  const { goals } = useGoals();
  const [selectedGoalId, setSelectedGoalId] = useState<string>("");
  const selectedGoal = useMemo(
    () => goals.find((g) => g.id === selectedGoalId) ?? null,
    [goals, selectedGoalId],
  );

  const [whyMatters, setWhyMatters] = useState("");
  const [whoBenefits, setWhoBenefits] = useState("");
  const [sayNoTo, setSayNoTo] = useState("");
  const [saving, setSaving] = useState(false);

  const syncFromGoal = (goalId: string) => {
    setSelectedGoalId(goalId);
    const g = goals.find((x) => x.id === goalId);
    setWhyMatters(g?.strategy?.whyMatters ?? "");
    setWhoBenefits(g?.strategy?.whoBenefits ?? "");
    setSayNoTo(g?.strategy?.sayNoTo ?? "");
  };

  const handleSave = async () => {
    if (!selectedGoal) {
      showError("Please select a goal.");
      return;
    }

    setSaving(true);
    try {
      await updateGoal(selectedGoal.id, {
        strategy: {
          whyMatters: whyMatters.trim(),
          whoBenefits: whoBenefits.trim(),
          sayNoTo: sayNoTo.trim(),
        },
      });
      showSuccess("Strategy saved!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save strategy";
      showError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Strategy</h1>
          <p className="text-gray-500">Define your why and protect your focus.</p>
        </div>

        <Card className="border-none shadow-sm rounded-[2.5rem]">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Choose a Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              value={selectedGoalId}
              onChange={(e) => syncFromGoal(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select...</option>
              {goals.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        {selectedGoal && (
          <Card className="border-none shadow-sm rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Strategy for {selectedGoal.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-2">
                <Label>Why does this goal matter?</Label>
                <textarea
                  value={whyMatters}
                  onChange={(e) => setWhyMatters(e.target.value)}
                  className="min-h-[110px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-2">
                <Label>Who benefits if you succeed?</Label>
                <textarea
                  value={whoBenefits}
                  onChange={(e) => setWhoBenefits(e.target.value)}
                  className="min-h-[110px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-2">
                <Label>What will you say “No” to?</Label>
                <textarea
                  value={sayNoTo}
                  onChange={(e) => setSayNoTo(e.target.value)}
                  className="min-h-[110px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <Button onClick={handleSave} disabled={saving} className="rounded-full bg-blue-600 hover:bg-blue-700 w-fit">
                {saving ? "Saving..." : "Save Strategy"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Strategy;