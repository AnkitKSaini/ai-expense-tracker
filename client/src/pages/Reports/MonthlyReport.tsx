import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useDashboard } from "../../hooks/useDashboard";

function MonthlyReport() {
const { data: dashboard } = useDashboard();
  const data =
    dashboard?.monthlyExpense ?? [];

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        Monthly Expense Report
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="total"
              radius={[8,8,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default MonthlyReport;