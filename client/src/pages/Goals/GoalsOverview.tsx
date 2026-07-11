import { Target, Wallet, TrendingUp, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Goal } from "../../types/goal";

interface Props {
  goals: Goal[];
}

function GoalsOverview({ goals }: Props) {
  const totalGoals = goals.length;

  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);

  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  const remaining = Math.max(totalTarget - totalSaved, 0);

  const completedGoals = goals.filter(
    (goal) => goal.savedAmount >= goal.targetAmount,
  ).length;

  const completionRate =
    totalGoals === 0 ? 0 : (completedGoals / totalGoals) * 100;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);

  const cards = [
    {
      title: "Goals",
      value: totalGoals,
      subtitle: "Total Financial Goals",
      icon: Target,
      iconBg: "from-blue-500 to-cyan-500",
      valueColor: "text-blue-600",
    },

    {
      title: "Saved",
      value: formatCurrency(totalSaved),
      subtitle: "Current Savings",
      icon: Wallet,
      iconBg: "from-green-500 to-emerald-500",
      valueColor: "text-green-600",
    },

    {
      title: "Remaining",
      value: formatCurrency(remaining),
      subtitle: remaining === 0 ? "Goal Completed" : "Still Required",
      icon: TrendingUp,
      iconBg:
        remaining === 0
          ? "from-green-500 to-green-600"
          : "from-orange-500 to-red-500",
      valueColor: remaining === 0 ? "text-green-600" : "text-orange-600",
    },

    {
      title: "Completed",
      value: completedGoals,
      subtitle: `${completionRate.toFixed(0)}% Success Rate`,
      icon: CheckCircle2,
      iconBg: "from-purple-500 to-pink-500",
      valueColor: "text-purple-600",
    },
  ];

  if (totalGoals === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-14 text-center shadow-lg ring-1 ring-black/5 dark:ring-white/10 dark:border-gray-700 dark:bg-gray-900">
        <Target size={60} className="mx-auto mb-5 text-blue-500" />

        <h2 className="text-2xl font-bold dark:text-white">
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Create your first financial goal and begin tracking your savings
            journey.
          </p>
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Create your first financial goal to start tracking your dreams.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
    {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="
              group
              overflow-hidden
              rounded-3xl
              border
              border-gray-200
              bg-white
              shadow-md
              transition-all
              duration-300
              hover:shadow-2xl
              dark:border-gray-700
              dark:bg-gray-900
            "
          >
            {/* Top Accent */}
            <div className={`h-1 bg-linear-to-r ${card.iconBg}`} />

            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {card.title}
                  </p>

                  <h2 className={`mt-3 text-3xl font-bold ${card.valueColor}`}>
                    {card.value}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {card.subtitle}
                  </p>
                </div>

                <div
                  className={`rounded-2xl bg-linear-to-br ${card.iconBg} p-4 shadow-lg transition-transform duration-300 group-hover:rotate-6`}
                >
                  <Icon size={28} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default GoalsOverview;
