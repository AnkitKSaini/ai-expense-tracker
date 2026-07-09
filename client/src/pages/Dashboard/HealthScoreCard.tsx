import { motion } from "framer-motion";
import {
  HeartPulse,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Brain,
} from "lucide-react";

interface Props {
  score: number;
  level: "Excellent" | "Good" | "Average" | "Poor";
  savingRate: number;
  expenseRatio: number;
  budgetStatus: "Safe" | "Warning" | "Critical";
  investmentReady: boolean;
  emergencyFund: "Good" | "Average" | "Poor";
  aiConfidence: number;
  message: string;
}

function HealthScoreCard({
  score,
  level,
  savingRate,
  expenseRatio,
  budgetStatus,
  investmentReady,
  emergencyFund,
  aiConfidence,
  message,
}: Props) {
  const progressColor =
    score >= 85
      ? "bg-green-500"
      : score >= 70
      ? "bg-blue-500"
      : score >= 50
      ? "bg-yellow-500"
      : "bg-red-500";

  const levelColor =
    score >= 85
      ? "text-green-600"
      : score >= 70
      ? "text-blue-600"
      : score >= 50
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-red-100 p-3 text-red-600">
          <HeartPulse size={26} />
        </div>

        <div>
          <h2 className="text-xl font-bold dark:text-white">
            Financial Health
          </h2>

          <p className="text-sm text-gray-500">
            AI Powered Financial Analysis
          </p>
        </div>
      </div>

      {/* Score */}
      <div className="mt-8 text-center">
        <h1 className="text-6xl font-extrabold dark:text-white">
          {score}
        </h1>

        <p className={`mt-2 text-lg font-semibold ${levelColor}`}>
          {level}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1 }}
            className={`h-full rounded-full ${progressColor}`}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <MetricCard
          icon={<TrendingUp size={18} />}
          title="Saving Rate"
          value={`${savingRate}%`}
        />

        <MetricCard
          icon={<Wallet size={18} />}
          title="Expense Ratio"
          value={`${expenseRatio}%`}
        />

        <MetricCard
          icon={<ShieldCheck size={18} />}
          title="Budget Status"
          value={budgetStatus}
        />

        <MetricCard
          icon={<Brain size={18} />}
          title="AI Confidence"
          value={`${aiConfidence}%`}
        />
      </div>

      {/* Status */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <p className="text-sm text-gray-500">
            Investment Ready
          </p>

          <p className="mt-2 text-lg font-bold dark:text-white">
            {investmentReady ? "✅ Yes" : "❌ No"}
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <p className="text-sm text-gray-500">
            Emergency Fund
          </p>

          <p className="mt-2 text-lg font-bold dark:text-white">
            {emergencyFund}
          </p>
        </div>
      </div>

      {/* AI Message */}
      <div className="mt-8 rounded-xl border-l-4 border-blue-500 bg-blue-50 p-5 dark:bg-blue-900/20">
        <h3 className="mb-2 font-semibold text-blue-700 dark:text-blue-300">
          🤖 AI Recommendation
        </h3>

        <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
          {message}
        </p>
      </div>
    </motion.div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function MetricCard({
  icon,
  title,
  value,
}: MetricCardProps) {
  return (
    <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}

        <span className="text-sm">{title}</span>
      </div>

      <h3 className="mt-3 text-xl font-bold dark:text-white">
        {value}
      </h3>
    </div>
  );
}

export default HealthScoreCard;