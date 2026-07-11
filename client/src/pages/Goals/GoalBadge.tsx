import { Award, Sparkles } from "lucide-react";

interface Props {
  percentage: number;
}

function GoalBadge({ percentage }: Props) {
  let title = "Getting Started";
  let badge = "🌱 Beginner";
  let color =
    "from-gray-500 to-gray-600";
  let bg =
    "bg-gray-50 border-gray-200 dark:bg-gray-900/30 dark:border-gray-700";

  if (percentage >= 100) {
    title = "Financial Legend";
    badge = "👑 Legendary Investor";
    color = "from-yellow-500 to-amber-500";
    bg =
      "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700";
  } else if (percentage >= 75) {
    title = "Goal Master";
    badge = "🥇 Gold Achiever";
    color = "from-amber-500 to-orange-500";
    bg =
      "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700";
  } else if (percentage >= 50) {
    title = "Smart Saver";
    badge = "🥈 Silver Saver";
    color = "from-slate-500 to-slate-700";
    bg =
      "bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700";
  } else if (percentage >= 25) {
    title = "Rising Saver";
    badge = "🥉 Bronze Saver";
    color = "from-orange-500 to-red-500";
    bg =
      "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700";
  }

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:shadow-lg ${bg}`}
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className={`rounded-2xl bg-linear-to-br ${color} p-3 shadow-lg`}
          >
            <Award
              size={22}
              className="text-white"
            />
          </div>

          <div>

            <h3 className="font-bold dark:text-white">
              {title}
            </h3>

            <p className="text-xs text-gray-500">
              Achievement Badge
            </p>

          </div>

        </div>

        <Sparkles
          size={20}
          className="text-yellow-500"
        />

      </div>

      <div className="mt-5">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-sm text-gray-500">
            Progress
          </span>

          <span className="font-bold text-blue-600">
            {percentage.toFixed(0)}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">

          <div
            style={{
              width: `${percentage}%`,
            }}
            className={`h-full rounded-full bg-linear-to-r ${color} transition-all duration-700 ease-out`}
          />

        </div>

      </div>

      <div
        className={`mt-5 rounded-xl bg-linear-to-r ${color} px-4 py-3 text-center`}
      >
        <p className="font-bold text-white">
          {badge}
        </p>
      </div>

    </div>
  );
}

export default GoalBadge;