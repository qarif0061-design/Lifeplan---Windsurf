import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type JsonLd = Record<string, unknown>;

type SeoProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  imageUrl?: string;
  jsonLd?: JsonLd | JsonLd[];
};

const SITE_URL = "https://goalplanner.io";

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const Seo = ({ title, description, canonicalPath, imageUrl, jsonLd }: SeoProps) => {
  const location = useLocation();

  useEffect(() => {
    const canonical = canonicalPath
      ? `${SITE_URL}${canonicalPath}`
      : `${SITE_URL}${location.pathname}`;

    document.title = title;

    upsertMeta("meta[name='description']", {
      name: "description",
      content: description,
    });

    upsertLink("canonical", canonical);

    const ogImage = imageUrl || `${SITE_URL}/HI_RES_ICON-9160.png`;

    upsertMeta("meta[property='og:title']", { property: "og:title", content: title });
    upsertMeta("meta[property='og:description']", { property: "og:description", content: description });
    upsertMeta("meta[property='og:type']", { property: "og:type", content: "website" });
    upsertMeta("meta[property='og:url']", { property: "og:url", content: canonical });
    upsertMeta("meta[property='og:image']", { property: "og:image", content: ogImage });

    upsertMeta("meta[name='twitter:card']", { name: "twitter:card", content: "summary" });
    upsertMeta("meta[name='twitter:title']", { name: "twitter:title", content: title });
    upsertMeta("meta[name='twitter:description']", { name: "twitter:description", content: description });
    upsertMeta("meta[name='twitter:image']", { name: "twitter:image", content: ogImage });

    const scriptId = "jsonld";
    const existing = document.getElementById(scriptId);
    if (jsonLd) {
      const script = existing ?? document.createElement("script");
      script.setAttribute("id", scriptId);
      script.setAttribute("type", "application/ld+json");
      script.textContent = JSON.stringify(jsonLd);
      if (!existing) document.head.appendChild(script);
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, canonicalPath, imageUrl, jsonLd, location.pathname]);

  return null;
};

export default Seo;
