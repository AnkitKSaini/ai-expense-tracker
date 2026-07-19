import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
}

function FeatureCard({ title, description, icon: Icon, delay }: Props) {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const [rotate, setRotate] = useState({
    x: 0,
    y: 0,
  });
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
  type: "spring",
  stiffness: 180,
  damping: 18,
}}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMouse({
          x,
          y,
        });

        const rotateY = (x / rect.width - 0.5) * 12;
        const rotateX = -(y / rect.height - 0.5) * 12;

        setRotate({
          x: rotateX,
          y: rotateY,
        });
      }}
      onMouseLeave={() => {
        setRotate({
          x: 0,
          y: 0,
        });
      }}
      whileHover={{
        y: -12,
        scale: 1.02,
      }}

      style={{
  rotateX: rotate.x,
  rotateY: rotate.y,
  transformPerspective: 1000,
}}

      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white/90
        p-8
        shadow-xl
        backdrop-blur-xl
        transition-all
        duration-500
        hover:border-blue-500
        hover:shadow-[0_35px_70px_rgba(37,99,235,0.20)]
        dark:border-gray-700
        dark:bg-gray-900/90

        before:absolute
before:inset-0
before:rounded-3xl
before:bg-linear-to-r
before:from-blue-500
before:via-cyan-500
before:to-violet-500
before:p-1px
before:opacity-0
before:transition-all
before:duration-500
group-hover:before:opacity-100
      "
    >
      {/* AI Badge */}

      <div className="absolute right-6 top-6 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-lg animate-pulse">
        ✨ AI Powered
      </div>

      {/* Glow */}

      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-linear-to-r from-blue-500/20 via-cyan-500/20 to-violet-500/20 blur-[120px] transition-all duration-500 group-hover:bg-blue-500/20" />

      <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-[120px] transition-all duration-500 group-hover:bg-cyan-500/20" />

      <div className="relative z-10">
        <div
          className="pointer-events-none absolute h-44 w-44 rounded-full bg-linear-to-r from-blue-500/20 via-cyan-500/15 to-violet-500/20 blur-[90px]"
          style={{
            left: mouse.x - 80,
            top: mouse.y - 80,
          }}
        />
        {/* Icon */}

        <div className="inline-flex rounded-2xl bg-linear-to-r from-blue-100 to-cyan-100 p-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125 dark:from-blue-900/30 dark:to-cyan-900/30">
          <Icon size={30} className="text-blue-600" />
        </div>

        {/* Title */}

        <h3 className="mt-7 text-2xl font-bold transition-colors duration-300 group-hover:text-blue-600 dark:text-white">
          {title}
        </h3>

        {/* Description */}

        <p className="mt-4 leading-8 text-gray-500 dark:text-gray-400">
          {description}
        </p>

        {/* Learn More */}

        <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:bg-blue-700 group-hover:opacity-100">
          Explore Feature
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default FeatureCard;
