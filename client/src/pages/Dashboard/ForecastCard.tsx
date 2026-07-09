import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Props {
  predictedExpense: number;
  predictedIncome: number;
  predictedSaving: number;
  confidence: number;
  trend: "Increasing" | "Stable" | "Decreasing";
}

function ForecastCard({
  predictedExpense,
  predictedIncome,
  predictedSaving,
  confidence,
  trend,
}: Props) {
  const Icon =
    trend === "Increasing"
      ? TrendingUp
      : trend === "Decreasing"
      ? TrendingDown
      : Minus;

  const trendColor =
    trend === "Increasing"
      ? "text-red-500"
      : trend === "Decreasing"
      ? "text-green-500"
      : "text-gray-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold dark:text-white">
            Expense Forecast
          </h2>

          <p className="text-sm text-gray-500">
            Next Month Prediction
          </p>
        </div>

        <Icon className={trendColor} size={30} />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Metric
          title="Income"
          value={predictedIncome}
        />

        <Metric
          title="Expense"
          value={predictedExpense}
        />

        <Metric
          title="Savings"
          value={predictedSaving}
        />

        <Metric
          title="Confidence"
          value={`${confidence}%`}
        />
      </div>

      <div className="mt-6 rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
        <p className="font-semibold dark:text-white">
          Trend
        </p>

        <p className={`mt-2 ${trendColor}`}>
          {trend}
        </p>
      </div>
    </motion.div>
  );
}

interface MetricProps {
  title: string;
  value: string | number;
}

function Metric({
  title,
  value,
}: MetricProps) {
  return (
    <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-bold dark:text-white">
        {typeof value === "number"
          ? `₹${value.toLocaleString()}`
          : value}
      </h3>
    </div>
  );
}

export default ForecastCard;