import { KEYWORDS } from "./keywords";

export type ArticleTopic =
  | "goal_planning"
  | "strategy"
  | "weekly_planning"
  | "targets"
  | "motivation"
  | "habits"
  | "productivity";

export type SeoArticle = {
  slug: string;
  title: string;
  excerpt: string;
  topics: ArticleTopic[];
  body: string;
  keyword: string;
};

const slugify = (input: string): string =>
  input
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");

const toTitle = (keyword: string): string => {
  const cleaned = keyword.trim();
  if (!cleaned) return "";

  const words = cleaned.split(/\s+/g);
  const lower = new Set([
    "to",
    "and",
    "or",
    "for",
    "of",
    "in",
    "on",
    "at",
    "with",
    "a",
    "an",
    "the",
    "by",
    "from",
  ]);

  return words
    .map((w, i) => {
      const lw = w.toLowerCase();
      if (i !== 0 && lower.has(lw)) return lw;
      return lw.length ? lw[0]!.toUpperCase() + lw.slice(1) : lw;
    })
    .join(" ");
};

const guessTopics = (keyword: string): ArticleTopic[] => {
  const k = keyword.toLowerCase();
  const topics = new Set<ArticleTopic>();

  if (/(quote|quotes|affirmation|affirmations|inspirational|inspiring|motivational|motivation)/.test(k)) {
    topics.add("motivation");
  }
  if (/(habit|habits|routine|discipline|consistent|consistency|self improvement|self-improvement|mindset)/.test(k)) {
    topics.add("habits");
  }
  if (/(time|productiv|focus|procrastin|schedule|time blocking|time-blocking)/.test(k)) {
    topics.add("productivity");
  }
  if (/(weekly|week)/.test(k)) {
    topics.add("weekly_planning");
  }
  if (/(goal|goals|achieve|achievement)/.test(k)) {
    topics.add("goal_planning");
    topics.add("targets");
  }
  if (/(strategy|system|framework|plan)/.test(k)) {
    topics.add("strategy");
  }

  if (topics.size === 0) topics.add("productivity");
  return Array.from(topics);
};

const buildBody = (keyword: string) => {
  const title = toTitle(keyword);

  return (
    `${title} is easier when you turn the idea into a small, repeatable system. Use this guide as a simple checklist you can follow inside Lifeplans (Goal Planner) so you’re not relying on mood.\n\n` +
    `## The 3-step system\n` +
    `- Clarify the outcome (what does “done” look like?)\n` +
    `- Pick one next action you can start in 10–20 minutes\n` +
    `- Track it weekly and check in daily\n\n` +
    `## A practical routine you can copy\n` +
    `- 1–3 priorities for today\n` +
    `- One focus block (25–50 minutes)\n` +
    `- A 30-second check-in: what moved forward?\n\n` +
    `## Common mistakes to avoid\n` +
    `- Overplanning instead of starting\n` +
    `- Tracking everything instead of one metric\n` +
    `- Doing too much in one week and burning out\n\n` +
    `## How Lifeplans helps\n` +
    `Use Lifeplans to keep your goals, weekly plan, and progress tracking in one place. The key is consistency: small actions done repeatedly.\n\n` +
    `Keywords: ${keyword}\n`
  );
};

const dedupeSlugs = (keywords: readonly string[]) => {
  const seen = new Map<string, number>();
  return keywords.map((k) => {
    const base = slugify(k);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  });
};

export const GENERATED_ARTICLES: SeoArticle[] = (() => {
  const slugs = dedupeSlugs(KEYWORDS);
  return KEYWORDS.map((keyword, i) => {
    const slug = slugs[i]!;
    const title = toTitle(keyword);
    const excerpt = `A practical guide for: ${keyword}. Use a simple system to plan, focus, and stay consistent.`;

    return {
      slug,
      title,
      excerpt,
      topics: guessTopics(keyword),
      body: buildBody(keyword),
      keyword,
    };
  });
})();

const GENERATED_BY_SLUG = new Map(GENERATED_ARTICLES.map((a) => [a.slug, a] as const));

export const getGeneratedArticleBySlug = (slug: string): SeoArticle | undefined => GENERATED_BY_SLUG.get(slug);
