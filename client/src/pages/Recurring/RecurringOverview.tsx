import { Repeat, TrendingUp, TrendingDown, CalendarClock } from "lucide-react";

import type { RecurringTransaction } from "../../types/recurring";

interface Props {
  recurring: RecurringTransaction[];
}

function RecurringOverview({ recurring }: Props) {
  const totalRecurring = recurring.length;

  const monthlyIncome = recurring
    .filter((item) => item.type === "Income" && item.isActive)
    .reduce((sum, item) => sum + item.amount, 0);

  const monthlyExpense = recurring
    .filter((item) => item.type === "Expense" && item.isActive)
    .reduce((sum, item) => sum + item.amount, 0);

  const nextDue = recurring
    .filter((item) => item.isActive)
    .sort(
      (a, b) => new Date(a.nextRun).getTime() - new Date(b.nextRun).getTime(),
    )[0];

  const overdue = recurring.filter(
    (item) => item.isActive && new Date(item.nextRun) < new Date(),
  ).length;

  const cards = [
    {
      title: "Recurring",
      value: totalRecurring,
      icon: Repeat,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Income",
      value: `₹${monthlyIncome.toLocaleString("en-IN")}`,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Expense",
      value: `₹${monthlyExpense.toLocaleString("en-IN")}`,
      icon: TrendingDown,
      color: "from-red-500 to-rose-500",
    },
    {
      title: "Next Due",
      value: nextDue
        ? new Date(nextDue.nextRun).toLocaleDateString("en-IN")
        : "--",
      icon: CalendarClock,
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Overdue",
      value: overdue,
      icon: CalendarClock,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
          >
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r ${card.color} text-white shadow-lg`}
            >
              <Icon size={28} />
            </div>

            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              {card.title}
            </h3>

            <p className="mt-2 text-3xl font-bold dark:text-white">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default RecurringOverview;
