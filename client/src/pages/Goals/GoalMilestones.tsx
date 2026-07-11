import {
  CheckCircle2,
  Circle,
  Trophy,
} from "lucide-react";

interface Props {
  percentage: number;
}

function GoalMilestones({
  percentage,
}: Props) {
  const milestones = [
    {
      title: "Getting Started",
      subtitle: "25% Completed",
      value: 25,
    },
    {
      title: "Halfway There",
      subtitle: "50% Completed",
      value: 50,
    },
    {
      title: "Almost Finished",
      subtitle: "75% Completed",
      value: 75,
    },
    {
      title: "Goal Achieved",
      subtitle: "100% Completed",
      value: 100,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">

      <div className="mb-5 flex items-center justify-between">

        <div>

          <h3 className="text-lg font-bold dark:text-white">
            🎯 Goal Milestones
          </h3>

          <p className="text-sm text-gray-500">
            Track your achievement journey
          </p>

        </div>

        <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
          <Trophy
            size={22}
            className="text-blue-600"
          />
        </div>

      </div>

      <div className="space-y-5">

        {milestones.map((milestone) => {
          const completed =
            percentage >= milestone.value;

          return (
            <div
              key={milestone.value}
              className="flex items-start gap-4"
            >
              <div className="mt-1">

                {completed ? (
                  <div className="rounded-full bg-green-100 p-1 dark:bg-green-900/30">
                    <CheckCircle2
                      size={20}
                      className="text-green-600"
                    />
                  </div>
                ) : (
                  <div className="rounded-full bg-gray-100 p-1 dark:bg-gray-800">
                    <Circle
                      size={20}
                      className="text-gray-400"
                    />
                  </div>
                )}

              </div>

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h4
                    className={`font-semibold ${
                      completed
                        ? "text-green-600"
                        : "dark:text-white"
                    }`}
                  >
                    {milestone.title}
                  </h4>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      completed
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {milestone.value}%
                  </span>

                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {milestone.subtitle}
                </p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">

                  <div
                    style={{
                      width:
                        percentage >=
                        milestone.value
                          ? "100%"
                          : `${Math.max(
                              0,
                              (percentage /
                                milestone.value) *
                                100,
                            )}%`,
                    }}
                    className={`h-full rounded-full transition-all duration-700 ${
                      completed
                        ? "bg-linear-to-r from-green-500 to-emerald-500"
                        : "bg-linear-to-r from-blue-500 to-cyan-500"
                    }`}
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default GoalMilestones;