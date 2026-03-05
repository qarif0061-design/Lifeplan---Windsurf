import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const TopHeader = () => {
  const { user } = useUser();
  const location = useLocation();

  const title = useMemo(() => {
    if (location.pathname.startsWith("/dashboard")) return "Dashboard";
    if (location.pathname.startsWith("/goals")) return "Goals";
    if (location.pathname.startsWith("/check-in")) return "Daily Check-in";
    if (location.pathname.startsWith("/planning")) return "Weekly Planning";
    if (location.pathname.startsWith("/insights")) return "Insights";
    if (location.pathname.startsWith("/articles")) return "Articles";
    if (location.pathname.startsWith("/profile")) return "Profile";
    return "Lifeplans";
  }, [location.pathname]);

  const greetingName = user?.displayName?.trim() ? user.displayName.trim() : "";

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="text-2xl font-extrabold text-gray-900">Lifeplans</div>
            <div className="text-sm text-gray-600">Plan smarter. Stay consistent. Achieve more.</div>
          </div>
          <div className="text-sm text-gray-600">
            {greetingName ? (
              <span>
                Hi, <span className="font-semibold text-gray-900">{greetingName}</span> — {title}
              </span>
            ) : (
              <span>{title}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
