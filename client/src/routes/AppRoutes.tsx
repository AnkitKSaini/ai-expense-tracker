import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Expenses from "../pages/Expenses/ExpensesPage";
import Profile from "../pages/Profile/Profile";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import NotFound from "../pages/NotFound/NotFound";
import PublicRoute from "./PublicRoute";

import ProtectedRoute from "../routes/ProtectedRoute";

import BudgetPage from "../pages/Budget/BudgetPage";

import AIPage from "../pages/AI/AIPage";

import AIChat from "../pages/Chat/AIChat";

import Settings from "../pages/Settings/Settings";

import GoalsPage from "../pages/Goals/GoalsPage";

import InvestmentsPage from "../pages/Investments/InvestmentsPage";

import RecurringPage from "../pages/Recurring/RecurringPage";

import BillsPage from "../pages/Bills/BillsPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <Navigate
            to={localStorage.getItem("token") ? "/dashboard" : "/login"}
            replace
          />
        }
      />

      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<MainLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/recurring" element={<RecurringPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/investments" element={<InvestmentsPage />} />
          <Route path="/bills" element={<BillsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
