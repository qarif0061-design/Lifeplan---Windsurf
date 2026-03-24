import keywordList from "./keywords.json";

export const KEYWORDS = (keywordList as string[]).map((k) => String(k).trim()).filter(Boolean);
