import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";

import { useExpenses } from "../../hooks/useExpenses";
import type { Expense } from "../../types/expense";

function CategoryChart() {
  const { expenses } = useExpenses();

  const categories = Object.values(
    expenses.reduce(
      (
        acc: Record<string, { name: string; value: number }>,
        expense: Expense,
      ) => {
        if (!acc[expense.category]) {
          acc[expense.category] = {
            name: expense.category,
            value: 0,
          };
        }

        acc[expense.category].value += expense.amount;

        return acc;
      },
      {},
    ),
  );

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        Category Distribution
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={categories}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
            />

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CategoryChart;
