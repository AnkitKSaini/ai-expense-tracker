import DashboardHeader from "../Dashboard/DashboardHeader";
import StatCard from "../Dashboard/StatCard";
import ExpenseChart from "../Dashboard/ExpenseChart";
import RecentTransactions from "../Dashboard/RecentTransactions";
import AIInsights from "../Dashboard/AIInsights";

import { useDashboard } from "../../hooks/useDashboard";

function Dashboard() {
  const { data, isPending } = useDashboard();

  if (isPending) {
    return (
      <div className="p-6">
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6">
        <p>Unable to load dashboard.</p>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Balance"
          value={`₹${data.balance}`}
        />

        <StatCard
          title="Income"
          value={`₹${data.totalIncome}`}
        />

        <StatCard
          title="Expenses"
          value={`₹${data.totalExpense}`}
        />

        <StatCard
          title="Transactions"
          value={String(data.totalTransactions)}
        />
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <ExpenseChart />

        <RecentTransactions   expenses={data.recentTransactions}
 />
      </div>

      <div className="mt-6">
        <AIInsights />
      </div>
    </>
  );
}

export default Dashboard;