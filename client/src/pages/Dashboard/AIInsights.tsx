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
    <div className="rounded-xl bg-blue-600 p-6 text-white shadow-lg">
      <h2 className="mb-5 text-2xl font-bold">
        🤖 AI Financial Insights
      </h2>

      <div className="space-y-3 text-sm md:text-base">
        <p>{health}</p>

        <p>
          💰 Current Balance:
          <strong> ₹{balance}</strong>
        </p>

        <p>
          📊 Savings Rate:
          <strong> {savings}%</strong>
        </p>

        {topCategory && (
          <p>
            🍔 Highest Spending Category:
            <strong>
              {" "}
              {topCategory.category}
            </strong>{" "}
            (₹{topCategory.total})
          </p>
        )}

        {trend && <p>{trend}</p>}

        <hr className="border-blue-300" />

        <p>
          🎯 Recommendation:
        </p>

        {balance < 0 ? (
          <p>
            Reduce non-essential expenses and try to
            increase your monthly income.
          </p>
        ) : topCategory ? (
          <p>
            Consider optimizing your{" "}
            <strong>{topCategory.category}</strong>{" "}
            expenses to improve savings.
          </p>
        ) : (
          <p>
            Keep tracking your expenses regularly.
          </p>
        )}
      </div>
    </div>
  );
}

export default AIInsights;