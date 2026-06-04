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
import Strategy from "./pages/Strategy";
import Social from "./pages/Social";
import Download from "./pages/Download";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import Questions from "./pages/Questions";
import NotFound from "./pages/NotFound";
import GoalPlanner from "./pages/GoalPlanner";
import DailyPlanner from "./pages/DailyPlanner";
import DailyPlannerHistory from "./pages/DailyPlannerHistory";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GoalPlannerApp from "./pages/GoalPlannerApp";
import DailyPlannerApp from "./pages/DailyPlannerApp";
import HabitTrackerApp from "./pages/HabitTrackerApp";
import DailyJournalApp from "./pages/DailyJournalApp";
import ProductivityApp from "./pages/ProductivityApp";
import LifePlanning from "./pages/LifePlanning";
import WeeklyPlanningSeo from "./pages/WeeklyPlanningSeo";
import WeeklyPlanner from "./pages/WeeklyPlanner";
import TimeManagementSeo from "./pages/TimeManagementSeo";
import Productivity from "./pages/Productivity";
import Procrastination from "./pages/Procrastination";
import ToDoList from "./pages/ToDoList";
import StudentPlanner from "./pages/StudentPlanner";
import SelfImprovement from "./pages/SelfImprovement";
import FocusAndMentalClarity from "./pages/FocusAndMentalClarity";
import DailyRoutinePlanner from "./pages/DailyRoutinePlanner";
import TimeBlocking from "./pages/TimeBlocking";
import PomodoroTechnique from "./pages/PomodoroTechnique";
import EisenhowerMatrix from "./pages/EisenhowerMatrix";
import AdminPanel from "./pages/AdminPanel";
import OnlineGoalPlanner from "./pages/OnlineGoalPlanner";
import ScheduleApp from "./pages/ScheduleApp";
import ProgressTrackerApp from "./pages/ProgressTrackerApp";
import GoalsCalendarApp from "./pages/GoalsCalendarApp";
import CalendarPlannerApp from "./pages/CalendarPlannerApp";
import GoalTrackerApp from "./pages/GoalTrackerApp";
import DailyGoalsApp from "./pages/DailyGoalsApp";
import DailyScheduleApp from "./pages/DailyScheduleApp";
import BestHabitTrackerApp from "./pages/BestHabitTrackerApp";
import RoutineCreatorApp from "./pages/RoutineCreatorApp";
import AppForCalendarPlanning from "./pages/AppForCalendarPlanning";
import StructuredDailyPlannerApp from "./pages/StructuredDailyPlannerApp";
import AppForSchedulePlanning from "./pages/AppForSchedulePlanning";
import AppToCheckOffDailyGoals from "./pages/AppToCheckOffDailyGoals";
import AppsToMakeSchedules from "./pages/AppsToMakeSchedules";
import DailyHabitTrackerApp from "./pages/DailyHabitTrackerApp";
import DayOrganizerApp from "./pages/DayOrganizerApp";
import GoodDayPlannerApps from "./pages/GoodDayPlannerApps";
import HabitsApp from "./pages/HabitsApp";
import OnlineDailyPlanner from "./pages/OnlineDailyPlanner";
import RoutineApp from "./pages/RoutineApp";
import WorkPlanner from "./pages/WorkPlanner";
import AgendaPlanningApp from "./pages/AgendaPlanningApp";
import AppsForDailyRoutine from "./pages/AppsForDailyRoutine";
import AppsToHelpWithDailyRoutine from "./pages/AppsToHelpWithDailyRoutine";
import BestDailyPlannerApp from "./pages/BestDailyPlannerApp";
import BestHabitTrackers from "./pages/BestHabitTrackers";
import DailyDigitalPlanner from "./pages/DailyDigitalPlanner";
import DailyTrackerApp from "./pages/DailyTrackerApp";
import DigitalDailyPlanner from "./pages/DigitalDailyPlanner";
import DigitalPlannerApp from "./pages/DigitalPlannerApp";
import GoalPlanners from "./pages/GoalPlanners";
import PlannerApps from "./pages/PlannerApps";

function App() {
  return (
    <UserProvider>
      <Router>
        <RememberMeRedirect>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/goal-planner" element={<GoalPlanner />} />
            <Route
              path="/life-planning"
              element={<LifePlanning />}
            />
            <Route path="/weekly-planning" element={<WeeklyPlanningSeo />} />
            <Route path="/time-management" element={<TimeManagementSeo />} />
            <Route path="/productivity" element={<Productivity />} />
            <Route path="/procrastination" element={<Procrastination />} />
            <Route path="/to-do-list" element={<ToDoList />} />
            <Route path="/student-planner" element={<StudentPlanner />} />
            <Route path="/self-improvement" element={<SelfImprovement />} />
            <Route path="/focus-and-mental-clarity" element={<FocusAndMentalClarity />} />
            <Route path="/daily-routine-planner" element={<DailyRoutinePlanner />} />
            <Route path="/time-blocking" element={<TimeBlocking />} />
            <Route path="/pomodoro-technique" element={<PomodoroTechnique />} />
            <Route path="/eisenhower-matrix" element={<EisenhowerMatrix />} />
            <Route path="/online-goal-planner" element={<OnlineGoalPlanner />} />
            <Route path="/admin" element={<AdminPanel />} />
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
            <Route path="/planning" element={<Navigate to="/weekly-planner" replace />} />
            <Route path="/weekly-planner" element={<WeeklyPlanner />} />
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
            <Route path="/schedule-app" element={<ScheduleApp />} />
            <Route path="/progress-tracker-app" element={<ProgressTrackerApp />} />
            <Route path="/goals-calendar-app" element={<GoalsCalendarApp />} />
            <Route path="/calendar-planner-app" element={<CalendarPlannerApp />} />
            <Route path="/goal-tracker-app" element={<GoalTrackerApp />} />
            <Route path="/daily-goals-app" element={<DailyGoalsApp />} />
            <Route path="/daily-schedule-app" element={<DailyScheduleApp />} />
            <Route path="/best-habit-tracker-app" element={<BestHabitTrackerApp />} />
            <Route path="/routine-creator-app" element={<RoutineCreatorApp />} />
            <Route path="/app-for-calendar-planning" element={<AppForCalendarPlanning />} />
            <Route path="/structured-daily-planner-app" element={<StructuredDailyPlannerApp />} />
            <Route path="/app-for-schedule-planning" element={<AppForSchedulePlanning />} />
            <Route path="/app-to-check-off-daily-goals" element={<AppToCheckOffDailyGoals />} />
            <Route path="/apps-to-make-schedules" element={<AppsToMakeSchedules />} />
            <Route path="/daily-habit-tracker-app" element={<DailyHabitTrackerApp />} />
            <Route path="/day-organizer-app" element={<DayOrganizerApp />} />
            <Route path="/good-day-planner-apps" element={<GoodDayPlannerApps />} />
            <Route path="/habits-app" element={<HabitsApp />} />
            <Route path="/online-daily-planner" element={<OnlineDailyPlanner />} />
            <Route path="/routine-app" element={<RoutineApp />} />
            <Route path="/work-planner" element={<WorkPlanner />} />
            <Route path="/agenda-planning-app" element={<AgendaPlanningApp />} />
            <Route path="/apps-for-daily-routine" element={<AppsForDailyRoutine />} />
            <Route path="/apps-to-help-with-daily-routine" element={<AppsToHelpWithDailyRoutine />} />
            <Route path="/best-daily-planner-app" element={<BestDailyPlannerApp />} />
            <Route path="/best-habit-trackers" element={<BestHabitTrackers />} />
            <Route path="/daily-digital-planner" element={<DailyDigitalPlanner />} />
            <Route path="/daily-tracker-app" element={<DailyTrackerApp />} />
            <Route path="/digital-daily-planner" element={<DigitalDailyPlanner />} />
            <Route path="/digital-planner-app" element={<DigitalPlannerApp />} />
            <Route path="/goal-planners" element={<GoalPlanners />} />
            <Route path="/planner-apps" element={<PlannerApps />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </RememberMeRedirect>
      </Router>
    </UserProvider>
  );
}

export default App;