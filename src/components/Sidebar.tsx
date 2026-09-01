import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Gift,
  Home,
  LogOut,
  ListTodo,
  Target,
  User,
  Users,
  CheckSquare,
  Lock,
  CalendarDays,
  PenSquare,
  Trophy,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logomark from "@/components/Logomark";

type SidebarProps = {
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

const Sidebar = ({ collapsed, onToggleCollapsed }: SidebarProps) => {
  const { user, logout, isPremium } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const nav = user
    ? [
        { to: "/dashboard", label: "Dashboard", icon: Home },
        { to: "/goals", label: "Goals", icon: Target },
        { to: "/daily-planner", label: "Daily Planner", icon: ListTodo },
        { to: "/check-in", label: "Daily Check-in", icon: CheckSquare, premiumOnly: true as const },
        { to: "/weekly-planner", label: "Weekly Planner", icon: CalendarDays },
        { to: "/custom-planner", label: "Custom Planner", icon: PenSquare },
        { to: "/insights", label: "Insights", icon: Calendar, premiumOnly: true as const },
        { to: "/challenges", label: "Challenges", icon: Trophy },
        { to: "/accountability", label: "Accountability", icon: Users },
        { to: "/referrals", label: "Refer & Earn", icon: Gift },
        { to: "/articles", label: "Articles", icon: BookOpen },
        { to: "/questions", label: "Questions", icon: BookOpen },
        { to: "/download", label: "Download", icon: Download },
      ]
    : [{ to: "/auth", label: "Sign In", icon: User }];

  return (
    <aside
      className={`sticky top-0 h-screen border-r border-border bg-card transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      <div className={`h-16 px-3 flex items-center border-b border-border ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
            <Logomark className="w-6 h-6" />
            <span className="font-display font-bold text-foreground">Lifeplans</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapsed}
          className="rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <div className="p-3 space-y-0.5">
        {nav.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          const isLocked = Boolean(user && (item as { premiumOnly?: boolean }).premiumOnly && !isPremium);
          return (
            <Button
              key={item.to}
              asChild
              variant="ghost"
              className={`relative w-full justify-start rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 ${
                active ? "bg-momentum/10 text-foreground font-semibold" : ""
              } ${collapsed ? "px-0" : "px-3"}`}
            >
              <Link to={item.to} className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                {active && !collapsed && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-momentum" />
                )}
                <Icon className={`w-4 h-4 ${active ? "text-momentum" : ""}`} />
                {!collapsed && (
                  <span className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {isLocked && <Lock className="w-3.5 h-3.5 opacity-70" />}
                  </span>
                )}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="mt-auto p-3 border-t border-border space-y-1">
        {user && (
          <>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 ${
                collapsed ? "px-0" : "px-3"
              }`}
            >
              <Link to="/profile" className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                <User className="w-4 h-4" />
                {!collapsed && <span>Profile</span>}
              </Link>
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className={`w-full rounded-xl border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200 ${
                collapsed ? "px-0" : "px-3 justify-start"
              }`}
            >
              <span className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""} w-full`}>
                <LogOut className="w-4 h-4" />
                {!collapsed && <span>Logout</span>}
              </span>
            </Button>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
