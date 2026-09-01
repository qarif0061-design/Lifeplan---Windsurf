import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import Logo from "@/components/Logo";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-background/85 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center">
              <Logo className="h-8 w-auto" />
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
                <Button asChild variant="ghost" className="rounded-full text-momentum hover:text-momentum">
                  <Link to="/referrals">Refer & Earn</Link>
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
              <>
                <Button
                  variant="ghost"
                  className="rounded-full hidden sm:inline-flex"
                  onClick={() => openAuthModal({ intent: "signin" })}
                >
                  Sign In
                </Button>
                <Button
                  className="rounded-full bg-primary hover:bg-primary/90"
                  onClick={() => openAuthModal({ intent: "signup" })}
                >
                  Start Planning
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;