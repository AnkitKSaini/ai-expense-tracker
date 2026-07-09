import {
  Wallet,
  TrendingDown,
  PiggyBank,
  AlertTriangle,
} from "lucide-react";

interface Props {
  budget: number;
  spent: number;
}

function BudgetSummaryCard({ budget, spent }: Props) {
  const remaining = Math.max(0, budget - spent);
  const overspent = Math.max(0, spent - budget);

  const today = new Date();

  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();

  const daysLeft = Math.max(1, daysInMonth - today.getDate());

  const dailyBudget =
    remaining > 0 ? remaining / daysLeft : 0;

  const percentage =
    budget > 0
      ? Math.min((spent / budget) * 100, 100)
      : 0;

  let status = "Safe";
  let statusColor =
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

  let progressColor = "bg-green-600";

  if (spent > budget) {
    status = "Over Budget";
    statusColor =
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    progressColor = "bg-red-600";
  } else if (percentage >= 80) {
    status = "Warning";
    statusColor =
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    progressColor = "bg-yellow-500";
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">
            💰 Monthly Budget
          </h2>

          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Budget Overview
          </p>
        </div>

        <Wallet size={40} className="text-blue-600" />
      </div>

      {/* Budget Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-950/40">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Budget
          </p>

          <h3 className="mt-2 text-3xl font-bold text-blue-600">
            ₹{budget.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-2xl bg-red-50 p-5 dark:bg-red-950/40">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Spent
          </p>

          <h3 className="mt-2 text-3xl font-bold text-red-600">
            ₹{spent.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-2xl bg-green-50 p-5 dark:bg-green-950/40">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Remaining
          </p>

          <h3 className="mt-2 text-3xl font-bold text-green-600">
            ₹{remaining.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium dark:text-white">
            Budget Usage
          </span>

          <span className="font-semibold text-blue-600">
            {percentage.toFixed(1)}%
          </span>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      {/* Status */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div
          className={`rounded-full px-4 py-2 text-sm font-semibold ${statusColor}`}
        >
          <AlertTriangle size={16} className="mr-2 inline" />
          {status}
        </div>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <TrendingDown size={18} />
          ₹{spent.toLocaleString()} spent
        </div>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <PiggyBank size={18} />
          ₹{remaining.toLocaleString()} left
        </div>
      </div>

      {/* Extra Info */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-indigo-50 p-5 dark:bg-indigo-950/30">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Days Remaining
          </p>

          <h3 className="mt-2 text-3xl font-bold text-indigo-600">
            {daysLeft}
          </h3>
        </div>

        <div className="rounded-2xl bg-cyan-50 p-5 dark:bg-cyan-950/30">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Safe Daily Spending
          </p>

          <h3 className="mt-2 text-3xl font-bold text-cyan-600">
            ₹{dailyBudget.toFixed(0)}
          </h3>
        </div>
      </div>

      {/* Overspent Alert */}
      {overspent > 0 && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
          <p className="font-semibold text-red-700 dark:text-red-400">
            ⚠️ You have exceeded your monthly budget by ₹
            {overspent.toLocaleString()}.
          </p>
        </div>
      )}
    </div>
  );
}

export default BudgetSummaryCard;