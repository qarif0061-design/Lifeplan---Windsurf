import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const SITE = "https://www.goalplanner.io";

const readPillarSlugs = () => {
  const pillarsPath = path.join(ROOT, "src", "seo", "pillars.ts");
  const raw = fs.readFileSync(pillarsPath, "utf8");

  const slugs = [];
  const re = /\bslug:\s*"([a-z0-9-]+)"/g;
  let m;
  // eslint-disable-next-line no-cond-assign
  while ((m = re.exec(raw))) {
    slugs.push(m[1]);
  }

  return Array.from(new Set(slugs)).sort();
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

  const pillarSlugs = readPillarSlugs();
  const articleUrls = pillarSlugs.map((s) => `${SITE}/articles/${s}`);

  const xml = buildUrlset([...basePages, ...articleUrls]);
  const outPath = path.join(ROOT, "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");
  process.stdout.write(
    `Generated sitemap with ${new Set([...basePages, ...articleUrls]).size} URLs (pillars only) -> public/sitemap.xml\n`,
  );
};

main();
