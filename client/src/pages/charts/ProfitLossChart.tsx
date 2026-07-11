import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import type { Investment } from "../../types/investment";
import { getProfitLossData } from "../../utils/investmentChartData";

interface Props {
  investments: Investment[];
}

function ProfitLossChart({
  investments,
}: Props) {
  const data = getProfitLossData(investments);

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
        📊 Profit vs Loss
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
          />

          <XAxis
            dataKey="name"
            tick={{
              fontSize: 12,
            }}
            interval={0}
            angle={-20}
            textAnchor="end"
          />

          <YAxis
            tickFormatter={(value) => `₹${value}`}
          />

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString("en-IN")}`,
              "Profit / Loss",
            ]}
            contentStyle={{
              borderRadius: 16,
              border: "none",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.15)",
            }}
          />

          <Bar
            dataKey="profit"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  entry.profit >= 0
                    ? "#22c55e"
                    : "#ef4444"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProfitLossChart;