import {
  TrendingUp,
  TrendingDown,
  Wallet,
  CalendarDays,
  Brain,
  Activity,
} from "lucide-react";

interface Expense {
  amount: number;
  type: "Income" | "Expense";
  date: string;
}

interface Props {
  expenses: Expense[];
}

function MonthlyAnalytics({ expenses }: Props) {
  const income = expenses
    .filter((e) => e.type === "Income")
    .reduce((sum, e) => sum + e.amount, 0);

  const expense = expenses
    .filter((e) => e.type === "Expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const savings = income - expense;

  const grouped = new Map<string, number>();

  expenses
    .filter((e) => e.type === "Expense")
    .forEach((item) => {
      const key = new Date(item.date).toDateString();

      grouped.set(
        key,
        (grouped.get(key) ?? 0) + item.amount,
      );
    });

  let highestDay = "-";
  let highestAmount = 0;

  grouped.forEach((value, key) => {
    if (value > highestAmount) {
      highestAmount = value;
      highestDay = key;
    }
  });

  const avgExpense =
    expense > 0
      ? expense / new Date().getDate()
      : 0;

  const score =
    income === 0
      ? 0
      : Math.max(
          0,
          Math.min(
            100,
            Math.round((savings / income) * 100),
          ),
        );

  const cards = [
    {
      title: "Income",
      value: `₹${income.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Expense",
      value: `₹${expense.toLocaleString()}`,
      icon: TrendingDown,
      color: "text-red-600",
    },
    {
      title: "Savings",
      value: `₹${savings.toLocaleString()}`,
      icon: Wallet,
      color: "text-blue-600",
    },
    {
      title: "Highest Day",
      value:
        highestDay === "-"
          ? "-"
          : new Date(highestDay).toLocaleDateString(),
      icon: CalendarDays,
      color: "text-purple-600",
    },
    {
      title: "Average / Day",
      value: `₹${avgExpense.toFixed(0)}`,
      icon: Activity,
      color: "text-orange-600",
    },
    {
      title: "AI Score",
      value: `${score}/100`,
      icon: Brain,
      color: "text-cyan-600",
    },
  ];

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        📊 Monthly Analytics
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold dark:text-white">
                  {card.title}
                </h3>

                <Icon
                  className={card.color}
                  size={22}
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

export default MonthlyAnalytics;