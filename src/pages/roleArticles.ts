const SITE = "https://goalplanner.io";

export type RoleArticle = {
  slug: string;
  title: string;
  intro: string;
  stakes: string[];
  examples: { goal: string; why: string }[];
  kpis: { kpi: string; example: string }[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

const buildRoleBody = (r: RoleArticle): string => {
  const exampleLines = r.examples
    .map((e, i) => {
      const marker = `${i + 1}. **${e.goal}**`;
      return e.why ? `- ${marker} — ${e.why}` : `- ${marker}`;
    })
    .join("\n");

  const kpiLines = r.kpis
    .map((k) => `- **${k.kpi}**: ${k.example}`)
    .join("\n");

  const faqLines = r.faqs
    .map((f) => `### ${f.question}\n${f.answer}`)
    .join("\n\n");

  const relatedLines = r.related
    .slice(0, 6)
    .map((s) => `- ${SITE}/articles/${s}`)
    .join("\n");

  return (
    `${r.intro}\n\n` +
    `## Why SMART goals matter for ${r.title.toLowerCase()}\n\n` +
    r.stakes.map((s) => `- ${s}`).join("\n") +
    `\n\n` +
    `A handful of clear SMART goals will outperform a long list of vague intentions, no matter how full your schedule is. Keep your list short — start with 1–3 goals for the quarter — and write one next action for each.\n\n` +
    `## ${r.title}: SMART goal examples\n\n` +
    exampleLines +
    `\n\n` +
    `Use these as templates, not scripts. Replace the numbers with your own targets so each goal is genuinely ${r.slug.replace(/-/g, " ")} — specific to your current workload, timeline, and capacity.\n\n` +
    `## How to measure progress\n\n` +
    kpiLines +
    `\n\n` +
    `Pick one KPI per goal and check it weekly. If a metric moves, keep going. If it doesn't move for two weeks, change the approach before you change the goal.\n\n` +
    `## FAQ\n\n` +
    faqLines +
    `\n\n` +
    `## Try LIFEPLANS (Goal Planner)\n\n` +
    `LIFEPLANS turns a single SMART goal into a weekly plan: set the outcome, break it into weekly priorities, schedule focus blocks, and track daily check-ins. **Download:** ${SITE}/download\n\n` +
    `## Related guides\n\n` +
    relatedLines +
    `\n`
  );
};

export const ROLE_ARTICLES: Record<string, { title: string; body: string }> = {};

const registerRoles = (roles: RoleArticle[]) => {
  for (const r of roles) {
    ROLE_ARTICLES[r.slug] = { title: r.title, body: buildRoleBody(r) };
  }
};

import { ROLE_DATA } from "./roleArticlesData";
registerRoles(ROLE_DATA as RoleArticle[]);