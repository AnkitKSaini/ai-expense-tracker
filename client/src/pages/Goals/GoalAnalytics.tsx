import { BarChart3, Trophy, Target, Wallet, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import type { Goal } from "../../types/goal";

interface Props {
  goals: Goal[];
}

function GoalAnalytics({ goals }: Props) {
  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) => goal.savedAmount >= goal.targetAmount,
  ).length;

  const activeGoals = goals.filter(
    (goal) => goal.savedAmount > 0 && goal.savedAmount < goal.targetAmount,
  ).length;

  const remainingGoals = totalGoals - completedGoals;

  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);

  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  const progress = totalTarget === 0 ? 0 : (totalSaved / totalTarget) * 100;

  const completionRate =
    totalGoals === 0 ? 0 : (completedGoals / totalGoals) * 100;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);

  const progressColor =
    progress >= 75
      ? "from-green-500 to-emerald-500"
      : progress >= 50
        ? "from-yellow-500 to-orange-500"
        : progress >= 25
          ? "from-orange-500 to-red-500"
          : "from-red-500 to-pink-500";

  const progressText =
    progress < 1 && progress > 0 ? "<1%" : `${progress.toFixed(1)}%`;

  const cards = [
    {
      title: "Goals",
      value: totalGoals,
      subtitle: "Financial Goals",
      icon: Target,
      color: "text-blue-600",
      bg: "from-blue-500 to-cyan-500",
    },
    {
      title: "Completed",
      value: completedGoals,
      subtitle: "Goals Achieved",
      icon: Trophy,
      color: "text-green-600",
      bg: "from-green-500 to-emerald-500",
    },
    {
      title: "Active",
      value: activeGoals,
      subtitle: "In Progress",
      icon: Clock3,
      color: "text-orange-600",
      bg: "from-orange-500 to-red-500",
    },
    {
      title: "Saved",
      value: formatCurrency(totalSaved),
      subtitle: "Current Savings",
      icon: Wallet,
      color: "text-purple-600",
      bg: "from-purple-500 to-pink-500",
    },
  ];

  if (totalGoals === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <BarChart3 size={55} className="mx-auto mb-4 text-blue-500" />

        <h2 className="text-2xl font-bold dark:text-white">
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Start by creating your first financial goal. Analytics and insights
            will automatically appear here.
          </p>
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Create goals to see your financial analytics.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl ring-1 ring-black/5 dark:ring-white/10 dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="mb-8 flex items-center gap-3">
        <BarChart3 className="text-blue-600" size={28} />

        <div>
          <h2 className="text-2xl font-bold dark:text-white">Goal Analytics</h2>

          <p className="text-sm text-gray-500">
            Overview of your financial goals
          </p>
        </div>
      </div>

         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
         {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                scale: 1.04,
                y: -8,
              }}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-gray-500">
                    {card.title}
                  </p>

                  <h3 className={`mt-2 text-3xl font-bold ${card.color}`}>
                    {card.value}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">{card.subtitle}</p>
                </div>

                <div className={`rounded-xl bg-linear-to-br ${card.bg} p-3`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold dark:text-white">
            Overall Goal Progress
          </span>

          <span className="font-bold text-blue-600">{progressText}</span>
        </div>

        <div className="h-5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 1,
            }}
            className={`h-full rounded-full bg-linear-to-r ${progressColor}`}
          />
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>Saved: {formatCurrency(totalSaved)}</span>

          <span>Target: {formatCurrency(totalTarget)}</span>
        </div>
      </div>
        
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
         <div className="rounded-xl bg-blue-50 p-5 dark:bg-blue-900/20">
          <p className="text-sm text-gray-500">Completion Rate</p>

          <h3 className="mt-2 text-2xl font-bold text-blue-600">
            {completionRate.toFixed(1)}%
          </h3>
        </div>

        <div className="rounded-xl bg-green-50 p-5 dark:bg-green-900/20">
          <p className="text-sm text-gray-500">Remaining Goals</p>

          <h3 className="mt-2 text-2xl font-bold text-green-600">
            {remainingGoals}
          </h3>
        </div>

        <div className="rounded-xl bg-purple-50 p-5 dark:bg-purple-900/20">
          <p className="text-sm text-gray-500">Total Target</p>

          <h3 className="mt-2 text-2xl font-bold text-purple-600">
            {formatCurrency(totalTarget)}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default GoalAnalytics;
