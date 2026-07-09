import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface Props {
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High";
}

function RiskMeterCard({
  riskScore,
  riskLevel,
}: Props) {
  const color =
    riskLevel === "Low"
      ? "bg-green-500"
      : riskLevel === "Medium"
      ? "bg-yellow-500"
      : "bg-red-500";

  const badge =
    riskLevel === "Low"
      ? "bg-green-100 text-green-700"
      : riskLevel === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  const recommendation =
    riskLevel === "Low"
      ? "Your spending is under control. Keep maintaining your savings."
      : riskLevel === "Medium"
      ? "Monitor discretionary spending to avoid future financial pressure."
      : "Your expenses are very high. Reduce unnecessary spending immediately.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">
          <AlertTriangle size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold dark:text-white">
            Budget Risk Meter
          </h2>

          <p className="text-sm text-gray-500">
            AI Risk Analysis
          </p>
        </div>
      </div>

      {/* Score */}
      <div className="mt-8 text-center">
        <h1 className="text-5xl font-bold dark:text-white">
          {riskScore}%
        </h1>

        <span
          className={`mt-3 inline-block rounded-full px-4 py-2 text-sm font-semibold ${badge}`}
        >
          {riskLevel} Risk
        </span>
      </div>

      {/* Progress */}
      <div className="mt-8 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${riskScore}%` }}
          transition={{ duration: 1 }}
          className={`h-full rounded-full ${color}`}
        />
      </div>

      {/* Recommendation */}
      <div className="mt-8 rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
        <h3 className="font-semibold dark:text-white">
          🤖 AI Recommendation
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {recommendation}
        </p>
      </div>
    </motion.div>
  );
}

export default RiskMeterCard;