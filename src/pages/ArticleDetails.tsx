import Layout from "@/components/Layout";
import { Link, useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import NotFound from "./NotFound";
import { resolveArticle, getArticleTitle, ARTICLE_AUTHOR, ARTICLE_DATES, SITE_URL } from "@/seo/articleIndex";
import { prepareBody, renderMarkdown, summarize } from "@/seo/markdown";
import { SMART_GOALS_HUB_SLUGS } from "@/seo/smartGoalsHub";

const SMART_HUB_ANCHORS = [
  "SMART goals guide",
  "complete guide to SMART goals",
  "what SMART goals are",
  "SMART goals: meaning, examples and template",
  "how to write SMART goals",
];
const isSmartGoalArticle = (slug: string) => SMART_GOALS_HUB_SLUGS.has(slug) || /(^|-)smart(er|t)?(-|$)/.test(slug);
const smartHubAnchor = (slug: string) =>
  SMART_HUB_ANCHORS[[...slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % SMART_HUB_ANCHORS.length];

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const SupportingCard = ({ pillarSlug, pillarTitle }: { pillarSlug: string; pillarTitle: string }) => (
  <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm space-y-3">
    <div className="text-sm font-semibold text-foreground">Want the full guide?</div>
    <p className="text-foreground/80">For the complete, updated guide, read:</p>
    <Link to={`/articles/${pillarSlug}`} className="text-primary font-semibold hover:underline">
      {pillarTitle}
    </Link>
  </div>
);

const buildFaqJsonLd = (faqs: { question: string; answer: string }[], pageUrl: string): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: pageUrl,
  mainEntity: faqs.slice(0, 6).map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

const ArticleDetails = () => {
  const { slug } = useParams();
  const article = resolveArticle(slug);

  if (!article) return <NotFound />;

  const { body, related: relatedFromBody } = prepareBody(article.body, article.title);
  const description = summarize(
    body,
    `${article.title}: practical steps, examples and a simple way to track progress with Lifeplans.`,
  );
  const url = `${SITE_URL}${article.canonicalPath}`;
  const relatedSlugs = Array.from(new Set([...article.relatedSlugs, ...relatedFromBody]))
    .filter((s) => s !== article.slug && getArticleTitle(s))
    .slice(0, 6);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    url,
    description,
    mainEntityOfPage: url,
    datePublished: ARTICLE_DATES.published,
    dateModified: ARTICLE_DATES.updated,
    author: { "@type": "Organization", name: ARTICLE_AUTHOR.name, url: ARTICLE_AUTHOR.url },
    publisher: { "@type": "Organization", name: "Lifeplans", url: SITE_URL },
  };
  const jsonLd = article.faqs?.length ? [articleJsonLd, buildFaqJsonLd(article.faqs, url)] : articleJsonLd;

  return (
    <Layout>
      <Seo
        title={`${article.title} | Lifeplans`}
        description={description}
        canonicalPath={article.canonicalPath}
        noIndex={article.noIndex}
        jsonLd={jsonLd}
      />
      <article className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
        <Link to="/articles" className="text-sm font-medium text-muted-foreground hover:text-primary">
          Back to Articles
        </Link>

        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{article.title}</h1>
          <p className="text-sm text-muted-foreground">
            By <Link to="/about#editorial-team" className="underline">{ARTICLE_AUTHOR.name}</Link>
            {" · "}Published <time dateTime={ARTICLE_DATES.published}>{formatDate(ARTICLE_DATES.published)}</time>
            {" · "}Updated <time dateTime={ARTICLE_DATES.updated}>{formatDate(ARTICLE_DATES.updated)}</time>
          </p>
        </header>

        {isSmartGoalArticle(article.slug) && (
          <aside className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3 text-sm text-foreground/80">
            Part of our <Link to="/smart-goals" className="font-medium underline hover:text-primary">{smartHubAnchor(article.slug)}</Link>
            {" "}- the letters explained, a free template and 20 examples.
          </aside>
        )}

        {article.kind === "generated" && article.supportingPillar && (
          <SupportingCard pillarSlug={article.supportingPillar.slug} pillarTitle={article.supportingPillar.title} />
        )}

        <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
          <div className="space-y-3">{renderMarkdown(body)}</div>
        </div>

        {relatedSlugs.length > 0 && (
          <nav aria-label="Related guides" className="rounded-[2rem] border border-border bg-card p-8 shadow-sm space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Related guides</h2>
            <ul className="space-y-1">
              {relatedSlugs.map((s) => (
                <li key={s}>
                  <Link to={`/articles/${s}`} className="text-primary hover:underline">
                    {getArticleTitle(s)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <p className="text-xs text-muted-foreground">
          This article is general information, not professional advice. See our <Link to="/disclaimer" className="underline">disclaimer</Link>.
        </p>
      </article>
    </Layout>
  );
};

export default ArticleDetails;
