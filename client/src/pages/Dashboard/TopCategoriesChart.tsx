import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

interface Props {
  data: {
    category: string;
    total: number;
  }[];
}

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

function TopCategoriesChart({ data }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Top Spending Categories
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Highest spending categories
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            horizontal={false}
          />

          <XAxis
            type="number"
            tickFormatter={(value) => `₹${value / 1000}k`}
          />

          <YAxis
            dataKey="category"
            type="category"
            width={100}
          />

         <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString()}`,
              "Expense",
            ]}
          />

          <Bar
            dataKey="total"
            radius={[0, 8, 8, 0]}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopCategoriesChart;