import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BillingSuccess = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment successful</h1>
          <p className="text-gray-600 mt-2">
            Thanks for upgrading! Your Premium access will be enabled shortly. If you don&apos;t see Premium features immediately, refresh
            the page in a moment.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
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
