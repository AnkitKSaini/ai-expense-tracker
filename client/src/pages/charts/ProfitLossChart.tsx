import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";

import CustomTooltip from "./CustomTooltip";

import type { Investment } from "../../types/investment";
import { getProfitLossData } from "../../utils/investmentChartData";

interface Props {
  investments: Investment[];
}

function ProfitLossChart({ investments }: Props) {
  const data = getProfitLossData(investments);

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
        📊 Profit vs Loss
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" opacity={0.3} />

          <XAxis
            dataKey="name"
            interval={0}
            tick={{
              fontSize: 12,
            }}
          />

          <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />

          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="profit" radius={[8, 8, 0, 0]} animationDuration={1000}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.profit >= 0 ? "#22c55e" : "#ef4444"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProfitLossChart;
