import type { ArticleTopic } from "./articles";
import { KEYWORDS } from "./keywords";

export type FaqItem = { question: string; answer: string };

export type PillarArticle = {
  slug: string;
  primaryKeyword: string;
  title: string;
  excerpt: string;
  topics: ArticleTopic[];
  relatedKeywords: readonly string[];
  body: string;
  faqs: FaqItem[];
  relatedSlugs: readonly string[];
};

const SITE = "https://www.goalplanner.io";

const slugify = (input: string): string =>
  input
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalizeKeyword = (k: string) => k.trim().toLowerCase();

const KW = KEYWORDS.map((k) => k.trim()).filter(Boolean);

const pickKeywords = (patterns: readonly RegExp[], max = 18) => {
  const hits = KW.filter((k) => patterns.some((p) => p.test(normalizeKeyword(k))));
  const unique = Array.from(new Set(hits));
  return unique.slice(0, max);
};

const buildCta = () =>
  `\n\n---\n\n## Try Lifeplans (Goal Planner)\n\nIf you want a simple way to plan your week, track your goals, and stay consistent in 2026, try **Lifeplans**:\n\n- Track goals and daily actions\n- Plan your week in minutes\n- Build consistency without burnout\n\n**Download:** ${SITE}/download\n\n`;

const buildFaqBlock = (faqs: FaqItem[]) => {
  if (!faqs.length) return "";
  const lines = faqs
    .map((f) => `### ${f.question}\n${f.answer}`)
    .join("\n\n");
  return `\n\n## FAQ\n\n${lines}\n`;
};

const buildInternalLinks = (slugs: readonly string[]) => {
  if (!slugs.length) return "";
  const lines = slugs
    .slice(0, 6)
    .map((s) => `- ${SITE}/articles/${s}`)
    .join("\n");
  return `\n\n## Related guides\n\n${lines}\n`;
};

const buildPillarBody = (
  primary: string,
  related: readonly string[],
  relatedSlugs: readonly string[]
) => {
  const rel = related.slice(0, 10);

  return (
    `This guide is built around **${primary}**. It’s a complete, practical system you can use in 2026 whether you’re a student, professional, or working from home.\n\n` +
    `## Quick summary\n` +
    `- Choose 1 outcome\n` +
    `- Pick the next action\n` +
    `- Time-block a focus session\n` +
    `- Track progress weekly\n\n` +
    `## Step-by-step system\n` +
    `### 1) Decide what matters today\n` +
    `Write 1–3 priorities. If everything is a priority, nothing is.\n\n` +
    `### 2) Convert priorities into next actions\n` +
    `A next action is a physical, visible step you can start in under 20 minutes.\n\n` +
    `### 3) Protect focus (time blocking)\n` +
    `Pick one block (25–50 minutes). Put your phone away. Start with the smallest step.\n\n` +
    `### 4) Review weekly\n` +
    `Every week, decide what to keep, stop, and start.\n\n` +
    `## Examples (real-life use cases)\n` +
    `- Students: study blocks + exam revision list\n` +
    `- Busy people: 3 priorities + one deep-work block\n` +
    `- Work from home: boundaries + scheduled breaks\n\n` +
    `## Keywords covered\n` +
    rel.map((k) => `- ${k}`).join("\n") +
    `\n\n` +
    buildInternalLinks(relatedSlugs) +
    buildCta()
  );
};

const PILLAR_DEFS = [
  {
    slug: "time-management-tips-and-strategies-2026",
    primaryKeyword: "time management tips for busy people",
    title: "Time Management Tips for Busy People (2026) – A Practical System",
    topics: ["productivity" as const],
    patterns: [/time management|manage time|schedule|time blocking|time block/],
    relatedSlugs: [
      "beat-procrastination-and-stay-productive",
      "stay-focused-without-distractions",
      "build-a-productive-morning-routine",
      "plan-your-day-step-by-step",
      "organize-daily-tasks-system",
    ],
  },
  {
    slug: "beat-procrastination-and-stay-productive",
    primaryKeyword: "how to avoid procrastination and stay productive",
    title: "How to Avoid Procrastination and Stay Productive (2026 Guide)",
    topics: ["productivity" as const, "habits" as const],
    patterns: [/procrastin|wasting time/],
    relatedSlugs: [
      "stay-productive-without-burnout",
      "stay-focused-without-distractions",
      "time-management-tips-and-strategies-2026",
      "build-discipline-and-consistency",
    ],
  },
  {
    slug: "stay-focused-without-distractions",
    primaryKeyword: "how to focus better without distractions",
    title: "How to Focus Better Without Distractions (Work + Study + WFH)",
    topics: ["productivity" as const],
    patterns: [/focus|distraction|working from home|wfh/],
    relatedSlugs: [
      "time-blocking-for-productivity",
      "organize-your-day-for-success",
      "beat-procrastination-and-stay-productive",
    ],
  },
  {
    slug: "time-blocking-for-productivity",
    primaryKeyword: "how to use time blocking for productivity",
    title: "How to Use Time Blocking for Productivity (Simple Template)",
    topics: ["productivity" as const, "weekly_planning" as const],
    patterns: [/time blocking|time-blocking/],
    relatedSlugs: [
      "time-management-tips-and-strategies-2026",
      "plan-your-day-step-by-step",
      "weekly-planning-system-2026",
    ],
  },
  {
    slug: "build-a-productive-morning-routine",
    primaryKeyword: "how to build a productive morning routine",
    title: "How to Build a Productive Morning Routine (Without Burnout)",
    topics: ["habits" as const, "productivity" as const],
    patterns: [/morning routine|start your day|good morning/],
    relatedSlugs: ["daily-productivity-routine", "stay-productive-without-burnout", "plan-your-day-step-by-step"],
  },
  {
    slug: "daily-productivity-routine",
    primaryKeyword: "daily productivity routine for success",
    title: "Daily Productivity Routine for Success (2026) – Simple Daily System",
    topics: ["productivity" as const, "habits" as const],
    patterns: [/daily productivity routine|maximize productivity|productive daily|daily routine/],
    relatedSlugs: ["plan-your-day-step-by-step", "build-a-productive-morning-routine", "stay-productive-without-burnout"],
  },
  {
    slug: "plan-your-day-step-by-step",
    primaryKeyword: "how to plan your day effectively step by step",
    title: "How to Plan Your Day Effectively (Step-by-Step in 2026)",
    topics: ["productivity" as const],
    patterns: [/plan your day|daily schedule|organize your day/],
    relatedSlugs: ["organize-daily-tasks-system", "time-blocking-for-productivity", "daily-productivity-routine"],
  },
  {
    slug: "organize-daily-tasks-system",
    primaryKeyword: "best ways to organize your daily tasks",
    title: "Best Ways to Organize Your Daily Tasks (A Simple System)",
    topics: ["productivity" as const, "strategy" as const],
    patterns: [/organize your daily tasks|multiple tasks|daily tasks/],
    relatedSlugs: ["plan-your-day-step-by-step", "daily-planner-guide-2026", "weekly-planning-system-2026"],
  },
  {
    slug: "daily-planner-guide-2026",
    primaryKeyword: "how to use a daily planner effectively",
    title: "How to Use a Daily Planner Effectively (Beginner Guide 2026)",
    topics: ["weekly_planning" as const, "productivity" as const],
    patterns: [/daily planner|planner setup|planner ideas|to-do list/],
    relatedSlugs: ["digital-planner-vs-paper", "weekly-planning-system-2026", "habit-tracking-with-a-planner-app"],
  },
  {
    slug: "digital-planner-vs-paper",
    primaryKeyword: "how to use digital planners for productivity",
    title: "Digital Planner vs Paper Planner (What Works Best in 2026?)",
    topics: ["productivity" as const, "strategy" as const],
    patterns: [/digital planner|organize tasks digitally|mobile app/],
    relatedSlugs: ["daily-planner-guide-2026", "weekly-planning-system-2026", "habit-tracking-with-a-planner-app"],
  },
  {
    slug: "weekly-planning-system-2026",
    primaryKeyword: "how to create a weekly planning system",
    title: "Weekly Planning System (2026) – Plan Your Week for Maximum Productivity",
    topics: ["weekly_planning" as const, "productivity" as const],
    patterns: [/plan your week|weekly planning|weekly planning system/],
    relatedSlugs: ["daily-planner-guide-2026", "time-blocking-for-productivity", "goal-planning-system-for-beginners"],
  },
  {
    slug: "habit-tracking-with-a-planner-app",
    primaryKeyword: "how to track habits using a planner app",
    title: "How to Track Habits Using a Planner App (Simple Daily Method)",
    topics: ["habits" as const, "productivity" as const],
    patterns: [/track habits|habits using a planner app|habit/],
    relatedSlugs: ["daily-planner-guide-2026", "build-discipline-and-consistency", "goal-tracking-system"],
  },
  {
    slug: "goal-planning-system-for-beginners",
    primaryKeyword: "best goal planning system for beginners",
    title: "Best Goal Planning System for Beginners (2026) – Step-by-Step",
    topics: ["goal_planning" as const, "strategy" as const, "targets" as const],
    patterns: [/goal planning system|goal setting strategies|set realistic goals|goal setting/],
    relatedSlugs: ["break-big-goals-into-small-steps", "goal-tracking-system", "build-discipline-and-consistency"],
  },
  {
    slug: "break-big-goals-into-small-steps",
    primaryKeyword: "how to break big goals into small steps",
    title: "How to Break Big Goals Into Small Steps (A Practical Framework)",
    topics: ["goal_planning" as const, "targets" as const],
    patterns: [/break big goals|achieve success step by step|dreams faster/],
    relatedSlugs: ["goal-planning-system-for-beginners", "goal-tracking-system", "daily-goal-tracking-for-productivity"],
  },
  {
    slug: "goal-tracking-system",
    primaryKeyword: "how to track your goals effectively",
    title: "How to Track Your Goals Effectively (Daily + Weekly System)",
    topics: ["targets" as const, "goal_planning" as const, "productivity" as const],
    patterns: [/track your goals|track progress|goal tracking/],
    relatedSlugs: ["daily-goal-tracking-for-productivity", "goal-planning-system-for-beginners", "habit-tracking-with-a-planner-app"],
  },
  {
    slug: "daily-goal-tracking-for-productivity",
    primaryKeyword: "daily goal tracking system for productivity",
    title: "Daily Goal Tracking System for Productivity (Simple 2026 Workflow)",
    topics: ["productivity" as const, "targets" as const],
    patterns: [/daily goal tracking|track progress daily/],
    relatedSlugs: ["goal-tracking-system", "organize-daily-tasks-system", "weekly-planning-system-2026"],
  },
  {
    slug: "build-discipline-and-consistency",
    primaryKeyword: "how to build discipline to achieve goals",
    title: "How to Build Discipline to Achieve Goals (Consistency in 2026)",
    topics: ["habits" as const, "motivation" as const, "goal_planning" as const],
    patterns: [/discipline|consistent|consistency|committed/],
    relatedSlugs: ["goal-planning-system-for-beginners", "habit-tracking-with-a-planner-app", "fix-lack-of-motivation"],
  },
  {
    slug: "fix-lack-of-motivation",
    primaryKeyword: "how to fix lack of motivation quickly",
    title: "How to Fix Lack of Motivation Quickly (Practical Reset Plan)",
    topics: ["motivation" as const, "habits" as const],
    patterns: [/lack of motivation|unmotivated|get motivated again|without motivation/],
    relatedSlugs: ["build-discipline-and-consistency", "restart-your-life-and-stay-focused", "stay-productive-without-burnout"],
  },
  {
    slug: "restart-your-life-and-stay-focused",
    primaryKeyword: "how to restart your life and stay focused",
    title: "How to Restart Your Life and Stay Focused (2026 Step-by-Step)",
    topics: ["strategy" as const, "habits" as const, "productivity" as const],
    patterns: [/restart your life|fix your life|get your life organized|organize your life/],
    relatedSlugs: ["organize-your-day-for-success", "build-a-better-routine-from-scratch", "fix-lack-of-motivation"],
  },
  {
    slug: "build-a-better-routine-from-scratch",
    primaryKeyword: "how to build a better routine from scratch",
    title: "How to Build a Better Routine From Scratch (Without Overthinking)",
    topics: ["habits" as const, "productivity" as const],
    patterns: [/build a better routine|daily routine|routine from scratch/],
    relatedSlugs: ["daily-productivity-routine", "build-discipline-and-consistency", "restart-your-life-and-stay-focused"],
  },
  {
    slug: "stay-productive-without-burnout",
    primaryKeyword: "how to stay productive without burnout",
    title: "How to Stay Productive Without Burnout (Sustainable System)",
    topics: ["productivity" as const, "habits" as const],
    patterns: [/without burnout|burnout/],
    relatedSlugs: ["daily-productivity-routine", "time-management-tips-and-strategies-2026", "fix-lack-of-motivation"],
  },
  {
    slug: "mindset-shifts-for-success",
    primaryKeyword: "mindset shifts to improve your life",
    title: "Mindset Shifts to Improve Your Life (2026) – Practical Exercises",
    topics: ["habits" as const, "motivation" as const],
    patterns: [/mindset|negative thinking|reprogram|winning mindset|mental strength/],
    relatedSlugs: ["daily-affirmations-for-mindset-growth", "overcome-fear-and-anxiety", "build-discipline-and-consistency"],
  },
  {
    slug: "daily-affirmations-for-mindset-growth",
    primaryKeyword: "daily affirmations for mindset growth",
    title: "Daily Affirmations for Mindset Growth (2026) – Examples + Routine",
    topics: ["motivation" as const, "habits" as const],
    patterns: [/affirmations|positive mindset|boost confidence/],
    relatedSlugs: ["mindset-shifts-for-success", "overcome-fear-and-anxiety", "fix-lack-of-motivation"],
  },
  {
    slug: "overcome-fear-and-anxiety",
    primaryKeyword: "quotes to overcome fear and anxiety",
    title: "How to Overcome Fear and Anxiety (Tools + Quotes + Routine)",
    topics: ["motivation" as const, "habits" as const],
    patterns: [/fear|anxiety/],
    relatedSlugs: ["mindset-shifts-for-success", "daily-affirmations-for-mindset-growth", "build-discipline-and-consistency"],
  },
  {
    slug: "best-motivational-quotes-2026",
    primaryKeyword: "best quotes for daily motivation",
    title: "Best Motivational Quotes for Daily Motivation (2026) + How to Use Them",
    topics: ["motivation" as const],
    patterns: [/quotes|quote|inspirational|inspiring|motivational/],
    relatedSlugs: ["quotes-for-success-and-determination", "quotes-for-discipline-and-hard-work", "quotes-for-tough-times"],
  },
  {
    slug: "quotes-for-success-and-determination",
    primaryKeyword: "quotes about success and determination",
    title: "Quotes About Success and Determination (Stay Focused in 2026)",
    topics: ["motivation" as const],
    patterns: [/success|determination|achieving goals/],
    relatedSlugs: ["best-motivational-quotes-2026", "quotes-for-discipline-and-hard-work", "build-discipline-and-consistency"],
  },
  {
    slug: "quotes-for-discipline-and-hard-work",
    primaryKeyword: "quotes about discipline and hard work",
    title: "Quotes About Discipline and Hard Work (Use These to Build Consistency)",
    topics: ["motivation" as const, "habits" as const],
    patterns: [/discipline|hard work|persistence/],
    relatedSlugs: ["best-motivational-quotes-2026", "build-discipline-and-consistency", "quotes-for-tough-times"],
  },
  {
    slug: "quotes-for-tough-times",
    primaryKeyword: "quotes to stay strong during tough times",
    title: "Quotes to Stay Strong During Tough Times (Mental Strength Toolkit)",
    topics: ["motivation" as const],
    patterns: [/tough times|hard times|mental strength/],
    relatedSlugs: ["best-motivational-quotes-2026", "overcome-fear-and-anxiety", "fix-lack-of-motivation"],
  },
  {
    slug: "motivational-speakers-and-influencers",
    primaryKeyword: "best motivational talks by international speakers",
    title: "Motivational Speakers to Follow (2026): Talks, Lessons, and Takeaways",
    topics: ["motivation" as const],
    patterns: [/tony robbins|nick vujicic|les brown|sandeep maheshwari|eric thomas|vivek bindra|influencers/],
    relatedSlugs: ["best-motivational-quotes-2026", "mindset-shifts-for-success", "goal-planning-system-for-beginners"],
  },
  {
    slug: "how-to-create-a-daily-schedule-that-works-2026",
    primaryKeyword: "how to create a daily schedule that works",
    title: "How to Create a Daily Schedule That Works (2026) – Simple Template",
    topics: ["productivity" as const, "weekly_planning" as const],
    patterns: [/daily schedule|daily planning|schedule that works|daily planner/],
    relatedSlugs: ["plan-your-day-step-by-step", "time-blocking-for-productivity", "weekly-planning-system-2026"],
  },
  {
    slug: "best-productivity-tips-for-daily-life-2026",
    primaryKeyword: "best productivity tips for daily life",
    title: "Best Productivity Tips for Daily Life (2026) – Simple, Sustainable",
    topics: ["productivity" as const, "habits" as const],
    patterns: [/productivity tips|productivity hacks|save time|get things done/],
    relatedSlugs: ["daily-productivity-routine", "stay-productive-without-burnout", "organize-daily-tasks-system"],
  },
  {
    slug: "how-to-stay-productive-while-working-from-home",
    primaryKeyword: "how to stay focused while working from home",
    title: "How to Stay Productive While Working From Home (Focus + Boundaries)",
    topics: ["productivity" as const, "strategy" as const],
    patterns: [/working from home|work from home|wfh|remote work/],
    relatedSlugs: ["stay-focused-without-distractions", "time-management-tips-and-strategies-2026", "stay-productive-without-burnout"],
  },
  {
    slug: "simple-productivity-system-for-beginners-2026",
    primaryKeyword: "simple productivity system for beginners",
    title: "Simple Productivity System for Beginners (2026) – Start in 10 Minutes",
    topics: ["productivity" as const, "strategy" as const],
    patterns: [/system for beginners|beginner productivity|productivity system/],
    relatedSlugs: ["organize-daily-tasks-system", "goal-planning-system-for-beginners", "weekly-planning-system-2026"],
  },
  {
    slug: "how-to-manage-multiple-tasks-efficiently",
    primaryKeyword: "how to manage multiple tasks efficiently",
    title: "How to Manage Multiple Tasks Efficiently (Without Feeling Overwhelmed)",
    topics: ["productivity" as const, "strategy" as const],
    patterns: [/multiple tasks|too many tasks|overwhelmed|overwhelm/],
    relatedSlugs: ["organize-daily-tasks-system", "plan-your-day-step-by-step", "stay-focused-without-distractions"],
  },
  {
    slug: "how-to-prioritize-tasks-and-goals",
    primaryKeyword: "how to prioritize tasks effectively",
    title: "How to Prioritize Tasks and Goals (2026) – A Clear Method",
    topics: ["strategy" as const, "productivity" as const],
    patterns: [/prioritize|prioritise|what to do first|most important task/],
    relatedSlugs: ["how-to-prioritize-goals", "organize-daily-tasks-system", "weekly-planning-system-2026"],
  },
  {
    slug: "deep-work-focus-system-2026",
    primaryKeyword: "how to gain focus for deep work",
    title: "Deep Work Focus System (2026) – Distraction-Proof Routine",
    topics: ["productivity" as const],
    patterns: [/deep work|flow state|concentration|focus session/],
    relatedSlugs: ["stay-focused-without-distractions", "time-blocking-for-productivity", "reduce-distractions"],
  },
  {
    slug: "pomodoro-technique-for-productivity",
    primaryKeyword: "how to use pomodoro technique for productivity",
    title: "Pomodoro Technique for Productivity (25/5 System + Template)",
    topics: ["productivity" as const, "habits" as const],
    patterns: [/pomodoro|25\s*minutes|25\/5/],
    relatedSlugs: ["deep-work-focus-system-2026", "time-blocking-for-productivity", "beat-procrastination-and-stay-productive"],
  },
  {
    slug: "how-to-stop-procrastinating-step-by-step-2026",
    primaryKeyword: "how to stop procrastinating step by step",
    title: "How to Stop Procrastinating Step-by-Step (2026) – Start Today",
    topics: ["productivity" as const, "habits" as const],
    patterns: [/stop procrastinating|beat procrastination|procrastinat/],
    relatedSlugs: ["beat-procrastination-and-stay-productive", "build-discipline-and-consistency", "stay-productive-without-burnout"],
  },
  {
    slug: "how-to-build-a-consistent-daily-routine",
    primaryKeyword: "daily routine to maximize productivity",
    title: "How to Build a Consistent Daily Routine (Max Productivity Without Burnout)",
    topics: ["habits" as const, "productivity" as const],
    patterns: [/daily routine|maximize productivity|consistent routine|daily habits/],
    relatedSlugs: ["daily-productivity-routine", "build-a-better-routine-from-scratch", "build-a-productive-morning-routine"],
  },
  {
    slug: "evening-routine-for-success-2026",
    primaryKeyword: "evening routine for success",
    title: "Evening Routine for Success (2026) – Reset, Plan, Sleep Better",
    topics: ["habits" as const, "motivation" as const],
    patterns: [/evening routine|night routine|sleep better|before bed/],
    relatedSlugs: ["build-a-productive-morning-routine", "weekly-review", "how-to-set-goals-without-burnout"],
  },
  {
    slug: "weekly-review-checklist-2026",
    primaryKeyword: "weekly review checklist for goals",
    title: "Weekly Review Checklist (2026) – Fix Your Week in 20 Minutes",
    topics: ["weekly_planning" as const, "strategy" as const, "productivity" as const],
    patterns: [/weekly review|review your week|weekly reflection|weekly reset/],
    relatedSlugs: ["weekly-review", "weekly-planning-system-2026", "goal-review-questions"],
  },
  {
    slug: "weekly-planning-template-2026",
    primaryKeyword: "weekly planning template for beginners",
    title: "Weekly Planning Template (2026) – Copy/Paste Plan for Any Goal",
    topics: ["weekly_planning" as const, "productivity" as const],
    patterns: [/weekly planning template|plan your week template|weekly planner template/],
    relatedSlugs: ["weekly-planning-template-lifeplans", "weekly-planning-system-2026", "how-to-plan-your-goals-in-10-minutes"],
  },
  {
    slug: "smart-goals-template-and-examples-2026",
    primaryKeyword: "smart goals template and examples",
    title: "SMART Goals Template and Examples (2026) – Copy/Paste + Real Examples",
    topics: ["goal_planning" as const, "targets" as const],
    patterns: [/smart goals|s\.m\.a\.r\.t|specific measurable achievable relevant time/],
    relatedSlugs: ["smart-goals-examples", "goal-planning-checklist", "goal-setting-mistakes"],
  },
  {
    slug: "how-to-set-goals-and-actually-achieve-them",
    primaryKeyword: "how to set goals and actually achieve them",
    title: "How to Set Goals and Actually Achieve Them (2026) – Full System",
    topics: ["goal_planning" as const, "strategy" as const, "targets" as const],
    patterns: [/set goals|achieve your goals|goal setting|goal planner/],
    relatedSlugs: ["goal-planning-system-for-beginners", "goal-tracking-system", "weekly-planning-system-2026"],
  },
  {
    slug: "goal-setting-checklist-for-beginners",
    primaryKeyword: "goal setting checklist for beginners",
    title: "Goal Setting Checklist for Beginners (2026) – Step-by-Step",
    topics: ["goal_planning" as const, "strategy" as const],
    patterns: [/goal setting checklist|goal planning checklist|set goals step by step/],
    relatedSlugs: ["goal-planning-checklist", "goal-setting-for-beginners-step-by-step", "how-to-set-goals-beginners-guide"],
  },
  {
    slug: "goal-tracker-app-how-to-track-progress",
    primaryKeyword: "best way to track goal progress",
    title: "Best Way to Track Goal Progress (App + Simple Metrics System)",
    topics: ["targets" as const, "productivity" as const],
    patterns: [/track progress|goal tracker|goal tracking|progress tracking|metrics/],
    relatedSlugs: ["track-progress-like-a-pro", "goal-tracking-system", "goal-metrics-examples"],
  },
  {
    slug: "habit-tracker-system-that-works-2026",
    primaryKeyword: "habit tracker system that works",
    title: "Habit Tracker System That Works (2026) – Build Streaks Without Burnout",
    topics: ["habits" as const, "productivity" as const],
    patterns: [/habit tracker|track habits|habit tracking|streak/],
    relatedSlugs: ["habit-tracking-with-a-planner-app", "build-discipline-and-consistency", "how-to-build-a-daily-check-in-habit"],
  },
  {
    slug: "how-to-build-good-habits-step-by-step",
    primaryKeyword: "how to build good habits step by step",
    title: "How to Build Good Habits Step-by-Step (2026) – Tiny Habits System",
    topics: ["habits" as const, "motivation" as const],
    patterns: [/build habits|good habits|habit building|habit goals/],
    relatedSlugs: ["goal-setting-vs-habit-building", "build-consistency", "build-discipline-and-consistency"],
  },
  {
    slug: "how-to-stay-motivated-and-consistent",
    primaryKeyword: "how to stay motivated and consistent",
    title: "How to Stay Motivated and Consistent (2026) – Systems Over Mood",
    topics: ["motivation" as const, "habits" as const, "strategy" as const],
    patterns: [/stay motivated|motivation strategies|motivated|consistency/],
    relatedSlugs: ["how-to-stay-motivated", "build-consistency", "build-discipline-and-consistency"],
  },
  {
    slug: "self-improvement-plan-2026",
    primaryKeyword: "self improvement plan for beginners",
    title: "Self Improvement Plan for Beginners (2026) – 30-Day Reset",
    topics: ["habits" as const, "strategy" as const],
    patterns: [/self improvement|self-improvement|personal development|personal growth/],
    relatedSlugs: ["mindset-shifts-for-success", "build-a-better-routine-from-scratch", "goal-planning-system-for-beginners"],
  },
  {
    slug: "growth-mindset-exercises-2026",
    primaryKeyword: "growth mindset exercises",
    title: "Growth Mindset Exercises (2026) – Daily Practice for Resilience",
    topics: ["habits" as const, "motivation" as const],
    patterns: [/growth mindset|fixed mindset|carol dweck|mindset exercises/],
    relatedSlugs: ["mindset-shifts-for-success", "daily-affirmations-for-mindset-growth", "overcome-fear-and-anxiety"],
  },
  {
    slug: "how-to-get-things-done-system-2026",
    primaryKeyword: "how to get things done system",
    title: "How to Get Things Done (GTD) System (2026) – Simple Setup",
    topics: ["strategy" as const, "productivity" as const],
    patterns: [/get things done|gtd|next action|inbox zero|capture system/],
    relatedSlugs: ["organize-daily-tasks-system", "weekly-review-checklist-2026", "how-to-prioritize-tasks-and-goals"],
  },
  {
    slug: "inbox-zero-and-task-capture-system",
    primaryKeyword: "inbox zero and task capture system",
    title: "Inbox Zero + Task Capture System (2026) – Reduce Overwhelm Fast",
    topics: ["strategy" as const, "productivity" as const],
    patterns: [/inbox zero|capture tasks|capture system|brain dump/],
    relatedSlugs: ["how-to-get-things-done-system-2026", "organize-daily-tasks-system", "how-to-manage-multiple-tasks-efficiently"],
  },
  {
    slug: "how-to-create-a-goal-roadmap-2026",
    primaryKeyword: "how to create a goal roadmap",
    title: "How to Create a Goal Roadmap (2026) – Milestones + Weekly Targets",
    topics: ["targets" as const, "goal_planning" as const],
    patterns: [/goal roadmap|milestones|roadmap|12-week|quarterly/],
    relatedSlugs: ["how-to-create-a-goal-roadmap", "how-to-break-down-big-goals", "how-to-break-down-big-goals-into-weekly-targets"],
  },
  {
    slug: "quarterly-planning-system-2026",
    primaryKeyword: "quarterly planning system",
    title: "Quarterly Planning System (2026) – Plan 12 Weeks Like a Pro",
    topics: ["goal_planning" as const, "weekly_planning" as const, "strategy" as const],
    patterns: [/quarterly planning|12 week|12-week|quarter goals|quarterly goals/],
    relatedSlugs: ["how-to-set-goals-for-2026", "how-to-create-a-goal-roadmap-2026", "weekly-planning-system-2026"],
  },
] as const;

const buildFaqs = (primary: string): FaqItem[] => [
  {
    question: `How long does it take to see results with ${primary}?`,
    answer:
      "Most people notice progress within 7–14 days if they keep the system small: one focus block per day, one weekly review, and simple tracking.",
  },
  {
    question: "What’s the easiest first step?",
    answer:
      "Pick one priority and define one next action you can start in 10–20 minutes. Then schedule a single focus block today.",
  },
  {
    question: "How do I stay consistent when I’m busy?",
    answer:
      "Use a minimum baseline (e.g., 10 minutes) and track streaks. Consistency beats intensity.",
  },
  {
    question: "How does Lifeplans help?",
    answer:
      `Lifeplans helps you plan your week, track goals, and review progress in one place. Start here: ${SITE}/download`,
  },
];

export const PILLARS: PillarArticle[] = PILLAR_DEFS.map((d) => {
  const relatedKeywords = pickKeywords(d.patterns, 18);

  const excerpt = `A complete 2026 guide for: ${d.primaryKeyword}. Step-by-step system, examples, FAQs, and a simple way to track progress.`;

  const faqs = buildFaqs(d.primaryKeyword);
  const body =
    `# ${d.title}\n\n` +
    buildPillarBody(d.primaryKeyword, relatedKeywords, d.relatedSlugs) +
    buildFaqBlock(faqs);

  return {
    slug: d.slug,
    primaryKeyword: d.primaryKeyword,
    title: d.title,
    excerpt,
    topics: Array.from(new Set(d.topics)),
    relatedKeywords,
    body,
    faqs,
    relatedSlugs: d.relatedSlugs,
  };
});

const BY_SLUG = new Map(PILLARS.map((p) => [p.slug, p] as const));

export const getPillarBySlug = (slug: string): PillarArticle | undefined => BY_SLUG.get(slug);

export const getPillarForKeyword = (keyword: string): PillarArticle | undefined => {
  const k = normalizeKeyword(keyword);
  const match = PILLARS.find((p) => normalizeKeyword(p.primaryKeyword) === k);
  if (match) return match;

  return PILLARS.find((p) => p.relatedKeywords.some((rk) => normalizeKeyword(rk) === k));
};

export const PILLAR_SLUGS = PILLARS.map((p) => p.slug);

export const getPillarUrl = (slug: string) => `${SITE}/articles/${slug}`;
