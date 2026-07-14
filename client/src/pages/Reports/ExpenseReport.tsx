import {
  Receipt,
} from "lucide-react";

import { useExpenses } from "../../hooks/useExpenses";
import type { Expense } from "../../types/expense";

function ExpenseReport() {

  const {
    expenses,
  } = useExpenses();

 const totalExpense = expenses.reduce(
  (sum: number, expense: Expense) => sum + expense.amount,
  0
);
  const highest =
    expenses.length
      ? Math.max(
          ...expenses.map(
  (e: Expense) => e.amount,
)
        )
      : 0;

  const average =
    expenses.length
      ? totalExpense /
        expenses.length
      : 0;

  return (

    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

      <div className="mb-6 flex items-center gap-3">

        <Receipt
          className="text-red-600"
          size={28}
        />

        <h2 className="text-2xl font-bold dark:text-white">
          Expense Report
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div>

          <p className="text-gray-500">
            Total Expense
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-600">
            ₹
            {totalExpense.toLocaleString(
              "en-IN",
            )}
          </h2>

        </div>

        <div>

          <p className="text-gray-500">
            Highest Expense
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            ₹
            {highest.toLocaleString(
              "en-IN",
            )}
          </h2>

        </div>

        <div>

          <p className="text-gray-500">
            Average
          </p>

          <h2 className="mt-2 text-3xl font-bold">

            ₹
            {average.toFixed(0)}

          </h2>

        </div>

      </div>

    </div>

  );

}

export default ExpenseReport;