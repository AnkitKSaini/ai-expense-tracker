import DashboardHeader from "../Dashboard/DashboardHeader";
import StatCard from "../Dashboard/StatCard";
import RecentTransactions from "../Dashboard/RecentTransactions";
import AIInsights from "../Dashboard/AIInsights";

import { useDashboard } from "../../hooks/useDashboard";
import DashboardAnalytics from "../Dashboard/DashboardAnalytics";

function Dashboard() {
  const { data, isPending } = useDashboard();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData = months.map((month, index) => {
    const item = data?.monthlyExpense.find(
      (expense) => expense.month === index + 1,
    );

    return {
      month,
      total: item ? item.total : 0,
    };
  });

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
        <StatCard title="Total Balance" value={`₹${data.balance}`} />

        <StatCard title="Income" value={`₹${data.totalIncome}`} />

        <StatCard title="Expenses" value={`₹${data.totalExpense}`} />

        <StatCard title="Transactions" value={String(data.totalTransactions)} />
      </div>

      <div className="mt-6">
        <DashboardAnalytics
          monthlyData={monthlyData}
          categoryData={data.categoryWiseExpense}
        />
      </div>

      <div className="mt-6">
        <RecentTransactions expenses={data.recentTransactions} />
      </div>

      <div className="mt-6">
        <AIInsights
          balance={data.balance}
          totalIncome={data.totalIncome}
          totalExpense={data.totalExpense}
          categoryWiseExpense={data.categoryWiseExpense}
          monthlyExpense={data.monthlyExpense}
        />
      </div>
    </>
  );
}

export default Dashboard;
