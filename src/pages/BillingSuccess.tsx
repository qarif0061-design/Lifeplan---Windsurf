import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const BillingSuccess = () => {
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-18206119493/Ae_mCOTb3bccEMWsrelD",
        value: 1.0,
        currency: "PKR",
        transaction_id: "",
      });
    }
  }, []);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment successful</h1>
          <p className="text-muted-foreground mt-2">
            Thanks for upgrading! Your Premium access will be enabled shortly. If you don&apos;t see Premium features immediately, refresh
            the page in a moment.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="rounded-full bg-primary hover:bg-primary/90">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/pricing">View Plans</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default BillingSuccess;
