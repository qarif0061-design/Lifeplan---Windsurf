import { useEffect, useRef } from "react";

type MonetagBannerProps = {
  zoneId?: string;
  className?: string;
};

const MonetagBanner = ({ zoneId = "233643", className }: MonetagBannerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://quge5.com/88/tag.min.js";
    script.async = true;
    script.dataset.zone = zoneId;
    script.setAttribute("data-cfasync", "false");

    container.appendChild(script);
  }, [zoneId]);

  return <div ref={containerRef} className={className} />;
};

export default MonetagBanner;
