import { motion } from "framer-motion";

function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(to_right,#2563eb12_1px,transparent_1px),linear-gradient(to_bottom,#2563eb12_1px,transparent_1px)]
          bg-[size:60px_60px]
          dark:bg-[linear-gradient(to_right,#38bdf812_1px,transparent_1px),linear-gradient(to_bottom,#38bdf812_1px,transparent_1px)]
        "
      />

      {/* Top Blob */}

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-40
          -top-40
          h-96
          w-96
          rounded-full
          bg-cyan-400/20
          blur-[120px]
        "
      />

      {/* Bottom Blob */}

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-40
          -right-40
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-violet-500/20
          blur-[140px]
        "
      />

      {/* Center Glow */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[32rem]
          w-[32rem]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/10
          blur-[180px]
        "
      />
    </div>
  );
}

export default AuthBackground;