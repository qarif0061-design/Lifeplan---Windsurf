import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <UserProvider>
      <Router>
        <RememberMeRedirect>
          <Routes>
            <Route path="/" element={<Landing />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </RememberMeRedirect>
      </Router>
    </UserProvider>
  );
}

export default App;