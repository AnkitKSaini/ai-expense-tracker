interface CategoryExpense {
  category: string;
  total: number;
}

interface MonthlyExpense {
  month: number;
  total: number;
}

interface Props {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  categoryWiseExpense: CategoryExpense[];
  monthlyExpense: MonthlyExpense[];
}

function AIInsights({
  balance,
  totalIncome,
  totalExpense,
  categoryWiseExpense,
  monthlyExpense,
}: Props) {
  const savings =
    totalIncome > 0
      ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
      : "0";

  const topCategory =
    categoryWiseExpense.length > 0
      ? categoryWiseExpense[0]
      : null;

  const sortedMonths = [...monthlyExpense].sort(
    (a, b) => a.month - b.month
  );

  const lastMonth =
    sortedMonths.length >= 2
      ? sortedMonths[sortedMonths.length - 2]
      : null;

  const currentMonth =
    sortedMonths.length > 0
      ? sortedMonths[sortedMonths.length - 1]
      : null;

  let trend = "";

  if (lastMonth && currentMonth) {
    if (currentMonth.total > lastMonth.total) {
      trend =
        "📈 Your expenses increased compared to the previous month.";
    } else if (currentMonth.total < lastMonth.total) {
      trend =
        "📉 Great! Your expenses decreased compared to the previous month.";
    } else {
      trend =
        "➖ Your spending is almost the same as last month.";
    }
  }

  let health = "";

  if (balance < 0) {
    health =
      "⚠️ Your expenses are higher than your income.";
  } else if (
    totalIncome > 0 &&
    totalExpense > totalIncome * 0.8
  ) {
    health =
      "💡 You are spending more than 80% of your income.";
  } else {
    health =
      "✅ Your finances look healthy.";
  }

  return (
 <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
  <div className="mb-6">
  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
    🤖 AI Financial Insights
  </h2>

  <p className="text-sm text-gray-500 dark:text-gray-400">
    Personalized insights based on your spending habits
  </p>
</div>

<div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 md:text-base">
         <div
  className={`rounded-xl border-l-4 p-4 ${
    balance < 0
      ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
      : "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
  }`}
>
  <p className="font-medium">{health}</p>
</div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      💰 Balance
    </p>

    <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
      ₹{balance.toLocaleString()}
    </h3>
  </div>

  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      📊 Savings Rate
    </p>

    <h3 className="mt-2 text-2xl font-bold text-green-600">
      {savings}%
    </h3>
  </div>

  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      🍔 Highest Spending
    </p>

    <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
      {topCategory ? topCategory.category : "-"}
    </h3>

    {topCategory && (
      <p className="text-sm text-red-500">
        ₹{topCategory.total.toLocaleString()}
      </p>
    )}
  </div>

  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      📈 Trend
    </p>

    <p className="mt-2 font-semibold text-gray-900 dark:text-white">
      {trend || "No trend available"}
    </p>
  </div>

</div>
          

        <hr className="border-blue-300" />

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-900/20">

  <h3 className="mb-3 text-lg font-semibold text-amber-700 dark:text-amber-300">
    💡 AI Recommendation
  </h3>

  <p className="text-gray-700 dark:text-gray-300">
    {balance < 0
      ? "Reduce non-essential expenses and try to increase your monthly income."
      : topCategory
      ? `Focus on reducing ${topCategory.category} expenses to improve your savings.`
      : "Keep tracking your expenses regularly."}
  </p>

</div>
      </div>
    </div>
  );
}

export default AIInsights;