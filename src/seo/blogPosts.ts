/**
 * Markdown blog posts.
 * Add a post: create src/content/blog/<slug>.md with frontmatter:
 *   ---
 *   title: "Post title"
 *   excerpt: "One-line summary for the /articles listing"
 *   date: 2026-10-26
 *   topics: productivity, motivation
 *   ---
 *   Markdown body...
 * It is served at /articles/<slug>, listed on /articles and prerendered + added to the sitemap.
 * Posts with a future date are hidden until that date at build time (enables scheduled posts).
 */
export type BlogPost = { slug: string; title: string; excerpt: string; date: string; topics: string[]; body: string };

const files = import.meta.glob("../content/blog/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

const parse = (path: string, raw: string): BlogPost => {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  if (m) for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return {
    slug,
    title: meta.title ?? slug,
    excerpt: meta.excerpt ?? "",
    date: meta.date ?? "",
    topics: (meta.topics ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    body: (m ? m[2] : raw).trim(),
  };
};

const today = new Date().toISOString().slice(0, 10);

export const BLOG_POSTS: BlogPost[] = Object.entries(files)
  .map(([p, raw]) => parse(p, raw))
  .filter((p) => !p.date || p.date <= today)
  .sort((a, b) => b.date.localeCompare(a.date));

const BY_SLUG = new Map(BLOG_POSTS.map((p) => [p.slug, p] as const));
export const getBlogPost = (slug: string) => BY_SLUG.get(slug);
