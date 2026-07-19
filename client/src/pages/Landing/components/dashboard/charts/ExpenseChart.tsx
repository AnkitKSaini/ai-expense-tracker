import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const CHART_BARS = [45, 75, 60, 95, 70, 110, 85];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

function ExpenseChart() {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
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

      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header */}

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Monthly Expenses
          </p>

          <h3 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            ₹1,82,450
          </h3>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
            <TrendingUp size={14} />
            +12.8% this month
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
          <TrendingUp size={22} />
        </div>

      </div>

      {/* Divider */}

      <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />

      {/* Chart */}

      <div className="relative mt-8 h-64">

        {/* Grid */}

        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="border-t border-dashed border-slate-200 dark:border-slate-700"
            />
          ))}
        </div>

        {/* Bars */}

        <div className="relative flex h-full items-end justify-between gap-4">

          {CHART_BARS.map((height, index) => (

            <div
              key={MONTHS[index]}
              className="flex flex-1 flex-col items-center"
            >

              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                whileHover={{
                  scaleY: 1.05,
                }}
                className="
                  relative
                  w-full
                  rounded-full
                  bg-gradient-to-t
                  from-blue-600
                  via-cyan-500
                  to-violet-500
                  shadow-lg
                "
              >
                {/* Glow Dot */}

                <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-lg shadow-cyan-400/60" />
              </motion.div>

              <span className="mt-4 text-xs font-medium text-slate-400">
                {MONTHS[index]}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-slate-700">

        <span className="text-sm text-slate-500 dark:text-slate-400">
          Average Daily Spend
        </span>

        <span className="font-bold text-cyan-600 dark:text-cyan-400">
          ₹6,080
        </span>

      </div>

    </motion.div>
  );
}

export default ExpenseChart;