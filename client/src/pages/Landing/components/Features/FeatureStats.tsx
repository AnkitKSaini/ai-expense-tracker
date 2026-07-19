import { motion } from "framer-motion";

const stats = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "$12M+",
    label: "Money Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "AI Powered",
    label: "Smart Insights",
  },
];

function FeatureStats() {
  return (
    <div className="relative z-10 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
          className="rounded-3xl border border-white/30 bg-white/70 p-6 text-center shadow-lg backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/70"
        >
          <h3 className="text-3xl font-bold text-blue-600">
            {stat.value}
          </h3>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default FeatureStats;