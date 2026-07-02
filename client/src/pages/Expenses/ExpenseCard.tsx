import type { Expense } from "../../types/expense";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Props {
  expense: Expense;
  onEdit?: (expense: Expense) => void;
  onDelete?: (id: string) => void;
}

function ExpenseCard({
  expense,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow transition hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-lg font-semibold">
            {expense.title}
          </h3>

          <span className="mt-1 inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
            {expense.category}
          </span>
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

      <div className="mt-4 flex items-center justify-between">

        <span className="text-sm text-gray-500">
          {new Date(expense.date).toLocaleDateString()}
        </span>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit?.(expense)}
            className="rounded bg-yellow-100 p-2 text-yellow-700 hover:bg-yellow-200"
          >
            <FiEdit2 />
          </button>

          <button
            onClick={() => onDelete?.(expense._id)}
            className="rounded bg-red-100 p-2 text-red-700 hover:bg-red-200"
          >
            <FiTrash2 />
          </button>

        </div>

      </div>

    </div>
  );
}

export default ExpenseCard;