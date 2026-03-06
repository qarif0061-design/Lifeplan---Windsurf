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
  Target,
  User,
  CheckSquare,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type SidebarProps = {
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

const Sidebar = ({ collapsed, onToggleCollapsed }: SidebarProps) => {
  const { user, logout } = useUser();
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
        { to: "/check-in", label: "Daily Check-in", icon: CheckSquare },
        { to: "/planning", label: "Weekly Planning", icon: Calendar },
        { to: "/insights", label: "Insights", icon: Calendar },
        { to: "/articles", label: "Articles", icon: BookOpen },
        { to: "/questions", label: "Questions", icon: BookOpen },
        { to: "/download", label: "Download", icon: Download },
      ]
    : [{ to: "/auth", label: "Sign In", icon: User }];

  return (
    <aside
      className={`sticky top-0 h-screen border-r border-gray-100 bg-white transition-all duration-200 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      <div className="h-16 px-3 flex items-center justify-between border-b border-gray-100">
        <div />
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapsed}
          className="rounded-full"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <div className="p-3 space-y-1">
        {nav.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Button
              key={item.to}
              asChild
              variant={active ? "default" : "ghost"}
              className={`w-full justify-start rounded-2xl ${collapsed ? "px-0" : "px-3"}`}
            >
              <Link to={item.to} className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                <Icon className="w-4 h-4" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="mt-auto p-3 border-t border-gray-100 space-y-1">
        {user && (
          <>
            <Button
              asChild
              variant="ghost"
              className={`w-full justify-start rounded-2xl ${collapsed ? "px-0" : "px-3"}`}
            >
              <Link to="/profile" className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                <User className="w-4 h-4" />
                {!collapsed && <span>Profile</span>}
              </Link>
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className={`w-full rounded-2xl ${collapsed ? "px-0" : "px-3 justify-start"}`}
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
