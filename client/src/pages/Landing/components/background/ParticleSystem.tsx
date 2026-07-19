import { motion } from "framer-motion";
import { memo, useMemo } from "react";

function ParticleSystem() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: (i * 17) % 100,
        top: (i * 31) % 100,
        size: 2 + (i % 3),
        duration: 8 + (i % 4),
        delay: i * 0.3,
      })),
    []
  );

  return (
    <>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          className="absolute rounded-full bg-cyan-300"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
        />
      ))}
    </>
  );
}

export default memo(ParticleSystem);