import DashboardHeader from "../Dashboard/DashboardHeader";
import { Wallet, IndianRupee, Receipt, ArrowUpDown } from "lucide-react";
import StatCard from "../Dashboard/StatCard";
import RecentTransactions from "../Dashboard/RecentTransactions";
import AIInsights from "../Dashboard/AIInsights";

import { useDashboard } from "../../hooks/useDashboard";
import DashboardAnalytics from "../Dashboard/DashboardAnalytics";
import { motion } from "framer-motion";
import DashboardSkeleton from "../Dashboard/DashboardSkeleton";

import HealthScoreCard from "../Dashboard/HealthScoreCard";

import RiskMeterCard from "../Dashboard/RiskMeterCard";

import ForecastCard from "../Dashboard/ForecastCard";

import UpcomingRecurring from "../../pages/Dashboard/UpcomingRecurring";

import UpcomingBills from "../../pages/Bills/UpcomingBillsWidget";

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

  const incomeExpenseData = months.map((month, index) => {
    const item = data?.incomeExpenseTrend.find(
      (trend) => trend.month === index + 1,
    );
    

    return {
      month,
      income: item?.income ?? 0,
      expense: item?.expense ?? 0,
    };
  });

  if (isPending) {
    return (
      <div className="p-6">
        <DashboardSkeleton />
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <DashboardHeader />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Balance"
          value={data.balance}
          prefix="₹"
          icon={Wallet}
          iconBg="bg-blue-100 text-blue-600"
          trend="+12%"
          delay={0}
        />

        <StatCard
          title="Income"
          value={data.totalIncome}
          prefix="₹"
          icon={IndianRupee}
          iconBg="bg-green-100 text-green-600"
          delay={0.1}
        />

        <StatCard
          title="Expenses"
          value={data.totalExpense}
          prefix="₹"
          icon={Receipt}
          iconBg="bg-red-100 text-red-600"
          delay={0.2}
        />

        <StatCard
          title="Transactions"
          value={data.totalTransactions}
          icon={ArrowUpDown}
          iconBg="bg-purple-100 text-purple-600"
          delay={0.3}
        />
      </div>

      <div className="mt-6">
        <DashboardAnalytics
          monthlyData={monthlyData}
          categoryData={data.categoryWiseExpense}
          incomeExpenseData={incomeExpenseData}
        />
      </div>
      <UpcomingRecurring />
      <UpcomingBills />

      <div className="mt-6">
        <RecentTransactions expenses={data.recentTransactions} />
      </div>

      <div className="mt-6">
        <HealthScoreCard
          score={data.financialHealth.score}
          level={data.financialHealth.level}
          savingRate={data.financialHealth.savingRate}
          expenseRatio={data.financialHealth.expenseRatio}
          budgetStatus={data.financialHealth.budgetStatus}
          investmentReady={data.financialHealth.investmentReady}
          emergencyFund={data.financialHealth.emergencyFund}
          aiConfidence={data.financialHealth.aiConfidence}
          message={data.financialHealth.message}
        />
      </div>

      <div className="mt-6">
        <RiskMeterCard
          riskScore={data.financialHealth.riskScore}
          riskLevel={data.financialHealth.riskLevel}
        />
      </div>

      <div className="mt-6">
  <ForecastCard
    predictedExpense={data.prediction.predictedExpense}
    predictedIncome={data.prediction.predictedIncome}
    predictedSaving={data.prediction.predictedSaving}
    confidence={data.prediction.confidence}
    trend={data.prediction.trend}
  />
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

      
    </motion.div>
  );
}

export default Dashboard;
