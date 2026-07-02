import type { Expense } from "../../types/expense";

interface Props {
  expenses: Expense[];
}

function RecentTransactions({ expenses }: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Transactions
      </h2>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense._id}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <h3 className="font-medium">
                {expense.title}
              </h3>

              <p className="text-sm text-gray-500">
                {expense.category}
              </p>
            </div>

            <div
              className={
                expense.type === "income"
                  ? "font-bold text-green-600"
                  : "font-bold text-red-600"
              }
            >
              ₹ {expense.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;