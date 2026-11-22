import { useEffect } from "react";
const NATIVE_ID = "container-610d3e63503f748841996512a19a7a0f";
const NATIVE_SRC = "https://pl30175984.effectivecpmnetwork.com/610d3e63503f748841996512a19a7a0f/invoke.js";
const BANNER_KEY = "ad71ceb759020368e6bed9f9bdb9c7db";
const BANNER_SRC = `https://www.highperformanceformat.com/${BANNER_KEY}/invoke.js`;
const BANNER_CONTAINER = `atContainer-${BANNER_KEY}`;
export default function AdsterraDisplaySlots() {
  useEffect(() => {
    (window as any).atOptions = { key: BANNER_KEY, format: "iframe", height: 60, width: 468, params: {}, container: BANNER_CONTAINER };
    const ensure = (id: string, src: string, attrs: Record<string, string> = {}) => {
      if (document.getElementById(id)) return;
      const s = document.createElement("script"); s.id = id; s.src = src; s.async = true;
      for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
      document.body.appendChild(s);
    };
    ensure("adsterra-native-invoke", NATIVE_SRC, { "data-cfasync": "false" });
    ensure("adsterra-banner-invoke", BANNER_SRC);
  }, []);
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 space-y-4">
      <div id={NATIVE_ID} />
      <div id={BANNER_CONTAINER} className="flex justify-center overflow-hidden" style={{ minHeight: 60 }} />
    </div>
  );
}
