import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface Props {
  data: {
    month: string;
    income: number;
    expense: number;
  }[];
}

function IncomeExpenseChart({ data }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Income vs Expense
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Monthly Income compared with Expenses
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="5 5" vertical={false} />

          <XAxis dataKey="month" tickLine={false} axisLine={false} />

          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value / 1000}k`}
          />

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString()}`,
              "Expense",
            ]}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#22C55E"
            strokeWidth={3}
            dot={{
              r: 4,
            }}
            activeDot={{
              r: 7,
            }}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            strokeWidth={3}
            dot={{
              r: 4,
            }}
            activeDot={{
              r: 7,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeExpenseChart;
