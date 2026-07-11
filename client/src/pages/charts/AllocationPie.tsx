import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { Investment } from "../../types/investment";

import {
  getAllocationData,
} from "../../utils/investmentChartData";

interface Props {
  investments: Investment[];
}

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f97316",
  "#a855f7",
  "#ef4444",
  "#06b6d4",
  "#facc15",
];

function AssetAllocationChart({
  investments,
}: Props) {
  const data =
    getAllocationData(
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

        🥧 Asset Allocation

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
            outerRadius={110}
            label
          >

            {data.map(
              (
                entry,
                index,
              ) => (
                <Cell
                  key={
                    entry.name
                  }
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

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AssetAllocationChart;