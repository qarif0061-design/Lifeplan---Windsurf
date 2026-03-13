import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Home, Target } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
          <Search className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-gray-600">Oops! The page you're looking for doesn't exist.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild variant="outline" className="rounded-full px-6 h-10">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6 h-10">
            <Link to="/dashboard">
              <Target className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;