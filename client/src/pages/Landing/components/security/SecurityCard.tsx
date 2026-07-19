import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { SecurityItem } from "./types";

interface SecurityCardProps {
  item: SecurityItem;
  index: number;
}

function SecurityCard({
  item,
  index,
}: SecurityCardProps) {
  const Icon = item.icon;

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
        delay: index * 0.15,
        duration: 0.5,
      }}
      whileHover={{
        y: -10,
        rotateX: 3,
        rotateY: -3,
      }}
      className="
        group
        relative
        isolate
        h-full
        overflow-hidden
        rounded-[30px]
        border
        border-white/60
        bg-white/75
        p-8
        shadow-[0_20px_60px_rgba(15,23,42,.08)]
        backdrop-blur-2xl
        transition-all
        duration-500
        transform-gpu
        will-change-transform
        hover:border-cyan-300/60
        hover:shadow-[0_35px_80px_rgba(6,182,212,.20)]
        dark:border-slate-700/50
        dark:bg-slate-900/70
      "
    >
      {/* Ambient Glow */}

      <div
        className="
          absolute
          -right-16
          -top-16
          h-48
          w-48
          rounded-full
          bg-gradient-to-br
          from-cyan-400/30
          via-sky-400/20
          to-violet-500/20
          blur-[110px]
          opacity-0
          transition-all
          duration-700
          group-hover:opacity-100
        "
      />

      {/* Icon */}

      <motion.div
        whileHover={{
          rotate: 8,
          scale: 1.08,
        }}
        className="
          relative
          flex
          h-20
          w-20
          items-center
          justify-center
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          from-blue-600
          via-cyan-500
          to-violet-500
          text-white
          shadow-[0_15px_35px_rgba(37,99,235,.35)]
        "
      >
        <div
          className="
            absolute
            inset-0
            rounded-3xl
            bg-white/20
            opacity-0
            blur-xl
            transition
            duration-500
            group-hover:opacity-100
          "
        />

        <Icon
          size={34}
          className="relative z-10"
        />
      </motion.div>

      {/* Content */}

      <div className="relative mt-8">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">
          {item.title}
        </h3>

        <p
          className="
            mt-4
            leading-8
            text-slate-600
            dark:text-slate-400
          "
        >
          {item.description}
        </p>
      </div>

      {/* Divider */}

      <div
        className="
          my-8
          h-px
          bg-gradient-to-r
          from-transparent
          via-slate-200
          to-transparent
          dark:via-slate-700
        "
      />

      {/* Footer */}

      <div className="flex items-center justify-between">
        <span
          className="
            rounded-full
            bg-gradient-to-r
            from-emerald-500/20
            to-cyan-500/20
            px-4
            py-2
            text-sm
            font-bold
            text-emerald-700
            dark:text-emerald-300
          "
        >
          ✓ Verified
        </span>

        <motion.div
          whileHover={{
            x: 4,
            rotate: -8,
          }}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-600
            transition-all
            duration-300
            group-hover:bg-gradient-to-br
            group-hover:from-blue-600
            group-hover:via-cyan-500
            group-hover:to-violet-500
            group-hover:text-white
            dark:bg-slate-800
            dark:text-slate-300
          "
        >
          <ArrowUpRight size={18} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SecurityCard;