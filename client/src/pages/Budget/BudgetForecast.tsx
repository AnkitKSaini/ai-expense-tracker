import {
  Wallet,
  CalendarDays,
  Flame,
  Target,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

interface Expense {
  amount: number;
  type: "income" | "expense";
}

interface Props {
  expenses: Expense[];
  budget: number;
}

function BudgetForecast({
  expenses,
  budget,
}: Props) {
  const today = new Date();

  const totalDays = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();

  const currentDay = today.getDate();

  const daysRemaining = Math.max(
    totalDays - currentDay,
    0,
  );

  const totalExpense = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const dailyAverage =
    currentDay > 0
      ? totalExpense / currentDay
      : 0;

  const predictedExpense =
    Math.round(dailyAverage * totalDays);

  const safeDailySpend =
    daysRemaining > 0
      ? Math.max(
          (budget - totalExpense) / daysRemaining,
          0,
        )
      : 0;

  const progress =
    budget > 0
      ? Math.min(
          (totalExpense / budget) * 100,
          100,
        )
      : 0;

  const status =
    predictedExpense > budget
      ? "Over Budget"
      : "On Track";

  const statusColor =
    predictedExpense > budget
      ? "text-red-600"
      : "text-green-600";

  const cards = [
    {
      title: "Safe Daily Spend",
      value: `₹${safeDailySpend.toFixed(0)}`,
      icon: Wallet,
      color: "text-blue-600",
    },
    {
      title: "Days Remaining",
      value: `${daysRemaining} Days`,
      icon: CalendarDays,
      color: "text-purple-600",
    },
    {
      title: "Burn Rate",
      value: `${progress.toFixed(0)}%`,
      icon: Flame,
      color: "text-orange-600",
    },
    {
      title: "Budget Progress",
      value: `${progress.toFixed(0)}%`,
      icon: Target,
      color: "text-cyan-600",
    },
    {
      title: "Forecast",
      value: `₹${predictedExpense.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-indigo-600",
    },
    {
      title: "Status",
      value: status,
      icon: ShieldCheck,
      color: statusColor,
    },
  ];

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        🔮 Budget Forecast
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold dark:text-white">
                  {card.title}
                </h3>

                <Icon
                  size={22}
                  className={card.color}
                />
              </div>

              <p
                className={`mt-4 text-2xl font-bold ${card.color}`}
              >
                {card.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetForecast;