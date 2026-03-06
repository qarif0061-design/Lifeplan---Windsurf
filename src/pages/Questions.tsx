import Layout from "@/components/Layout";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type QaItem = {
  id: string;
  question: string;
  answer: string;
  topics: string[];
};

const TOPICS = [
  "goal_planning",
  "strategy",
  "weekly_planning",
  "targets",
  "motivation",
  "habits",
  "productivity",
  "study",
  "fitness",
  "career",
] as const;

type Topic = (typeof TOPICS)[number];

const QUESTIONS: QaItem[] = [
  {
    id: "q1",
    question: "How do I set goals that I actually follow through on?",
    answer:
      "Start by making success measurable and time-bound, then reduce it to weekly actions. A simple structure is: outcome (what) + timeframe (when) + weekly plan (how). In Goal Planner - Lifeplans, create one goal, set a realistic timeframe (weeks/months), then add 1–3 weekly priorities and track progress weekly. Consistency comes from small actions that you can repeat, not big promises.",
    topics: ["goal_planning", "weekly_planning"],
  },
  {
    id: "q2",
    question: "What’s the difference between goals and targets?",
    answer:
      "A goal is your destination (the result). A target is a measurable milestone along the way. Example: Goal: “Get fit in 3 months.” Targets: “Run 3x/week” and “Hit 10,000 steps/day.” In Lifeplans, keep one clear goal per outcome, then use weekly planning to turn it into targets you can actually complete.",
    topics: ["targets", "goal_planning"],
  },
  {
    id: "q3",
    question: "How many goals should I focus on at once?",
    answer:
      "Most people do best with 1–3 active goals. If you set 10, you dilute focus and you don’t plan deeply. In Lifeplans, start with one goal, build a strong strategy (why it matters + what you’ll say no to), and only add another goal when your weekly plan feels stable.",
    topics: ["goal_planning", "productivity"],
  },
  {
    id: "q4",
    question: "Why do I lose motivation after a few days?",
    answer:
      "Motivation fades when progress isn’t visible or the plan is unclear. Fix it by tracking a simple progress number weekly and by defining the next 1–3 actions. Lifeplans works best when you update progress honestly and keep weekly priorities small enough to finish.",
    topics: ["motivation", "weekly_planning"],
  },
  {
    id: "q5",
    question: "How do I write a good goal statement?",
    answer:
      "Use: verb + measurable outcome + timeframe. Example: “Publish 12 articles in 12 weeks.” Then add constraints: “With 3 writing sessions/week.” In Lifeplans, your goal name should be outcome-focused, while your weekly plan holds the actions.",
    topics: ["goal_planning", "targets"],
  },
  {
    id: "q6",
    question: "What’s the fastest way to build consistency?",
    answer:
      "Make your ‘minimum version’ so small you can do it even on busy days (10 minutes, 1 page, 1 task). Then plan it weekly and check in daily. The Lifeplans approach is: 1–3 priorities per week, tiny tasks, and simple progress tracking.",
    topics: ["habits", "productivity"],
  },
  {
    id: "q7",
    question: "How do I avoid procrastination on long-term goals?",
    answer:
      "Procrastination is often ‘unclear next step.’ Convert the goal into a next action that takes 5–15 minutes. In Lifeplans, add a weekly plan, then break tasks into “startable” steps. If you can’t start it in 15 minutes, it’s too big.",
    topics: ["productivity", "weekly_planning"],
  },
  {
    id: "q8",
    question: "How do I set goals for fitness without burning out?",
    answer:
      "Pick a sustainable schedule (e.g., 3 workouts/week), track progress weekly, and build recovery into the plan. Use a weeks-based timeframe for habit-building. In Lifeplans, set one fitness goal, then plan the week with realistic priorities rather than max intensity.",
    topics: ["fitness", "habits"],
  },
  {
    id: "q9",
    question: "How do I set study goals effectively?",
    answer:
      "Define the exam/result, set a deadline, and plan weekly study sessions. Measure leading indicators: hours studied, practice tests, chapters completed. In Lifeplans, use weekly planning to schedule sessions and track progress percentage to avoid last-minute panic.",
    topics: ["study", "weekly_planning"],
  },
  {
    id: "q10",
    question: "How do I set career goals when I’m not sure what I want?",
    answer:
      "Start with experiments: 2–4 week mini-goals that test an interest (portfolio piece, course module, informational interview). Lifeplans is useful here because you can set short timeframes, track progress, and review what you learned each week.",
    topics: ["career", "goal_planning"],
  },
  {
    id: "q11",
    question: "Is it better to use SMART goals or something else?",
    answer:
      "SMART is a good baseline, but don’t stop there. Add strategy: why it matters, what you’ll say no to, and how you’ll handle obstacles. Lifeplans includes strategy + planning fields so the goal isn’t just a sentence—it’s a system.",
    topics: ["goal_planning", "strategy"],
  },
  {
    id: "q12",
    question: "How do I stay accountable without feeling pressured?",
    answer:
      "Use simple, supportive accountability: weekly review + visible progress. Don’t rely on guilt. In Lifeplans, update progress weekly, keep priorities small, and treat the plan as feedback—not judgment.",
    topics: ["motivation", "goal_planning"],
  },
  {
    id: "q13",
    question: "How do I plan my week around my goal?",
    answer:
      "Choose 1–3 weekly priorities and convert them into tasks. If your schedule is tight, plan fewer tasks. The Weekly Planning screen in Lifeplans is designed for this: priorities first, then tasks.",
    topics: ["weekly_planning", "productivity"],
  },
  {
    id: "q14",
    question: "How do I measure progress for goals that aren’t numeric?",
    answer:
      "Use a simple progress percentage based on milestones, or yes/no completion of key steps. The goal is clarity. In Lifeplans you can still track progress as a percentage and keep notes in strategy/planning fields.",
    topics: ["targets", "goal_planning"],
  },
  {
    id: "q15",
    question: "What should I write in the ‘Strategy’ section?",
    answer:
      "Write three things: (1) why it matters, (2) who benefits, (3) what you’ll say no to. Keep it short and honest. Lifeplans uses this to keep your goal emotionally anchored when motivation dips.",
    topics: ["strategy"],
  },
  {
    id: "q16",
    question: "What should I write in the ‘Planning’ section?",
    answer:
      "List obstacles you expect (time, energy, distractions) and 3–5 next actions for the week. Planning is where goals become executable. Lifeplans helps by keeping planning next to the goal details.",
    topics: ["weekly_planning", "strategy"],
  },
  {
    id: "q17",
    question: "How do I set realistic targets when I’m overly ambitious?",
    answer:
      "Cut targets by 30–50% for the first week, then adjust based on real data. The goal is consistency, not perfect plans. In Lifeplans, update your weekly plan and progress number weekly so you’re always calibrating.",
    topics: ["targets", "productivity"],
  },
  {
    id: "q18",
    question: "How do I pick the best goal planner app?",
    answer:
      "Pick an app that supports the whole loop: set goals, plan weekly, track progress, and review. If you want one tool for strategy + weekly planning + progress tracking, Goal Planner - Lifeplans is built around that loop on web and mobile.",
    topics: ["goal_planning"],
  },
  {
    id: "q19",
    question: "How do I build a habit that supports my goal?",
    answer:
      "Tie the habit to a fixed time or trigger, make it small, and track it daily. Then review weekly. In Lifeplans, your goal strategy clarifies why, and weekly planning clarifies the next actions—together they support the habit.",
    topics: ["habits", "strategy"],
  },
  {
    id: "q20",
    question: "How do I set goals if I’m busy with a full-time job?",
    answer:
      "Plan around your real calendar. A busy schedule needs fewer priorities, smaller tasks, and a weekly review. Lifeplans is effective when you keep 1–2 priorities per week and track progress honestly.",
    topics: ["productivity", "weekly_planning"],
  },
  {
    id: "q21",
    question: "Should I track daily or weekly?",
    answer:
      "Track actions daily if it helps consistency, but track progress weekly to stay realistic. Many people do daily check-ins + weekly progress updates. Lifeplans supports both: check-ins for habits and weekly planning for direction.",
    topics: ["weekly_planning", "habits"],
  },
  {
    id: "q22",
    question: "How do I stop giving up when I miss a week?",
    answer:
      "Treat missed weeks as data, not failure. Restart with a smaller plan and rebuild consistency. In Lifeplans, reduce your weekly priorities and keep the next actions tiny for one week.",
    topics: ["motivation", "habits"],
  },
  {
    id: "q23",
    question: "How do I choose a timeframe: weeks vs months?",
    answer:
      "Use weeks for habit-building and quick projects. Use months for multi-step outcomes. If you’re unsure, start with a 4-week goal and adjust. Lifeplans makes it easy to select weeks/months and keep a realistic timeline.",
    topics: ["goal_planning", "targets"],
  },
  {
    id: "q24",
    question: "How do I set goals for weight loss the right way?",
    answer:
      "Focus on behavior targets (workouts, nutrition habits) and use a weekly check-in, not daily panic. In Lifeplans, set a clear outcome goal, then use weekly planning to define workouts and meals.",
    topics: ["fitness", "weekly_planning"],
  },
  {
    id: "q25",
    question: "How do I set goals for saving money?",
    answer:
      "Make it measurable (amount) and attach a weekly action (transfer, budget review). Targets beat wishes. Use Lifeplans to set the goal, then plan weekly actions like “review spending on Sunday” and “auto-transfer every payday.”",
    topics: ["targets", "weekly_planning"],
  },
  {
    id: "q26",
    question: "How do I plan goals with a partner or family?",
    answer:
      "Agree on one shared outcome and a weekly check-in time. Keep tasks clear and small. Even if the app is personal, you can use Lifeplans to track the shared goal and review progress together weekly.",
    topics: ["goal_planning", "strategy"],
  },
  {
    id: "q27",
    question: "What are good goals for personal development?",
    answer:
      "Good personal development goals improve a skill or habit with measurable weekly practice. Example: “Read 12 books this year” + weekly target “30 minutes/day.” Lifeplans helps by keeping weekly priorities and progress visible.",
    topics: ["habits", "goal_planning"],
  },
  {
    id: "q28",
    question: "How do I create a weekly plan that I can actually complete?",
    answer:
      "Start with fewer tasks than you think you can do, then increase slowly. A good plan is a plan you finish. In Lifeplans, keep 1–3 priorities and limit tasks to what fits your real week.",
    topics: ["weekly_planning", "productivity"],
  },
  {
    id: "q29",
    question: "How do I deal with distractions while working on goals?",
    answer:
      "Design your environment: block apps, remove triggers, schedule focus blocks. Then track whether you followed the plan. In Lifeplans, use planning to write the obstacle (“phone scrolling”) and the counter-plan (“30-minute focus block”).",
    topics: ["productivity", "strategy"],
  },
  {
    id: "q30",
    question: "How do I set goals if I have anxiety or low energy?",
    answer:
      "Make goals smaller and kinder. Use minimum actions and flexible weekly plans. You want momentum, not pressure. Lifeplans works well if you focus on a simple goal, a gentle strategy, and very small next actions.",
    topics: ["motivation", "habits"],
  },
  {
    id: "q31",
    question: "What should I do if my goal is too vague?",
    answer:
      "Turn it into a measurable outcome. “Be healthier” becomes “Walk 30 minutes 4x/week for 6 weeks.” Lifeplans is easiest to use when the goal has a clear finish line and you can track progress weekly.",
    topics: ["goal_planning", "targets"],
  },
  {
    id: "q32",
    question: "How do I keep goals private but still stay accountable?",
    answer:
      "Use private tracking + consistent review. Accountability doesn’t require public sharing; it requires honest feedback. With Lifeplans, you can keep everything private and still track progress and weekly plans.",
    topics: ["goal_planning"],
  },
  {
    id: "q33",
    question: "How do I set goals for building a side project?",
    answer:
      "Define a launch milestone and weekly deliverables (features, pages, outreach). Track progress weekly, not daily feelings. Lifeplans helps by keeping the weekly plan next to the long-term outcome.",
    topics: ["productivity", "targets"],
  },
  {
    id: "q34",
    question: "How do I stop changing goals every week?",
    answer:
      "Keep the goal stable and change only the weekly plan. If you keep switching goals, you never compound progress. In Lifeplans, hold the main goal constant and do a weekly review to adjust tasks without changing direction.",
    topics: ["goal_planning", "weekly_planning"],
  },
  {
    id: "q35",
    question: "How can I use weekly reviews to improve results?",
    answer:
      "Weekly reviews help you learn what works. Review: what got done, what didn’t, why, and what the next plan is. The Weekly Planning history in Lifeplans is meant for this kind of reflection.",
    topics: ["weekly_planning", "productivity"],
  },
  {
    id: "q36",
    question: "What’s a good goal strategy when life gets chaotic?",
    answer:
      "Use a fallback plan: minimum actions, fewer priorities, and time buffers. Strategy is not motivation—it’s a plan for real life. Lifeplans makes it easy to reduce the plan and keep progress visible.",
    topics: ["strategy", "motivation"],
  },
  {
    id: "q37",
    question: "How do I set targets for running a marathon?",
    answer:
      "Use weekly mileage targets, a long run target, and recovery targets. Track progress weekly. In Lifeplans you can set the marathon as the main goal and keep weekly training as priorities and tasks.",
    topics: ["fitness", "targets"],
  },
  {
    id: "q38",
    question: "How do I set targets for learning a language?",
    answer:
      "Track leading indicators: minutes practiced, lessons completed, conversations done. Keep weekly targets realistic. Lifeplans works well with language goals when you plan weekly sessions and track progress honestly.",
    topics: ["study", "habits"],
  },
  {
    id: "q39",
    question: "How do I set goals when I’m depressed?",
    answer:
      "Keep goals extremely small and focus on gentle routines. A goal is to create momentum, not pressure. Lifeplans can support you if you use a very small weekly plan and celebrate consistency.",
    topics: ["habits", "motivation"],
  },
  {
    id: "q40",
    question: "How do I set a target for reading more?",
    answer:
      "Pick a weekly target: pages/day or minutes/day. Then plan it in your week like an appointment. In Lifeplans, set the reading goal, then use weekly planning to schedule the reading sessions.",
    topics: ["habits", "targets"],
  },
  {
    id: "q41",
    question: "How do I prevent goals from becoming overwhelming?",
    answer:
      "Reduce scope, shorten the next planning horizon, and track only what matters. Overwhelm is often a planning problem. Use Lifeplans to keep the goal clear and the weekly plan small.",
    topics: ["goal_planning", "weekly_planning"],
  },
  {
    id: "q42",
    question: "How do I plan weekly goals if my schedule changes a lot?",
    answer:
      "Plan in ‘flex blocks’ and keep a short task list. If your week is uncertain, fewer tasks is better. In Lifeplans, keep 1–2 priorities and a small list of tasks you can move.",
    topics: ["weekly_planning", "productivity"],
  },
  {
    id: "q43",
    question: "How do I set a goal and stick to it for 90 days?",
    answer:
      "Think in 13 weeks: one outcome goal, weekly priorities, and a weekly review. Use Lifeplans to keep progress visible, write strategy for obstacles, and plan weekly actions.",
    topics: ["goal_planning", "weekly_planning"],
  },
  {
    id: "q44",
    question: "How do I set goals that fit my identity?",
    answer:
      "Write goals that reflect who you want to become (identity) and what you will do weekly (process). In Lifeplans, use Strategy to capture your deeper “why,” then plan actions that reinforce that identity.",
    topics: ["strategy", "habits"],
  },
  {
    id: "q45",
    question: "How do I handle setbacks in goal progress?",
    answer:
      "Expect setbacks. The fix is a smaller plan, not quitting. Do a weekly review: what caused the setback, what’s the next best plan, and how to prevent it. Lifeplans is designed for this weekly adjustment loop.",
    topics: ["motivation", "weekly_planning"],
  },
  {
    id: "q46",
    question: "How do I set goals for content creation?",
    answer:
      "Use output targets (posts/week) and input targets (writing sessions/week). Track weekly and review what worked. Lifeplans helps by keeping the weekly plan and progress in one place.",
    topics: ["targets", "productivity"],
  },
  {
    id: "q47",
    question: "How do I stay consistent when traveling?",
    answer:
      "Use a travel plan: minimum habits and flexible tasks. Don’t aim for your normal routine—aim for continuity. In Lifeplans, write obstacles (“travel week”) and the minimum plan (“2 short sessions”).",
    topics: ["habits", "strategy"],
  },
  {
    id: "q48",
    question: "How do I plan weekly goals for a team?",
    answer:
      "Even teams need 1–3 priorities. Make tasks clear and review weekly. If you’re using Lifeplans personally, you can still track the shared priorities and use the history view for review.",
    topics: ["weekly_planning", "productivity"],
  },
  {
    id: "q49",
    question: "How do I turn a big goal into small steps?",
    answer:
      "List 3–5 milestones, then pick the next milestone and plan tasks for the week. In Lifeplans, keep the big goal in Goals and keep the small steps in Weekly Planning.",
    topics: ["goal_planning", "weekly_planning"],
  },
  {
    id: "q50",
    question: "What’s a simple system to use Lifeplans (web + mobile) consistently?",
    answer:
      "Use the same weekly rhythm: (1) set/update weekly priorities, (2) complete tasks, (3) update progress % on your goals, (4) adjust next week. If you do that for 4–8 weeks, you’ll see real results. Goal Planner - Lifeplans is built to make that rhythm simple.",
    topics: ["goal_planning", "weekly_planning"],
  },
];

const topicLabel = (t: Topic) =>
  t
    .split("_")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

const Questions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | "all">("all");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return QUESTIONS.filter((item) => {
      const topicOk = selectedTopic === "all" ? true : item.topics.includes(selectedTopic);
      if (!topicOk) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedTopic]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Questions</h1>
            <p className="text-gray-500">Real-world Q&A on goal setting, planning, and consistency.</p>
          </div>
          <div className="relative w-full md:w-[360px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search questions..."
              className="pl-10 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={selectedTopic === "all" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setSelectedTopic("all")}
          >
            All Topics
          </Button>
          {TOPICS.map((t) => (
            <Button
              key={t}
              type="button"
              variant={selectedTopic === t ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedTopic(t)}
            >
              {topicLabel(t)}
            </Button>
          ))}
        </div>

        <div className="space-y-6">
          {filtered.map((q) => (
            <Card key={q.id} className="border-none shadow-sm rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">{q.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{q.answer}</p>
                <div className="flex flex-wrap gap-2">
                  {q.topics.map((t) => (
                    <Button
                      key={`${q.id}-${t}`}
                      type="button"
                      variant="outline"
                      className="rounded-full h-8 px-3 text-xs"
                      onClick={() => setSelectedTopic(t as Topic)}
                    >
                      {topicLabel(t as Topic)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {!filtered.length && (
            <div className="text-center py-12">
              <p className="text-gray-500">No questions found.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Questions;
