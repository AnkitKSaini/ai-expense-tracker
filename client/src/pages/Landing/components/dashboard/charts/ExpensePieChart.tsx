import { motion } from "framer-motion";
import { PieChart, TrendingUp } from "lucide-react";

const RADIUS = 70;
const STROKE = 12;

const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const PROGRESS = 72;

const OFFSET =
  CIRCUMFERENCE -
  (PROGRESS / 100) * CIRCUMFERENCE;

function ExpensePieChart() {
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

      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header */}

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Budget Usage
          </p>

          <h3 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            This Month
          </h3>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
            <TrendingUp size={13} />
            On Track
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
          <PieChart size={22} />
        </div>

      </div>

      {/* Divider */}

      <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />

      {/* Chart */}

      <div className="flex justify-center">

        <div className="relative h-48 w-48">

          <svg
            className="-rotate-90"
            width="192"
            height="192"
          >
            {/* Track */}

            <circle
              cx="96"
              cy="96"
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
              className="stroke-slate-200 dark:stroke-slate-700"
            />

            {/* Progress */}

            <motion.circle
              cx="96"
              cy="96"
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
              strokeLinecap="round"
              stroke="url(#budgetGradient)"
              strokeDasharray={CIRCUMFERENCE}
              initial={{
                strokeDashoffset: CIRCUMFERENCE,
              }}
              whileInView={{
                strokeDashoffset: OFFSET,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.2,
              }}
            />

            <defs>

              <linearGradient
                id="budgetGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>

            </defs>

          </svg>

          {/* Center */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="
                flex
                h-28
                w-28
                flex-col
                items-center
                justify-center
                rounded-full
                bg-white/80
                shadow-lg
                backdrop-blur-xl
                dark:bg-slate-900/80
              "
            >
              <h3 className="text-5xl font-black text-slate-900 dark:text-white">
                {PROGRESS}%
              </h3>

              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                Budget Used
              </p>

            </motion.div>

          </div>

        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">

          <p className="text-xs text-slate-500">
            Remaining
          </p>

          <h4 className="mt-2 text-xl font-bold text-emerald-600">
            28%
          </h4>

        </div>

        <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">

          <p className="text-xs text-slate-500">
            Status
          </p>

          <h4 className="mt-2 text-xl font-bold text-cyan-600">
            Healthy
          </h4>

        </div>

      </div>

    </motion.div>
  );
}

export default ExpensePieChart;