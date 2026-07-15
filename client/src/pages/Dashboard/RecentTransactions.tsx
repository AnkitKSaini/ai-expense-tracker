import type { Expense } from "../../types/expense";

interface Props {
  expenses: Expense[];
}

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

function RecentTransactions({ expenses }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Transactions
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your latest income and expense records
        </p>
      </div>
      <div className="max-h-420px space-y-3 overflow-y-auto pr-2">
        {expenses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              No recent transactions found.
            </p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense._id}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition-all hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
            >
              <div>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                    expense.type === "Income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {expense.type === "Income" ? "Income" : "Expense"}
                </span>
                <h3 className="font-medium">{expense.title}</h3>

                <span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {expense.category}
                </span>
              </div>

              <div className="text-right">
                <p
                  className={
                    expense.type === "Income"
                      ? "font-bold text-green-600"
                      : "font-bold text-red-600"
                  }
                >
                  {expense.type === "Income" ? "+" : "-"}₹
                  {expense.amount.toLocaleString()}
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(expense.date)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentTransactions;
