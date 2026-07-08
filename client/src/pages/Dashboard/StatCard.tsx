import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "../../components/common/AnimatedCounter";
interface Props {
  title: string;
  value: number;
  prefix?: string;
  icon: LucideIcon;
  iconBg?: string;
  trend?: string;
  delay?: number;
}

function StatCard({
  title,
  value,
  prefix = "",
  icon: Icon,
  iconBg = "bg-blue-100 text-blue-600",
  trend,
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            <AnimatedCounter value={value} prefix={prefix} />
          </h2>

          {trend && (
            <span className="mt-4 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              ▲ {trend}
            </span>
          )}
        </div>

        <div
          className={`rounded-2xl p-4 ${iconBg} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon size={28} />
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;
