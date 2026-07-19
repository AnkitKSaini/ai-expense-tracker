import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
  delay?: number;
};

function StatCard({
  icon: Icon,
  value,
  label,
  description,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay,
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200
        bg-white/80
        p-8
        shadow-lg
        backdrop-blur-xl
        transition-all
        duration-500
        hover:border-cyan-300
        hover:shadow-[0_25px_60px_rgba(6,182,212,0.18)]
        dark:border-slate-800
        dark:bg-slate-900/70
        dark:hover:border-cyan-500/40
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-40
          w-40
          rounded-full
          bg-cyan-400/10
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Icon */}

      <div
        className="
          relative
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-blue-600
          via-cyan-500
          to-violet-500
          text-white
          shadow-lg
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:rotate-6
        "
      >
        <Icon size={30} />
      </div>

      {/* Content */}

      <div className="relative mt-8">

        <h3 className="text-4xl font-black text-slate-900 dark:text-white">
          {value}
        </h3>

        <p className="mt-3 text-lg font-bold text-slate-800 dark:text-slate-100">
          {label}
        </p>

        <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
          {description}
        </p>

      </div>

      {/* Bottom Line */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-1
          w-0
          bg-gradient-to-r
          from-blue-600
          via-cyan-500
          to-violet-500
          transition-all
          duration-500
          group-hover:w-full
        "
      />
    </motion.div>
  );
}

export default StatCard;