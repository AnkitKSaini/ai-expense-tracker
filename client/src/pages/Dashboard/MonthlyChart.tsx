import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  data: {
    month: string;
    total: number;
  }[];
}

function MonthlyChart({ data }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Monthly Expenses
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Expense trend across the year
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="5 5" vertical={false} />

          <XAxis dataKey="month" tickLine={false} axisLine={false} />

          <YAxis tickLine={false} axisLine={false} />

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString()}`,
              "Expense",
            ]}
          />

          <Area
            type="monotone"
            dataKey="total"
            fill="#93c5fd"
            fillOpacity={0.4}
            stroke="none"
          />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#2563eb",
            }}
            activeDot={{
              r: 7,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;
