import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import type { Goal } from "../../../types/goal";

interface Props {
  goals: Goal[];
}

function GoalStatusPie({ goals }: Props) {
  if (!goals.length) {
    return (
      <div className="flex h-380px items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white shadow-xl ring-1 ring-black/5 dark:ring-white/10 dark:border-gray-700 dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-4 text-5xl">🥧</div>

          <h3 className="text-xl font-bold dark:text-white">
            No Goal Statistics
          </h3>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Goal status distribution will appear here.
          </p>
        </div>
      </div>
    );
  }

  const completed = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  const active = goals.filter(
    (g) => g.savedAmount > 0 && g.savedAmount < g.targetAmount,
  ).length;

  const notStarted = goals.filter((g) => g.savedAmount === 0).length;

  const data = [
    {
      name: "Completed",
      value: completed,
      color: "#22c55e",
    },
    {
      name: "Active",
      value: active,
      color: "#3b82f6",
    },
    {
      name: "Not Started",
      value: notStarted,
      color: "#f97316",
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white">🥧 Goal Status</h2>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
          {goals.length} Goals
        </span>
      </div>

      <ResponsiveContainer width="100%" height={330}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={65}
            outerRadius={110}
            paddingAngle={4}
            animationDuration={1200}
            label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
          >
            {data.map((item) => (
              <Cell key={item.name} fill={item.color} />
            ))}
          </Pie>

          <Tooltip formatter={(value) => [Number(value), "Goals"]} />
          <Legend verticalAlign="bottom" height={40} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GoalStatusPie;
