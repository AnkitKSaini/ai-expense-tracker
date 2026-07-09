interface Props {
  budget: number;
  spent: number;
}

function BudgetProgress({ budget, spent }: Props) {
  const remaining = budget - spent;

  const percentage =
    budget > 0 ? (spent / budget) * 100 : 0;

  const progressWidth = Math.min(percentage, 100);

  let status = "Safe";
  let color = "bg-green-500";
  let badge =
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

  if (percentage >= 100) {
    status = "Budget Exceeded";
    color = "bg-red-500";
    badge =
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  } else if (percentage >= 80) {
    status = "Warning";
    color = "bg-yellow-500";
    badge =
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        📊 Budget Progress
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">
            Budget
          </span>

          <span className="font-semibold dark:text-white">
            ₹{budget.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">
            Spent
          </span>

          <span className="font-semibold text-red-600">
            ₹{spent.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">
            Remaining
          </span>

          <span className="font-semibold text-green-600">
            ₹{remaining.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`${color} h-full rounded-full transition-all duration-700`}
          style={{
            width: `${progressWidth}%`,
          }}
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-medium text-blue-600">
          {percentage.toFixed(1)}%
        </span>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${badge}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default BudgetProgress;