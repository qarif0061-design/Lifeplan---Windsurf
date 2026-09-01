import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { ArrowLeft, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { subscribePendingInvites } from "@/firebase/accountability";
import { Link } from "react-router-dom";
import Logomark from "@/components/Logomark";

const TopHeader = () => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (!user?.email) return;
    let unsub: (() => void) | undefined;
    subscribePendingInvites(user.email, (invites) => {
      setPendingCount(invites.length);
    }).then((u) => { unsub = u; });
    return () => unsub?.();
  }, [user?.email]);

  const title = useMemo(() => {
    if (location.pathname.startsWith("/dashboard")) return "Dashboard";
    if (location.pathname.startsWith("/goals")) return "Goals";
    if (location.pathname.startsWith("/check-in")) return "Daily Check-in";
    if (location.pathname.startsWith("/planning")) return "Weekly Planning";
    if (location.pathname.startsWith("/insights")) return "Insights";
    if (location.pathname.startsWith("/articles")) return "Articles";
    if (location.pathname.startsWith("/profile")) return "Profile";
    return "Goal Planner - Lifeplans";
  }, [location.pathname]);

  const greetingName = user?.displayName?.trim() ? user.displayName.trim() : "";
  const showBack = location.pathname !== "/" && !location.pathname.startsWith("/dashboard");
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <header className="border-b border-border/80 bg-background/80 backdrop-blur-xl transition-all duration-300 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {showBack && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full shrink-0"
                onClick={() => navigate(-1)}
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <Logomark className="w-8 h-8 shrink-0" />
            {!isDashboard && (
              <div className="text-lg font-display font-bold text-foreground truncate">{title}</div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {user && pendingCount > 0 && (
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full relative"
              >
                <Link to="/settings">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-ember text-ember-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {pendingCount}
                  </span>
                </Link>
              </Button>
            )}
            {user && (
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Link to="/settings">
                  <Settings className="w-5 h-5" />
                </Link>
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
        {isDashboard && greetingName && (
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Welcome back</span>
            <span className="font-semibold text-foreground">{greetingName}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopHeader;
