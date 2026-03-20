import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const SITE = "https://www.goalplanner.io";

const slugify = (input) =>
  String(input ?? "")
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");

const readKeywords = () => {
  const keywordsPath = path.join(ROOT, "src", "seo", "keywords.json");
  const raw = fs.readFileSync(keywordsPath, "utf8");
  const list = JSON.parse(raw);
  if (!Array.isArray(list)) throw new Error("keywords.json must be an array");
  return list.map((k) => String(k).trim()).filter(Boolean);
};

const buildUrlset = (urls) => {
  const unique = Array.from(new Set(urls));
  unique.sort();

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    unique.map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`).join("\n") +
    `\n</urlset>\n`
  );
};

const main = () => {
  const basePages = [
    `${SITE}/`,
    `${SITE}/life-planning`,
    `${SITE}/getting-things-done`,
    `${SITE}/weekly-planning`,
    `${SITE}/time-management`,
    `${SITE}/smart-goals`,
    `${SITE}/motivation`,
    `${SITE}/pricing`,
    `${SITE}/terms`,
    `${SITE}/privacy`,
    `${SITE}/refund`,
    `${SITE}/articles`,
    `${SITE}/questions`,
    `${SITE}/auth`,
    `${SITE}/download`,
  ];

  const keywords = readKeywords();
  const articleUrls = keywords.map((k) => `${SITE}/articles/${slugify(k)}`);

  const xml = buildUrlset([...basePages, ...articleUrls]);
  const outPath = path.join(ROOT, "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");
  process.stdout.write(`Generated sitemap with ${new Set([...basePages, ...articleUrls]).size} URLs -> public/sitemap.xml\n`);
};

main();
