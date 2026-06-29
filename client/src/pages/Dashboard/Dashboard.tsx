import DashboardHeader from "../Dashboard/DashboardHeader";
import StatCard from "../Dashboard/StatCard";
import ExpenseChart from "../Dashboard/ExpenseChart";
import RecentTransactions from "../Dashboard/RecentTransactions";
import AIInsights from "../Dashboard/AIInsights";
function Dashboard() {
  return (
    <>
      <DashboardHeader />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Balance" value="₹52,400" />

        <StatCard title="Income" value="₹85,000" />

        <StatCard title="Expenses" value="₹32,600" />

        <StatCard title="Savings" value="₹52,400" />

        <ExpenseChart />

        <RecentTransactions />

        <AIInsights />
      </div>
    </>
  );
}

export default Dashboard;
