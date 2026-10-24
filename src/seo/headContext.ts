import { createContext } from "react";

export type HeadData = {
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
  jsonLd?: unknown;
  imageUrl?: string;
  notFound?: boolean;
};

/** Only provided during build-time prerendering (src/entry-server.tsx). */
export const HeadContext = createContext<HeadData | null>(null);
