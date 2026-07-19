import { motion } from "framer-motion";
import { Target, Wallet, TrendingUp } from "lucide-react";

const TOTAL = 50000;
const SPENT = 36000;

const percentage = Math.round((SPENT / TOTAL) * 100);
const remaining = TOTAL - SPENT;

function BudgetProgress() {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        relative
        isolate
        overflow-hidden
        rounded-3xl
        border
        border-white/40
        bg-white/70
        p-6
        shadow-lg
        backdrop-blur-2xl
        dark:border-slate-700/50
        dark:bg-slate-900/70
      "
    >
      {/* Ambient Glow */}

      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/15 blur-[100px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header */}

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Monthly Budget
          </p>

          <h3 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            ₹{TOTAL.toLocaleString()}
          </h3>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
            <TrendingUp size={13} />
            Budget Healthy
          </div>

        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-blue-600
            via-cyan-500
            to-violet-500
            text-white
            shadow-lg
          "
        >
          <Target size={22} />
        </div>

      </div>

      {/* Divider */}

      <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />

      {/* Progress */}

      <div>

        <div className="mb-3 flex items-center justify-between">

          <span className="text-sm text-slate-500 dark:text-slate-400">
            Spent
          </span>

          <span className="font-bold text-slate-900 dark:text-white">
            ₹{SPENT.toLocaleString()}
          </span>

        </div>

        <div className="relative h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

          <motion.div
            initial={{ width: 0 }}
            whileInView={{
              width: `${percentage}%`,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
            className="
              relative
              h-full
              rounded-full
              bg-gradient-to-r
              from-blue-600
              via-cyan-500
              to-violet-500
            "
          >
            {/* Shimmer */}

            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                inset-y-0
                w-10
                bg-white/30
                blur-sm
              "
            />

          </motion.div>

        </div>

        <div className="mt-3 flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>0%</span>
          <span>{percentage}% Used</span>
          <span>100%</span>
        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">

          <div className="flex items-center gap-2">

            <Wallet
              size={18}
              className="text-cyan-600"
            />

            <p className="text-xs text-slate-500">
              Used
            </p>

          </div>

          <h4 className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
            {percentage}%
          </h4>

        </div>

        <div className="rounded-2xl bg-emerald-100 p-4 dark:bg-emerald-500/20">

          <p className="text-xs text-emerald-700 dark:text-emerald-300">
            Remaining
          </p>

          <h4 className="mt-3 text-2xl font-black text-emerald-700 dark:text-emerald-300">
            ₹{remaining.toLocaleString()}
          </h4>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-slate-700">

        <span className="text-sm text-slate-500 dark:text-slate-400">
          Estimated End of Month
        </span>

        <span className="font-bold text-cyan-600 dark:text-cyan-400">
          ₹47,800
        </span>

      </div>

    </motion.div>
  );
}

export default BudgetProgress;