import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import type { Investment } from "../../types/investment";

import {
  getGrowthData,
} from "../../utils/investmentChartData";

interface Props {
  investments: Investment[];
}

function PortfolioGrowthChart({
  investments,
}: Props) {
  const data =
    getGrowthData(
      investments,
    );

  if (!data.length) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow dark:border-gray-700 dark:bg-gray-900">
        No investment data.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">

      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        📈 Portfolio Growth
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="name"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="invested"
            stroke="#2563eb"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="current"
            stroke="#22c55e"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default PortfolioGrowthChart;