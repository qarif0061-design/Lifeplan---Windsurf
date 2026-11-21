import { Link, useLocation } from "react-router-dom";
import { getBoostLinks } from "@/seo/boostLinks";

/** "Popular guides" box: contextual internal links to pages that already rank well (see src/seo/boostLinks.ts). */
const BoostLinks = () => {
  const { pathname } = useLocation();
  const links = getBoostLinks(pathname);
  if (!links.length) return null;
  return (
    <nav aria-label="Popular guides" className="mt-8 rounded-[2rem] border border-border bg-card p-6 sm:p-8 shadow-sm space-y-3">
      <h2 className="text-sm font-semibold text-foreground">Popular guides on this topic</h2>
      <ul className="space-y-2 text-foreground/80">
        {links.map((l) => (
          <li key={l.href}>
            Read our <Link to={l.href} className="text-primary font-medium hover:underline">{l.anchor}</Link> - {l.blurb}.
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BoostLinks;
