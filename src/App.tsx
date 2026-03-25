import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { UserProvider } from "@/contexts/UserContext";
import RememberMeRedirect from "@/components/RememberMeRedirect";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Pricing from "./pages/Pricing";
import Landing from "./pages/Landing";
import Settings from "./pages/Settings";
import Insights from "./pages/Insights";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import Profile from "./pages/Profile";
import BillingSuccess from "./pages/BillingSuccess";
import GoalDetails from "./pages/GoalDetails";
import CheckIn from "./pages/CheckIn";
import Planning from "./pages/Planning";
import Strategy from "./pages/Strategy";
import Social from "./pages/Social";
import Download from "./pages/Download";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import Questions from "./pages/Questions";
import NotFound from "./pages/NotFound";
import WeeklyPlanningSeo from "./pages/WeeklyPlanningSeo";
import DailyPlanner from "./pages/DailyPlanner";
import DailyPlannerHistory from "./pages/DailyPlannerHistory";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GoalPlannerApp from "./pages/GoalPlannerApp";
import DailyPlannerApp from "./pages/DailyPlannerApp";
import HabitTrackerApp from "./pages/HabitTrackerApp";
import DailyJournalApp from "./pages/DailyJournalApp";
import ProductivityApp from "./pages/ProductivityApp";

function App() {
  return (
    <UserProvider>
      <Router>
        <RememberMeRedirect>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/life-planning"
              element={<Navigate to="/articles/how-to-set-goals-and-actually-achieve-them" replace />}
            />
            <Route
              path="/getting-things-done"
              element={<Navigate to="/articles/how-to-get-things-done-system-2026" replace />}
            />
            <Route path="/weekly-planning" element={<WeeklyPlanningSeo />} />
            <Route
              path="/time-management"
              element={<Navigate to="/articles/time-management-tips-and-strategies-2026" replace />}
            />
            <Route
              path="/smart-goals"
              element={<Navigate to="/articles/smart-goals-template-and-examples-2026" replace />}
            />
            <Route
              path="/motivation"
              element={<Navigate to="/articles/best-motivational-quotes-2026" replace />}
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/billing/success" element={<BillingSuccess />} />
            <Route path="/goals/:id" element={<GoalDetails />} />
            <Route path="/check-in" element={<CheckIn />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/social" element={<Social />} />
            <Route path="/download" element={<Download />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetails />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/daily-planner" element={<DailyPlanner />} />
            <Route path="/daily-planner/history" element={<DailyPlannerHistory />} />
            <Route path="/goal-planner-app" element={<GoalPlannerApp />} />
            <Route path="/daily-planner-app" element={<DailyPlannerApp />} />
            <Route path="/habit-tracker-app" element={<HabitTrackerApp />} />
            <Route path="/daily-journal-app" element={<DailyJournalApp />} />
            <Route path="/productivity-app" element={<ProductivityApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </RememberMeRedirect>
      </Router>
    </UserProvider>
  );
}

export default App;