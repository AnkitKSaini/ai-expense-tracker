import { Wallet } from "lucide-react";
import { useBudget } from "../../hooks/useBudget";

function BudgetReport() {
  const { budget } = useBudget();

  if (!budget) return null;

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 flex items-center gap-3">
        <Wallet className="text-blue-600" size={28} />

        <h2 className="text-2xl font-bold dark:text-white">
          Budget Report
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-gray-500">Budget</p>

          <h2 className="mt-2 text-3xl font-bold">
            ₹{budget.amount.toLocaleString("en-IN")}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Month</p>

          <h2 className="mt-2 text-3xl font-bold">
            {budget.month}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Year</p>

          <h2 className="mt-2 text-3xl font-bold">
            {budget.year}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default BudgetReport;