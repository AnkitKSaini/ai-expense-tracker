import { useEffect, useState } from "react";
import {
  Brain,
  Loader2,
  TrendingUp,
  CalendarDays,
  Wallet,
  ShieldAlert,
} from "lucide-react";

import { predictGoal } from "../../services/goal.service";
import type { Goal } from "../../types/goal";
import type { GoalPrediction } from "../../types/goalPrediction";
   
interface Props {
  goal: Goal;
}

function GoalPredictionCard({ goal }: Props) {
  const [prediction, setPrediction] = useState<GoalPrediction | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrediction = async () => {
      try {
        const result = await predictGoal({
          title: goal.title,
          targetAmount: goal.targetAmount,
          savedAmount: goal.savedAmount,
          deadline: goal.deadline,
        });

        setPrediction(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPrediction();
  }, [goal]);

  if (loading) {
    return (
      <div className="mt-6 rounded-3xl border border-cyan-200 bg-white p-6 shadow-sm dark:border-cyan-800 dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <Loader2 className="animate-spin text-cyan-600" size={26} />

          <div>
            <h3 className="font-bold dark:text-white">AI Goal Prediction</h3>

            <p className="text-sm text-gray-500">
              AI is analyzing your financial goal...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!prediction) return null;

  const probability =
    parseFloat(String(prediction.probability).replace("%", "")) || 0;

  const probabilityColor =
    probability >= 80
      ? "text-green-600"
      : probability >= 60
        ? "text-blue-600"
        : probability >= 40
          ? "text-yellow-600"
          : "text-red-600";

  const probabilityLabel =
    probability >= 80
      ? "Excellent"
      : probability >= 60
        ? "Good"
        : probability >= 40
          ? "Moderate"
          : "Low Chance";

  const forecast =
    probability >= 80
      ? "Very Positive"
      : probability >= 60
        ? "Positive"
        : probability >= 40
          ? "Uncertain"
          : "Needs Improvement";

  const riskColor =
    prediction.risk.toLowerCase() === "low"
      ? "text-green-600"
      : prediction.risk.toLowerCase() === "medium"
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="mt-6 rounded-3xl border border-cyan-200 bg-linear-to-br from-cyan-50 via-white to-blue-50 p-6 shadow-lg ring-1 ring-black/5 dark:ring-white/10 dark:border-cyan-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-cyan-100 p-3 dark:bg-cyan-900/30">
            <Brain className="text-cyan-600" size={24} />
          </div>

          <div>
            <h3 className="text-lg font-bold dark:text-white">
              AI Goal Prediction
            </h3>

            <p className="text-sm text-gray-500">Smart financial forecast</p>
          </div>
        </div>

        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
          AI Powered
        </span>
      </div>

      {/* Success */}

      <div className="mt-6">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium text-gray-500">
            Success Probability
          </span>

          <div className="text-right">
            <p className={`font-bold ${probabilityColor}`}>
              {prediction.probability}
            </p>

            <p className={`text-xs ${probabilityColor}`}>{probabilityLabel}</p>
          </div>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            style={{
              width: `${probability}%`,
            }}
            className={`h-full rounded-full  transition-all duration-1000 ease-out ${
              probability >= 80
                ? "bg-linear-to-r from-green-500 to-emerald-500"
                : probability >= 60
                  ? "bg-linear-to-r from-blue-500 to-cyan-500"
                  : probability >= 40
                    ? "bg-linear-to-r from-yellow-500 to-orange-500"
                    : "bg-linear-to-r from-red-500 to-pink-500"
            }`}
          />
        </div>
      </div>

      {/* Stats */}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
         <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-blue-600" />

            <span className="text-xs text-gray-500">Completion</span>
          </div>

          <p className="mt-3 font-bold dark:text-white">
            {prediction.estimatedCompletion}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-green-600" />

            <span className="text-xs text-gray-500">Monthly Saving</span>
          </div>

          <p className="mt-3 font-bold text-green-600">
            {prediction.monthlySaving}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} className={riskColor} />

            <span className="text-xs text-gray-500">Risk</span>
          </div>

          <div>
            <p className={`font-bold ${riskColor}`}>{prediction.risk}</p>

            <p className="mt-1 text-xs text-gray-500">
              {prediction.risk.toLowerCase() === "low"
                ? "Safe"
                : prediction.risk.toLowerCase() === "medium"
                  ? "Monitor Closely"
                  : "Immediate Attention"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-purple-600" />

            <span className="text-xs text-gray-500">Forecast</span>
          </div>

          <p className={`mt-3 font-bold ${probabilityColor}`}>{forecast}</p>
        </div>
      </div>

      {/* Recommendation */}

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-900">
        <h4 className="mb-3 font-semibold text-cyan-700 dark:text-cyan-300">
          💡 AI Recommendation
        </h4>

        <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
          {prediction.recommendation}
        </p>
      </div>
    </div>
  );
}

export default GoalPredictionCard;
