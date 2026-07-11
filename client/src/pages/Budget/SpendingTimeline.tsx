import { TrendingUp } from "lucide-react";

interface Expense {
  amount: number;
  type: "income" | "expense";
  date: string;
}

interface Props {
  expenses: Expense[];
}

function SpendingTimeline({ expenses }: Props) {
  const expenseDays = expenses
    .filter((e) => e.type === "expense")
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime(),
    );

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-6 flex items-center gap-3">
        <TrendingUp className="text-blue-600" />

        <h2 className="text-xl font-bold dark:text-white">
          Spending Timeline
        </h2>
      </div>

      {expenseDays.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No expenses available this month.
        </p>
      ) : (
        <>
          <div className="flex items-center gap-2 overflow-x-auto pb-4">
            {expenseDays.map((item, index) => (
              <div
                key={index}
                className="flex items-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow">
                  {new Date(item.date).getDate()}
                </div>

                {index !== expenseDays.length - 1 && (
                  <div className="h-1 w-14 bg-blue-300 dark:bg-blue-700" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-6 overflow-x-auto">
            {expenseDays.map((item, index) => (
              <div
                key={index}
                className="min-w-70px text-center"
              >
                <p className="text-sm font-bold text-red-600">
                  ₹{item.amount}
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {new Date(item.date).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                    },
                  )}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SpendingTimeline;