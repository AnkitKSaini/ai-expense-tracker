import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Sparkles,
} from "lucide-react";

function AIInsightCard() {
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

      <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/15 blur-[100px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-violet-500/10 blur-[90px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header */}

      <div className="relative flex items-start justify-between">

        <div className="flex items-center gap-4">

          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              relative
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
            <div className="absolute inset-0 rounded-2xl bg-white/20" />

            <Bot className="relative z-10" size={24} />
          </motion.div>

          <div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              AI Assistant
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Smart Insight
            </h3>

          </div>

        </div>

        <motion.div
          animate={{
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Sparkles
            className="text-cyan-500"
            size={22}
          />
        </motion.div>

      </div>

      {/* AI Status */}

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300">

        <span className="relative flex h-2 w-2">

          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />

          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />

        </span>

        AI Analysis Complete

      </div>

      {/* Insight */}

      <div className="mt-6">

        <h4 className="text-2xl font-black text-slate-900 dark:text-white">
          Great job! 🎉
        </h4>

        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
          Your food expenses decreased by{" "}
          <span className="font-bold text-cyan-600 dark:text-cyan-400">
            18%
          </span>{" "}
          compared to last month. Based on your current spending pattern,
          you're likely to stay within budget this month.
        </p>

      </div>

      {/* Confidence */}

      <div className="mt-8">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Prediction Confidence
          </span>

          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            94%
          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: "94%",
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500"
          />

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between">

        <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
          Budget Healthy
        </div>

        <button
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-slate-900
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:bg-cyan-600
            dark:bg-white
            dark:text-slate-900
          "
        >
          View Details

          <ArrowUpRight size={16} />

        </button>

      </div>

    </motion.div>
  );
}

export default AIInsightCard;