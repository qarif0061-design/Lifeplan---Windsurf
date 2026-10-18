import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "cookie-consent";

type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const updateConsent = (choice: ConsentChoice) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
};

/**
 * Google's EU User Consent Policy requires a consent choice before non-essential
 * cookies or personalized ads run for EEA/UK/Swiss visitors. This shows to everyone
 * (simpler and safer than trying to geo-detect client-side) and wires the choice
 * into Consent Mode v2, which index.html defaults to "denied" on page load.
 */
const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentChoice | null;
    if (stored === "granted" || stored === "denied") {
      updateConsent(stored);
      return;
    }
    setVisible(true);
  }, []);

  const choose = (choice: ConsentChoice) => {
    localStorage.setItem(CONSENT_KEY, choice);
    updateConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card shadow-lg p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm text-foreground/80 flex-1">
          We use cookies to run the site and, with your consent, to show personalized ads and measure traffic. See our{" "}
          <Link to="/privacy" className="text-primary underline">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" className="rounded-full" onClick={() => choose("denied")}>
            Reject non-essential
          </Button>
          <Button className="rounded-full bg-primary hover:bg-primary/90" onClick={() => choose("granted")}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
