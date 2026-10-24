import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ThemeProvider } from "next-themes";
import { AppShell } from "./App";
import { HeadContext, type HeadData } from "./seo/headContext";
import { listArticleEntries } from "./seo/articleIndex";

export { listArticleEntries };

export const render = (url: string): { html: string; head: HeadData } => {
  const head: HeadData = {};
  const html = renderToString(
    <HeadContext.Provider value={head}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="theme">
        <StaticRouter location={url}>
          <AppShell />
        </StaticRouter>
      </ThemeProvider>
    </HeadContext.Provider>,
  );
  return { html, head };
};
