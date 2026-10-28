import React from "react";
import { Link } from "react-router-dom";
import { getArticleTitle } from "./articleIndex";

/** Affiliate/retail links get rel="sponsored nofollow" (Amazon Associates policy + Google guidelines). */
const AFFILIATE_RE = /^https?:\/\/(?:[a-z0-9-]+\.)*(?:amazon\.[a-z.]+|amzn\.to)\//i;

const SITE_RE = /^https?:\/\/(?:www\.)?goalplanner\.io/i;

const PAGE_LABELS: Record<string, string> = {
  "/download": "Download Lifeplans",
  "/": "Lifeplans home",
  "/articles": "All articles",
  "/pricing": "Pricing",
};

const labelForPath = (path: string): string => {
  if (PAGE_LABELS[path]) return PAGE_LABELS[path];
  const m = path.match(/^\/articles\/([a-z0-9-]+)$/);
  if (m) return getArticleTitle(m[1]) ?? humanize(m[1]);
  return humanize(path.replace(/^\//, ""));
};

const humanize = (s: string) => {
  const t = s.replace(/[-/]+/g, " ").trim();
  return t ? t[0].toUpperCase() + t.slice(1) : "Lifeplans";
};

const toInternalPath = (url: string): string | null => {
  if (!SITE_RE.test(url)) return null;
  const path = url.replace(SITE_RE, "").replace(/[.,;:]+$/, "") || "/";
  return path;
};

/** Strip the markdown sections that should not be shown as text and collect related links. */
export const prepareBody = (raw: string, title: string) => {
  const lines = raw.replace(/\r/g, "").split("\n");
  // Drop a leading "# Title" line (H1 is rendered separately).
  while (lines.length && !lines[0].trim()) lines.shift();
  if (lines.length && /^#\s+/.test(lines[0])) lines.shift();

  const kept: string[] = [];
  const related: string[] = [];
  let skip: null | "keywords" | "related" = null;
  for (const line of lines) {
    const h = line.match(/^##\s+(.*)$/);
    if (h) {
      const name = h[1].trim().toLowerCase();
      if (name === "keywords covered") {
        skip = "keywords";
        continue;
      }
      if (name === "related guides" || name === "related articles") {
        skip = "related";
        continue;
      }
      skip = null;
    }
    if (skip === "keywords") continue;
    if (skip === "related") {
      const m = line.match(/^\s*-\s+(\S+)/);
      if (m) {
        const p = toInternalPath(m[1]);
        const slug = p?.match(/^\/articles\/([a-z0-9-]+)$/)?.[1];
        if (slug) related.push(slug);
      }
      continue;
    }
    kept.push(line);
  }
  void title;
  return { body: kept.join("\n").replace(/\n{3,}/g, "\n\n").trim(), related };
};

const stripInline = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1$2")
    .replace(/https?:\/\/(?:www\.)?goalplanner\.io(\/[^\s)]*)?/g, "goalplanner.io$1")
    .replace(/`([^`]+)`/g, "$1");

/** First real paragraph as a plain-text summary for meta descriptions. */
export const summarize = (body: string, fallback: string, max = 158): string => {
  const paras = body.split(/\n\s*\n/);
  for (const p of paras) {
    const t = p.trim();
    if (!t || /^#{1,6}\s/.test(t) || /^[-*]\s/.test(t) || /^\d+[.)]\s/.test(t) || t === "---") continue;
    const text = stripInline(t.replace(/\s+/g, " ")).trim();
    if (text.length < 40) continue;
    if (text.length <= max) return text;
    const cut = text.slice(0, max - 1);
    return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
  }
  return fallback;
};

const INLINE_RE = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|https?:\/\/[^\s)\]]+)/g;

export const renderInline = (text: string, keyBase = "i"): React.ReactNode[] =>
  text
    .split(INLINE_RE)
    .filter((p) => p !== undefined && p !== "")
    .map((p, idx) => {
      const key = `${keyBase}-${idx}`;
      const md = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (md) return renderLink(md[2], md[1], key);
      if (/^\*\*[^*]+\*\*$/.test(p)) return <strong key={key}>{p.slice(2, -2)}</strong>;
      if (/^\*[^*\s][^*]*\*$/.test(p)) return <em key={key}>{p.slice(1, -1)}</em>;
      if (/^https?:\/\//.test(p)) {
        const trail = p.match(/[.,;:]+$/)?.[0] ?? "";
        const url = trail ? p.slice(0, -trail.length) : p;
        const internal = toInternalPath(url);
        return (
          <React.Fragment key={key}>
            {renderLink(url, internal ? labelForPath(internal) : url, key)}
            {trail}
          </React.Fragment>
        );
      }
      return <React.Fragment key={key}>{p}</React.Fragment>;
    });

const renderLink = (href: string, label: string, key: string) => {
  const internal = href.startsWith("/") ? href : toInternalPath(href);
  if (internal) {
    return (
      <Link key={key} to={internal} className="text-primary underline">
        {label}
      </Link>
    );
  }
  return (
    <a
      key={key}
      href={href}
      className="text-primary underline"
      target="_blank"
      rel={AFFILIATE_RE.test(href) ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}
    >
      {label}
    </a>
  );
};

/** Small, dependency-free markdown renderer for article bodies. */
export const renderMarkdown = (body: string): React.ReactElement[] => {
  const lines = body.split("\n");
  const out: React.ReactElement[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let para: string[] = [];

  const flushPara = (k: string) => {
    if (!para.length) return;
    out.push(
      <p key={`p-${k}`} className="text-foreground/80 leading-relaxed">
        {renderInline(para.join(" "), `p-${k}`)}
      </p>,
    );
    para = [];
  };
  const flushList = (k: string) => {
    if (!list) return;
    const items = list.items.map((t, idx) => <li key={`li-${k}-${idx}`}>{renderInline(t, `li-${k}-${idx}`)}</li>);
    out.push(
      list.ordered ? (
        <ol key={`ol-${k}`} className="list-decimal pl-6 space-y-2 text-foreground/80">
          {items}
        </ol>
      ) : (
        <ul key={`ul-${k}`} className="list-disc pl-6 space-y-2 text-foreground/80">
          {items}
        </ul>
      ),
    );
    list = null;
  };

  let table: string[][] | null = null;
  const flushTable = (k: string) => {
    if (!table) return;
    const [head, ...body] = table;
    out.push(
      <div key={`tw-${k}`} className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse text-foreground/80">
          <thead>
            <tr>
              {head.map((c, j) => (
                <th key={j} className="border border-border px-3 py-2 text-left font-bold text-foreground">
                  {renderInline(c, `th-${k}-${j}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((r, ri) => (
              <tr key={ri}>
                {r.map((c, j) => (
                  <td key={j} className="border border-border px-3 py-2 align-top">
                    {renderInline(c, `td-${k}-${ri}-${j}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
    table = null;
  };

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    const k = String(i);
    const t = line.trim();
    if (t.startsWith("|") && t.endsWith("|") && t.length > 1) {
      flushPara(k);
      flushList(k);
      const cells = t.slice(1, -1).split("|").map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) return;
      if (!table) table = [];
      table.push(cells);
      return;
    }
    flushTable(k);
    const ul = line.match(/^\s*[-*•]\s+(.*)$/);
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ul || ol) {
      flushPara(k);
      const ordered = Boolean(ol && !ul);
      if (list && list.ordered !== ordered) flushList(k);
      if (!list) list = { ordered, items: [] };
      list.items.push((ul ?? ol)![1]);
      return;
    }
    if (!line.trim()) {
      flushPara(k);
      flushList(k);
      return;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara(k);
      flushList(k);
      const text = stripInline(h[2]);
      if (h[1].length <= 2) {
        out.push(
          <h2 key={`h2-${k}`} className="text-xl font-extrabold text-foreground mt-6">
            {text}
          </h2>,
        );
      } else {
        out.push(
          <h3 key={`h3-${k}`} className="text-lg font-bold text-foreground mt-4">
            {text}
          </h3>,
        );
      }
      return;
    }
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      flushPara(k);
      flushList(k);
      out.push(<hr key={`hr-${k}`} className="my-4 border-border" />);
      return;
    }
    flushList(k);
    para.push(line.trim());
  });
  flushPara("end");
  flushList("end");
  flushTable("end");
  return out;
};
