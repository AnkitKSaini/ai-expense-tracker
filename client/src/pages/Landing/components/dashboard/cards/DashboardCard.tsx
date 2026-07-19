import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  positive?: boolean;
};

function DashboardCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
}: DashboardCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
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
        transition-all
        duration-300
        hover:border-cyan-300/60
        hover:shadow-[0_25px_60px_rgba(6,182,212,0.18)]
        dark:border-slate-700/50
        dark:bg-slate-900/70
      "
    >
      {/* Ambient Glow */}
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header */}
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-3 bg-gradient-to-r from-slate-900 via-blue-700 to-cyan-600 bg-clip-text text-3xl font-black text-transparent dark:from-white dark:via-cyan-300 dark:to-violet-300">
            {value}
          </h3>
        </div>

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.1,
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
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <Icon size={24} className="relative z-10" />
        </motion.div>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />

      {/* Footer */}
      <div className="relative flex items-center justify-between">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
            positive
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
              : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
          }`}
        >
          <ArrowUpRight
            size={15}
            className={!positive ? "rotate-90" : ""}
          />

          {change}
        </div>

        <span className="text-xs font-medium text-slate-400">
          vs last month
        </span>
      </div>

      {/* Bottom Gradient */}
      <motion.div
        initial={{
          width: 0,
        }}
        whileHover={{
          width: "100%",
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          absolute
          bottom-0
          left-0
          h-1
          bg-gradient-to-r
          from-blue-600
          via-cyan-500
          to-violet-500
        "
      />
    </motion.div>
  );
}

export default DashboardCard;