import type { Expense } from "../../types/expense";

interface Props {
  expense: Expense;
}

function ExpenseCard({ expense }: Props) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {expense.title}
        </h3>

        <span
          className={
            expense.type === "income"
              ? "text-green-600 font-bold"
              : "text-red-600 font-bold"
          }
        >
          ₹ {expense.amount}
        </span>
      </div>

      <p className="mt-2 text-gray-500">
        {expense.category}
      </p>

      <p className="text-sm text-gray-400">
        {new Date(expense.date).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ExpenseCard;