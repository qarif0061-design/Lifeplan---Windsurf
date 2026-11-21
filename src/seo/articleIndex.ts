import { getGeneratedArticleBySlug } from "./articles";
import { PILLARS, getPillarBySlug, getPillarForKeyword, type FaqItem, type PillarArticle } from "./pillars";
import { CONTENT } from "@/pages/articleContent";
import { BLOG_POSTS, getBlogPost } from "./blogPosts";
import noindexPaths from "./noindex-paths.json";

export const SITE_URL = "https://goalplanner.io";

/** Author shown on every article (byline + JSON-LD). */
export const ARTICLE_AUTHOR = {
  name: "Lifeplans Editorial Team",
  url: `${SITE_URL}/about#editorial-team`,
};

/** Dates shown on articles. Published = when the article set went live; updated = last content revision. */
export const ARTICLE_DATES = {
  published: "2026-06-05",
  updated: "2026-10-24",
};

const NOINDEX = new Set<string>(noindexPaths as string[]);


/**
 * Improved <title>/H1 for articles that already rank in Google top 5 (approved by the owner, Nov 2026).
 * URLs and bodies are unchanged; each title keeps the page's main ranking query.
 */
const TITLE_OVERRIDES: Record<string, string> = {
  "smart-sustainable-measurable-attainable": "SMART Sustainable Measurable Attainable Goals: Meaning & Examples (2026)",
  "smart-learning-objective": "SMART Learning Objective: Examples & Simple Template (2026)",
  "smart-goals-for-training-and-development": "SMART Goals for Training and Development: 2026 Examples",
  "smart-goals-for-adults": "SMART Goals for Adults: Examples & Tips (2026)",
  "measurable-career-goals": "Measurable Career Goals: Examples & How to Track Them",
  "smart-goals-for-a-company": "SMART Goals for a Company: Company-Wide Examples",
  "smart-goals-examples-for-team-building": "SMART Goals Examples for Team Building (2026)",
  "smarter-goals-michael-hyatt": "SMARTER Goals by Michael Hyatt: Framework & Examples (2026)",
};
const withTitle = <T extends { title: string }>(slug: string, a: T): T =>
  TITLE_OVERRIDES[slug] ? { ...a, title: TITLE_OVERRIDES[slug] } : a;

export const isNoindexPath = (path: string) => NOINDEX.has(path.replace(/\/+$/, "") || "/");

export type ResolvedArticle = {
  slug: string;
  title: string;
  body: string;
  kind: "pillar" | "static" | "generated";
  faqs?: FaqItem[];
  relatedSlugs: string[];
  /** Pillar that a thin generated keyword page supports (generated pages are noindex). */
  supportingPillar?: PillarArticle;
  canonicalPath: string;
  noIndex: boolean;
};

export const resolveArticle = (slug: string | undefined): ResolvedArticle | undefined => {
  if (!slug) return undefined;
  const r = resolveArticleRaw(slug);
  return r ? withTitle(slug, r) : undefined;
};

const resolveArticleRaw = (slug: string): ResolvedArticle | undefined => {
  const pillar = getPillarBySlug(slug);
  if (pillar) {
    return {
      slug,
      title: pillar.title,
      body: pillar.body,
      kind: "pillar",
      faqs: pillar.faqs,
      relatedSlugs: [...pillar.relatedSlugs],
      canonicalPath: `/articles/${slug}`,
      noIndex: isNoindexPath(`/articles/${slug}`),
    };
  }
  const post = getBlogPost(slug);
  if (post) {
    return {
      slug,
      title: post.title,
      body: post.body,
      kind: "static",
      relatedSlugs: [],
      canonicalPath: `/articles/${slug}`,
      noIndex: isNoindexPath(`/articles/${slug}`),
    };
  }
  const stat = CONTENT[slug];
  if (stat) {
    return {
      slug,
      title: stat.title,
      body: stat.body,
      kind: "static",
      relatedSlugs: [],
      canonicalPath: `/articles/${slug}`,
      noIndex: isNoindexPath(`/articles/${slug}`),
    };
  }
  const gen = getGeneratedArticleBySlug(slug);
  if (gen) {
    const supportingPillar = getPillarForKeyword(gen.keyword);
    return {
      slug,
      title: gen.title,
      body: gen.body,
      kind: "generated",
      relatedSlugs: [],
      supportingPillar,
      canonicalPath: supportingPillar ? `/articles/${supportingPillar.slug}` : `/articles/${slug}`,
      noIndex: true,
    };
  }
  return undefined;
};

/** Title of any known article, for internal link anchor text. */
export const getArticleTitle = (slug: string): string | undefined =>
  TITLE_OVERRIDES[slug] ??
  getPillarBySlug(slug)?.title ?? getBlogPost(slug)?.title ?? CONTENT[slug]?.title;

/** All articles that get a prerendered HTML page (pillars + hand-written + role articles). */
export const listArticleEntries = (): { slug: string; title: string; noIndex: boolean }[] => {
  const seen = new Set<string>();
  const out: { slug: string; title: string; noIndex: boolean }[] = [];
  for (const p of PILLARS) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    out.push({ slug: p.slug, title: TITLE_OVERRIDES[p.slug] ?? p.title, noIndex: isNoindexPath(`/articles/${p.slug}`) });
  }
  for (const p of BLOG_POSTS) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    out.push({ slug: p.slug, title: TITLE_OVERRIDES[p.slug] ?? p.title, noIndex: isNoindexPath(`/articles/${p.slug}`) });
  }
  for (const [slug, a] of Object.entries(CONTENT)) {
    if (seen.has(slug)) continue;
    seen.add(slug);
    out.push({ slug, title: TITLE_OVERRIDES[slug] ?? a.title, noIndex: isNoindexPath(`/articles/${slug}`) });
  }
  return out;
};
