import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import type { Investment } from "../../types/investment";

import {
  getRiskDistributionData,
} from "../../utils/investmentChartData";

import CustomTooltip from "./CustomTooltip";

interface Props {
  investments: Investment[];
}

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

function RiskDistributionChart({
  investments,
}: Props) {
  const data =
    getRiskDistributionData(
      investments,
    );

  if (!data.length) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow dark:border-gray-700 dark:bg-gray-900">
        No risk data available.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">

      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        ⚠️ Risk Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={3}
            animationDuration={1200}
            label
          >
            {data.map(
              (entry, index) => (
                <Cell
                  key={entry.name}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              ),
            )}
          </Pie>

          <Tooltip
            content={<CustomTooltip />}
          />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default RiskDistributionChart;