import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">Lifeplans</span>
            </Link>

            {user && (
              <div className="hidden md:flex items-center space-x-1">
                <Button asChild variant="ghost" className="rounded-full">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button asChild variant="ghost" className="rounded-full">
                  <Link to="/goals">Goals</Link>
                </Button>
                <Button asChild variant="ghost" className="rounded-full">
                  <Link to="/check-in">Check-in</Link>
                </Button>
                <Button asChild variant="ghost" className="rounded-full">
                  <Link to="/insights">Insights</Link>
                </Button>
                <Button asChild variant="ghost" className="rounded-full">
                  <Link to="/articles">Articles</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-1">
                  <Button asChild variant="ghost" className="rounded-full">
                    <Link to="/download">Download</Link>
                  </Button>
                  <Button asChild variant="ghost" className="rounded-full">
                    <Link to="/social">Social</Link>
                  </Button>
                </div>
                <Button asChild variant="ghost" className="rounded-full">
                  <Link to="/profile">Profile</Link>
                </Button>
                <Button variant="outline" onClick={handleLogout} className="rounded-full">
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;