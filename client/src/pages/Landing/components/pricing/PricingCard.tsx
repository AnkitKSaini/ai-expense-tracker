import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useRef } from "react";

import type { PricingPlan } from "./types";

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  billing: "monthly" | "yearly";
}

function PricingCard({ plan, index, billing }: PricingCardProps) {
  const Icon = plan.icon;

  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, {
    stiffness: 180,
    damping: 18,
  });

  const springY = useSpring(rotateY, {
    stiffness: 180,
    damping: 18,
  });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateYValue = ((x - rect.width / 2) / rect.width) * 14;

    const rotateXValue = -((y - rect.height / 2) / rect.height) * 14;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1400,
      }}
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.95,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
      }}
      whileHover={{
        y: -14,
        scale: plan.popular ? 1.03 : 1.01,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
    group
    relative
    isolate
    flex
    h-full
    flex-col
    overflow-hidden
    rounded-[36px]
    border
    p-8
    backdrop-blur-3xl
    transition-all
    duration-700

    ${
      plan.popular
        ? `
          border-cyan-300/70
          bg-white/80
          shadow-[0_40px_120px_rgba(6,182,212,.28)]
          dark:border-cyan-400/40
          dark:bg-slate-900/80
        `
        : `
          border-white/60
          bg-white/70
          shadow-[0_25px_80px_rgba(15,23,42,.08)]
          hover:border-cyan-300/60
          hover:shadow-[0_35px_100px_rgba(6,182,212,.18)]
          dark:border-slate-700/60
          dark:bg-slate-900/70
        `
    }
  `}
    >
      {/* Animated Glow */}

      <div
        className="
    absolute
    -left-20
    -top-20
    h-56
    w-56
    rounded-full
    bg-gradient-to-br
    from-cyan-400/30
    via-blue-500/20
    to-violet-500/25
    blur-[110px]
    opacity-60
    transition-all
    duration-700
    group-hover:scale-125
    group-hover:opacity-100
  "
      />

      <div
        className="
    absolute
    -bottom-20
    -right-20
    h-56
    w-56
    rounded-full
    bg-gradient-to-tr
    from-violet-500/20
    via-blue-500/10
    to-cyan-400/20
    blur-[110px]
    opacity-40
    transition-all
    duration-700
    group-hover:opacity-80
  "
      />

      <div
        className="
    pointer-events-none
    absolute
    inset-0
    rounded-[36px]
    border
    border-white/10
    opacity-0
    transition-opacity
    duration-500
    group-hover:opacity-100
  "
      />

      {plan.popular && (
        <motion.div
          initial={{
            scale: 0,
            rotate: -10,
          }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          transition={{
            delay: 0.4,
            type: "spring",
          }}
          className="
      absolute
      right-7
      top-7
      z-20
      inline-flex
      items-center
      gap-2
      rounded-full
      bg-gradient-to-r
      from-blue-600
      via-cyan-500
      to-violet-500
      px-5
      py-2
      text-xs
      font-bold
      tracking-wide
      text-white
      shadow-[0_15px_35px_rgba(37,99,235,.35)]
    "
        >
          <Sparkles size={14} />
          Most Popular
        </motion.div>
      )}

      {/* Icon */}

      <motion.div
        whileHover={{
          rotate: -8,
          scale: 1.08,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
        }}
        className="
    relative
    z-10
    flex
    h-24
    w-24
    items-center
    justify-center
    rounded-[28px]
    bg-gradient-to-br
    from-blue-600
    via-cyan-500
    to-violet-500
    text-white
    shadow-[0_20px_50px_rgba(37,99,235,.35)]
  "
      >
        <div
          className="
      absolute
      inset-0
      rounded-[28px]
      bg-white/10
      backdrop-blur-xl
    "
        />

        <Icon size={40} className="relative z-10" />
      </motion.div>

      {/* Content */}

      <div className="relative z-10 mt-10">
        <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          {plan.name}
        </h3>

        <p className="mt-4 max-w-xs leading-7 text-slate-600 dark:text-slate-400">
          {plan.description}
        </p>
      </div>

      {/* Price */}

      <div className="relative mt-10">
        <div className="flex items-end gap-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={billing}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
      relative
      bg-gradient-to-r
      from-blue-600
      via-cyan-500
      to-violet-500
      bg-clip-text
      text-5xl
      font-black
      tracking-tight
      text-transparent
    "
            >
              {billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
            </motion.span>
          </AnimatePresence>

          {plan.period && (
            <span className="pb-2 text-lg text-slate-500 dark:text-slate-400">
              {plan.period}
            </span>
          )}
        </div>

        <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          ✔ No credit card required
        </p>
      </div>

      {/* Divider */}

      <div
        className="
    my-10
    h-px
   bg-gradient-to-r
from-transparent
via-slate-200
to-transparent
dark:via-slate-700
  "
      />
      {/* Features */}

      <div className="flex-1 space-y-4">
        {plan.features.map((feature) => (
          <div key={feature.text} className="flex items-center gap-3">
            <div
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-emerald-500/15
                text-emerald-600
                dark:text-emerald-400
              "
            >
              <Check size={16} />
            </div>

            <span className="text-slate-700 dark:text-slate-300">
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}

      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className={`
          mt-10
          inline-flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          py-4
          font-semibold
          transition-all
          duration-300

          ${
            plan.popular
              ? `
                bg-gradient-to-r
                from-blue-600
                via-cyan-500
                to-violet-500
                text-white
                shadow-lg
              `
              : `
                border
                border-slate-300
                bg-white
                text-slate-800
                hover:border-cyan-400
                hover:text-cyan-600
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              `
          }
        `}
      >
        {plan.buttonText}

        <ArrowRight size={18} />
      </motion.button>
    </motion.div>
  );
}

export default PricingCard;
