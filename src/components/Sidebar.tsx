import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Home,
  LogOut,
  ListTodo,
  Target,
  User,
  CheckSquare,
  Lock,
  CalendarDays,
  PenSquare,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
        { to: "/articles", label: "Articles", icon: BookOpen },
        { to: "/questions", label: "Questions", icon: BookOpen },
        { to: "/download", label: "Download", icon: Download },
      ]
    : [{ to: "/auth", label: "Sign In", icon: User }];

  return (
    <aside
      className={`sticky top-0 h-screen border-r border-slate-200/80 dark:border-slate-700/50 bg-gradient-to-b from-white via-sky-50 to-blue-100/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      <div className="h-16 px-3 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/50">
        <div />
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapsed}
          className="rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10 transition-all duration-200"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <div className="p-3 space-y-1">
        {nav.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          const isLocked = Boolean(user && (item as { premiumOnly?: boolean }).premiumOnly && !isPremium);
          return (
            <Button
              key={item.to}
              asChild
              variant="ghost"
              className={`w-full justify-start rounded-2xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10 transition-all duration-200 ${
                active ? "bg-blue-600/10 dark:bg-blue-500/20 text-blue-900 dark:text-blue-300 font-semibold" : ""
              } ${collapsed ? "px-0" : "px-3"}`}
            >
              <Link to={item.to} className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                <Icon className="w-4 h-4" />
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

      <div className="mt-auto p-3 border-t border-slate-200/80 dark:border-slate-700/50 space-y-1">
        {user && (
          <>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start rounded-2xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10 transition-all duration-200 ${
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
              className={`w-full rounded-2xl border-slate-300/70 dark:border-slate-600/50 bg-white/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-700/70 hover:text-slate-900 dark:hover:text-white transition-all duration-200 ${
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
