import StatCard from "../Dashboard/StatCard";
import type { DashboardSummary } from "../../types/dashboard";

interface Props {
  summary: DashboardSummary;
}

function SummaryCards({ summary }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Balance"
        value={`₹ ${summary.balance}`}
      />

      <StatCard
        title="Income"
        value={`₹ ${summary.totalIncome}`}
      />

      <StatCard
        title="Expenses"
        value={`₹ ${summary.totalExpense}`}
      />

      <StatCard
        title="Transactions"
        value={summary.totalTransactions}
      />
    </div>
  );
}

export default SummaryCards;