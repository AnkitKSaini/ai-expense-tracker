import {
  Wallet,
  IndianRupee,
  Receipt,
  ArrowUpDown,
} from "lucide-react";

import StatCard from "./StatCard";
import type { DashboardSummary } from "../../types/dashboard";

interface Props {
  summary: DashboardSummary;
}

function SummaryCards({ summary }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Balance"
        value={summary.balance}
        prefix="₹ "
        icon={Wallet}
        iconBg="bg-blue-100 text-blue-600"
        trend="+12%"
        delay={0}
      />

      <StatCard
        title="Income"
        value={summary.totalIncome}
        prefix="₹ "
        icon={IndianRupee}
        iconBg="bg-green-100 text-green-600"
        delay={0.1}
      />

      <StatCard
        title="Expenses"
        value={summary.totalExpense}
        prefix="₹ "
        icon={Receipt}
        iconBg="bg-red-100 text-red-600"
        delay={0.2}
      />

      <StatCard
        title="Transactions"
        value={summary.totalTransactions}
        icon={ArrowUpDown}
        iconBg="bg-purple-100 text-purple-600"
        delay={0.3}
      />
    </div>
  );
}

export default SummaryCards;