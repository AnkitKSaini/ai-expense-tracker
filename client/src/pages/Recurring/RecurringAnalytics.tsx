import {
  Activity,
  CalendarRange,
  BadgeCheck,
  Wallet,
} from "lucide-react";

import type { RecurringTransaction } from "../../types/recurring";

interface Props {
  recurring: RecurringTransaction[];
}

function RecurringAnalytics({
  recurring,
}: Props) {
  const active =
    recurring.filter(
      (item) => item.isActive,
    ).length;

  const inactive =
    recurring.length - active;

  const monthly =
    recurring.filter(
      (item) =>
        item.frequency === "Monthly",
    ).length;

  const cashFlow = recurring.reduce(
    (total, item) =>
      item.type === "Income"
        ? total + item.amount
        : total - item.amount,
    0,
  );

  const analytics = [
    {
      title: "Active",
      value: active,
      icon: BadgeCheck,
      color:
        "bg-green-100 text-green-600 dark:bg-green-900/30",
    },
    {
      title: "Inactive",
      value: inactive,
      icon: Activity,
      color:
        "bg-red-100 text-red-600 dark:bg-red-900/30",
    },
    {
      title: "Monthly Plans",
      value: monthly,
      icon: CalendarRange,
      color:
        "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
    },
    {
      title: "Cash Flow",
      value: `₹${cashFlow.toLocaleString(
        "en-IN",
      )}`,
      icon: Wallet,
      color:
        "bg-violet-100 text-violet-600 dark:bg-violet-900/30",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {analytics.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
          >
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
            >
              <Icon size={28} />
            </div>

            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              {item.title}
            </h3>

            <p className="mt-2 text-3xl font-bold dark:text-white">
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default RecurringAnalytics;