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

import CustomTooltip from "./CustomTooltip";

import type { Investment } from "../../types/investment";

import { getGrowthData } from "../../utils/investmentChartData";

interface Props {
  investments: Investment[];
}

function PortfolioGrowthChart({ investments }: Props) {
  const data = getGrowthData(investments);

  if (!data.length) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow dark:border-gray-700 dark:bg-gray-900">
        <div className="flex h-80 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-5xl">📊</div>

            <h3 className="text-xl font-bold dark:text-white">No Chart Data</h3>

            <p className="mt-2 text-gray-500">
              Add investments to visualize analytics.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        📈 Portfolio Growth
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />

          <Tooltip content={<CustomTooltip />} />

          <Legend />

          <Line
            type="monotone"
            dataKey="invested"
            strokeWidth={3}
            dot={{
              r: 5,
            }}
            activeDot={{
              r: 8,
            }}
            animationDuration={1000}
            name="Invested"
          />

          <Line
            type="monotone"
            dataKey="current"
            strokeWidth={3}
            dot={{
              r: 5,
            }}
            activeDot={{
              r: 8,
            }}
            animationDuration={1000}
            name="Current Value"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PortfolioGrowthChart;
