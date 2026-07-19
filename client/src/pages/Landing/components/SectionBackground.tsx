import { motion } from "framer-motion";

function SectionBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora Blobs */}

      <div className="absolute -left-32 top-0 h-520px w-520px rounded-full bg-blue-500/15 blur-[180px]" />

      <div className="absolute right-0 top-20 h-450px w-450px rounded-full bg-cyan-500/15 blur-[180px]" />

      <div className="absolute bottom-0 left-1/2 h-420px w-420px -translate-x-1/2 rounded-full bg-violet-500/15 blur-[180px]" />

      {/* Grid */}

      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right,#3b82f6 1px,transparent 1px),
              linear-gradient(to bottom,#3b82f6 1px,transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Dots */}

      <motion.div
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="absolute left-20 top-40 h-5 w-5 rounded-full bg-blue-400/50"
      />

      <motion.div
        animate={{
          y: [0, 35, 0],
          x: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
        className="absolute right-40 top-60 h-7 w-7 rounded-full bg-cyan-400/50"
      />

      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
        className="absolute bottom-24 left-1/3 h-4 w-4 rounded-full bg-violet-400/50"
      />

      {/* Top Divider */}

      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Bottom Divider */}

      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
    </div>
  );
}

export default SectionBackground;