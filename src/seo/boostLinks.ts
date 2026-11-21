/**
 * Internal-link boost for pages that already rank in Google top 5 (GSC avg position <= 5,
 * Jul 15 - Oct 14 2026 export). Each target gets contextual links from topically related pages.
 * Rendered by <BoostLinks /> inside Layout, so the links are in the prerendered HTML.
 */
export type BoostTarget = { path: string; query: string; anchors: string[]; blurb: string; sources: string[] };

export const BOOST_TARGETS: BoostTarget[] = [
  {
    path: "/articles/smart-sustainable-measurable-attainable",
    query: "smart sustainable measurable attainable",
    anchors: ["SMART sustainable, measurable, attainable goals", "sustainable SMART goals: measurable and attainable", "what SMART sustainable measurable attainable means"],
    blurb: "what each letter means and how to keep a goal sustainable after the first month",
    sources: [
      "/articles/smart-goals-sustainability",
      "/articles/smart-goal-setting-theory",
      "/articles/achievable-goals",
      "/articles/measurable-goals-guide",
      "/articles/relevant-goals",
      "/articles/time-bound-goals",
      "/articles/smarter-goals-meaning",
      "/articles/what-is-a-smart-objective",
      "/articles/smart-goal-steps",
      "/articles/smart-goals-worksheet",
    ],
  },
  {
    path: "/articles/smart-learning-objective",
    query: "smart learning objective",
    anchors: ["SMART learning objective examples", "how to write a SMART learning objective", "SMART learning objectives"],
    blurb: "a simple formula plus examples for lessons, courses and self-study",
    sources: [
      "/articles/smart-targets-for-students-examples",
      "/articles/smart-goals-for-teachers-examples",
      "/articles/smart-goals-for-elementary-teachers",
      "/articles/examples-of-good-and-bad-smart-goals-for-students",
      "/articles/paraprofessional-smart-goals-examples",
      "/articles/smart-goals-for-school-principals-examples",
      "/articles/educational-leadership-smart-goals-examples",
      "/student-planner",
    ],
  },
  {
    path: "/articles/smart-goals-for-training-and-development",
    query: "smart goals for training and development",
    anchors: ["SMART goals for training and development", "training and development SMART goal examples"],
    blurb: "examples for training programs, upskilling and staff development",
    sources: [
      "/articles/professional-development-smart-goals-examples",
      "/articles/examples-of-smart-goals-for-training-managers",
      "/articles/smart-goals-for-training-instructional-design",
      "/articles/smart-goals-for-a-new-job",
      "/articles/smart-goal-setting-examples-for-employees",
      "/articles/setting-goals-for-employees-examples",
      "/articles/achievable-goals",
      "/articles/smart-goals-for-employee-performance",
      "/articles/intellectual-wellness-smart-goals",
      "/articles/smart-attendance-goals-for-employees",
    ],
  },
  {
    path: "/articles/smart-goals-for-adults",
    query: "smart goals for adults",
    anchors: ["SMART goals for adults", "SMART goal examples for adults"],
    blurb: "realistic goal examples that fit around work, family and a busy week",
    sources: [
      "/self-improvement",
      "/articles/smart-goals-examples-for-personal-life",
      "/articles/measurable-personal-goals",
      "/articles/smart-goals-for-personal-development",
      "/articles/smart-goals-examples",
      "/articles/objective-setting-examples",
      "/articles/time-management-smart-goals-guide",
      "/progress-tracker-app",
      "/planner-apps",
      "/habits-app",
    ],
  },
  {
    path: "/articles/measurable-career-goals",
    query: "measurable career goals",
    anchors: ["measurable career goals", "examples of measurable career goals"],
    blurb: "career goals with real numbers, milestones and review dates",
    sources: [
      "/articles/smart-career-goals-for-students",
      "/articles/professional-development-smart-goals-examples",
      "/articles/professional-smart-goal-examples-for-students",
      "/smart-goals",
      "/goal-planner-app",
      "/articles/smart-goals-for-graduate-students",
      "/articles/measurable-goals-for-students",
      "/articles/development-goals-examples",
      "/articles/setting-smart-goals-for-students",
      "/articles/smart-goals-examples-for-university-students",
    ],
  },
  {
    path: "/articles/smart-goals-for-a-company",
    query: "smart goals for a company",
    anchors: ["SMART goals for a company", "company-wide SMART goal examples"],
    blurb: "company-wide goal examples with owners, metrics and quarterly targets",
    sources: [
      "/articles/measurable-business-goals",
      "/articles/smart-goal-setting-examples-for-employees",
      "/articles/smart-goals-for-executive-assistant-examples",
      "/goal-tracking-software",
      "/articles/smart-goals-for-collaboration-examples",
      "/articles/smart-goals-for-agile-transformation",
      "/articles/smart-goals-for-small-business",
      "/articles/smart-goal-for-business-plan",
      "/articles/measurable-team-goals",
    ],
  },
  {
    path: "/articles/smart-goals-examples-for-team-building",
    query: "smart goals examples for team building",
    anchors: ["SMART goals examples for team building", "team building SMART goals"],
    blurb: "team building goals tied to trust, collaboration and measurable outcomes",
    sources: [
      "/articles/measurable-team-goals",
      "/articles/smart-goals-for-collaboration",
      "/articles/smart-goals-for-collaboration-examples",
      "/articles/smart-goals-for-warehouse-managers",
      "/articles/smart-goals-for-operations-managers",
      "/articles/smart-sales-goals",
      "/articles/smart-leadership-goals",
      "/articles/smart-goals-project-managers",
      "/articles/smart-goals-for-project-managers-examples",
      "/articles/smart-goals-for-managers-and-leaders",
    ],
  },
  {
    path: "/articles/smarter-goals-michael-hyatt",
    query: "smarter goals michael hyatt",
    anchors: ["SMARTER goals by Michael Hyatt", "Michael Hyatt's SMARTER goals framework"],
    blurb: "how the extra letters in SMARTER change the way you set goals",
    sources: [
      "/articles/what-is-a-smart-objective",
      "/articles/smart-goal-setting-theory",
      "/articles/smart-goals-complete-guide",
      "/articles/smart-goal-statement",
      "/articles/smart-goal-template",
      "/articles/importance-of-smart-goals",
      "/articles/smart-goals-generator",
      "/articles/smart-goal-steps",
    ],
  },
  {
    path: "/pomodoro-technique",
    query: "pomodoro technique",
    anchors: ["Pomodoro Technique guide", "how the Pomodoro Technique works"],
    blurb: "how 25-minute focus sessions and short breaks beat procrastination",
    sources: [
      "/productivity",
      "/daily-planner-app",
      "/articles/time-blocking-for-productivity",
      "/procrastination",
      "/focus-and-mental-clarity",
      "/articles/time-management-smart-goals-guide",
      "/productivity-app",
      "/articles/short-term-smart-goals-students",
      "/todoist-alternatives",
      "/student-planner",
    ],
  },
  {
    path: "/adhd-planner",
    query: "adhd planner",
    anchors: ["ADHD planner", "free ADHD planner for goals and daily plans"],
    blurb: "a goal and daily planner built for ADHD and neurodivergent minds",
    sources: [
      "/articles/goal-setting-for-adhd",
      "/goal-planner-app",
      "/habit-tracker-app",
      "/apps-to-help-with-daily-routine",
      "/productivity-app",
      "/to-do-list",
      "/goal-planner",
      "/goal-setting",
      "/time-blocking",
      "/structured-daily-planner-app",
    ],
  },
];

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Links (max 5) that a given page should show, pointing at boosted targets. */
export const getBoostLinks = (pathname: string): { href: string; anchor: string; blurb: string }[] => {
  const p = pathname.replace(/\/+$/, "") || "/";
  return BOOST_TARGETS.filter((t) => t.path !== p && t.sources.includes(p))
    .slice(0, 5)
    .map((t) => ({ href: t.path, anchor: t.anchors[hash(p) % t.anchors.length], blurb: t.blurb }));
};
