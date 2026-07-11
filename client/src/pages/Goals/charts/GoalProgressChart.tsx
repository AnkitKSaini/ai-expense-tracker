import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Cell,
} from "recharts";

import type { Goal } from "../../../types/goal";

interface Props {
  goals: Goal[];
}

function GoalProgressChart({ goals }: Props) {
  if (!goals.length) {
    return (
      <div className="flex h-380px items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-4 text-5xl">📈</div>

          <h3 className="text-xl font-bold dark:text-white">
            No Goal Progress
          </h3>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Create your first financial goal to see progress analytics.
          </p>
        </div>
      </div>
    );
  }

  const data = goals.map((goal) => ({
    name: goal.title.length > 12 ? `${goal.title.slice(0, 12)}...` : goal.title,
    progress: Number(((goal.savedAmount / goal.targetAmount) * 100).toFixed(1)),
  }));

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl ring-1 ring-black/5 dark:ring-white/10 dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white">📈 Goal Progress</h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {goals.length} Goals
        </span>
      </div>
      <ResponsiveContainer
        width="100%"
        height={window.innerWidth < 640 ? 260 : 330}
      >
        {" "}
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.25} />

          <XAxis
            dataKey="name"
            tick={{
              fontSize: 12,
            }}
          />

          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />

          <Tooltip
            cursor={{
              fill: "#eff6ff",
            }}
            formatter={(value) => [`${Number(value)}%`, "Progress"]}
          />

          <Bar
            dataKey="progress"
            radius={[10, 10, 0, 0]}
            animationDuration={1200}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  entry.progress >= 100
                    ? "#22c55e"
                    : entry.progress >= 75
                      ? "#3b82f6"
                      : entry.progress >= 40
                        ? "#f59e0b"
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

export default GoalProgressChart;
