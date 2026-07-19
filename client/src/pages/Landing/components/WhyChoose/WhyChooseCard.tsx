import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type WhyChooseCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
};

function WhyChooseCard({
  icon: Icon,
  title,
  description,
  gradient,
}: WhyChooseCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/80 p-7 shadow-lg backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/70"
    >
      {/* Background Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
      />

      <div
        className={`inline-flex rounded-2xl bg-gradient-to-br ${gradient} p-4 text-white shadow-lg`}
      >
        <Icon size={28} />
      </div>

      <h3 className="mt-6 text-2xl font-bold dark:text-white">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
        {description}
      </p>

      <button className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-600 transition group-hover:gap-3">
        Learn More
        <ArrowRight size={18} />
      </button>
    </motion.div>
  );
}

export default WhyChooseCard;