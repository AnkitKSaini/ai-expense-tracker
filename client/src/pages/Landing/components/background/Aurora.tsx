import { motion } from "framer-motion";
import { memo } from "react";

function Aurora() {
  return (
    <>
      {/* Left Glow */}

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -left-44
        -top-44
        h-[520px]
        w-[520px]
        rounded-full
        bg-blue-500/15
        blur-[120px]
      "
      />

      {/* Right Glow */}

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -right-44
        top-10
        h-[500px]
        w-[500px]
        rounded-full
        bg-cyan-500/15
        blur-[120px]
      "
      />

      {/* Bottom Glow */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="
        absolute
        left-1/2
        bottom-[-220px]
        h-[520px]
        w-[520px]
        -translate-x-1/2
        rounded-full
        bg-violet-500/15
        blur-[120px]
      "
      />
    </>
  );
}

export default memo(Aurora);