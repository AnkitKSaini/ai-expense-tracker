import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

function AuthCard({ children }: AuthCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        relative
        w-full
        max-w-md
        overflow-hidden
        rounded-[32px]
        border
        border-white/60
        bg-white/70
        p-8
        shadow-[0_30px_80px_rgba(15,23,42,.12)]
        backdrop-blur-2xl
        dark:border-slate-700/60
        dark:bg-slate-900/70
      "
    >
      {/* Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-cyan-400/20
          blur-[90px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-52
          w-52
          rounded-full
          bg-violet-500/20
          blur-[100px]
        "
      />

      {/* Border Highlight */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[32px]
          border
          border-white/20
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default AuthCard;