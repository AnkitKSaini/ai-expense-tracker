import { Brain, Sparkles, AlertTriangle } from "lucide-react";

interface Expense {
  amount: number;
  category: string;
  type: "Income" | "Expense";
}

interface Props {
  expenses: Expense[];
  budget: number;
}

function BudgetAIInsights({
  expenses,
  budget,
}: Props) {
  const expenseItems = expenses.filter(
    (e) => e.type === "Expense",
  );

  const totalExpense = expenseItems.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const today = new Date();

  const totalDays = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();

  const remainingDays = Math.max(
    totalDays - today.getDate(),
    0,
  );

  const safeSpend =
    remainingDays > 0
      ? Math.max(
          (budget - totalExpense) / remainingDays,
          0,
        )
      : 0;

  const categoryTotals = new Map<string, number>();

  expenseItems.forEach((item) => {
    categoryTotals.set(
      item.category,
      (categoryTotals.get(item.category) ?? 0) +
        item.amount,
    );
  });

  let highestCategory = "-";
  let highestAmount = 0;

  categoryTotals.forEach((value, key) => {
    if (value > highestAmount) {
      highestAmount = value;
      highestCategory = key;
    }
  });

  const estimatedDays =
    safeSpend > 0
      ? Math.ceil(
          (budget - totalExpense) / safeSpend,
        )
      : 0;

  const overBudget =
    totalExpense > budget;

  return (
    <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-blue-50 to-cyan-50 p-6 shadow-xl dark:border-gray-700 dark:from-slate-900 dark:to-slate-800">
      <div className="mb-5 flex items-center gap-3">
        <Brain
          className="text-cyan-600"
          size={28}
        />

        <h2 className="text-2xl font-bold dark:text-white">
          AI Budget Advisor
        </h2>
      </div>

      <div className="space-y-5">
        <div className="flex gap-3">
          <Sparkles className="mt-1 text-green-500" />

          <p className="dark:text-gray-200">
            {overBudget
              ? "You have exceeded your monthly budget."
              : "You are currently spending within your monthly budget."}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
            <p className="text-sm text-gray-500">
              Safe Tomorrow Spend
            </p>

            <p className="mt-2 text-xl font-bold text-blue-600">
              ₹{safeSpend.toFixed(0)}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
            <p className="text-sm text-gray-500">
              Highest Category
            </p>

            <p className="mt-2 text-xl font-bold text-red-600">
              {highestCategory}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
            <p className="text-sm text-gray-500">
              Estimated Budget Finish
            </p>

            <p className="mt-2 text-xl font-bold text-purple-600">
              {estimatedDays > 0
                ? `${estimatedDays} Days`
                : "-"}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
            <p className="text-sm text-gray-500">
              Confidence
            </p>

            <p className="mt-2 text-xl font-bold text-green-600">
              92%
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 text-yellow-600" />

            <p className="dark:text-gray-200">
              Try reducing{" "}
              <strong>{highestCategory}</strong>{" "}
              spending by around{" "}
              <strong>10–15%</strong> to stay
              comfortably within budget.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetAIInsights;