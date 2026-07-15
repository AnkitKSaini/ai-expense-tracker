import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
  CartesianGrid,
} from "recharts";

import { useDashboard } from "../../hooks/useDashboard";

function YearlyReport() {
const { data: dashboard } = useDashboard();
const data =
  dashboard?.incomeExpenseTrend ?? [];
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold dark:text-white">Yearly Trend</h2>

      <div className="h-80">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line type="monotone" dataKey="Expense" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default YearlyReport;
