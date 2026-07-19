import { motion } from "framer-motion";
import { memo } from "react";

function LightRays() {
  return (
    <>
      <motion.div
        animate={{
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
        absolute
        left-[15%]
        top-[-20%]
        h-[140%]
        w-px
        rotate-[18deg]
        bg-gradient-to-b
        from-cyan-300
        via-blue-500/20
        to-transparent
      "
      />

      <motion.div
        animate={{
          opacity: [0.03, 0.10, 0.03],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="
        absolute
        right-[20%]
        top-[-20%]
        h-[140%]
        w-px
        -rotate-[20deg]
        bg-gradient-to-b
        from-violet-400
        via-blue-500/20
        to-transparent
      "
      />
    </>
  );
}

export default memo(LightRays);