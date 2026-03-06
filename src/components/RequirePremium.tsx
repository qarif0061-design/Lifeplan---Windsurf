import { useUser } from "@/contexts/UserContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type RequirePremiumProps = {
  children: React.ReactNode;
};

const RequirePremium = ({ children }: RequirePremiumProps) => {
  const { user, isPremium, loading } = useUser();

  if (loading) return null;

  if (!user) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in duration-500">
          <h1 className="text-2xl font-bold text-gray-900">Sign in required</h1>
          <p className="text-gray-600">Please sign in to continue.</p>
          <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  if (!isPremium) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in duration-500">
          <h1 className="text-2xl font-bold text-gray-900">Premium feature</h1>
          <p className="text-gray-600">Upgrade to Premium to access this feature.</p>
          <div className="flex gap-3">
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/pricing">Upgrade</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/dashboard">Back</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};

export default RequirePremium;
