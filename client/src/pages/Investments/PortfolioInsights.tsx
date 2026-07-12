import {
  Brain,
  ShieldCheck,
  Trophy,
  TriangleAlert,
} from "lucide-react";

import type { Investment } from "../../types/investment";

interface Props {
  investments: Investment[];
}

function PortfolioInsights({
  investments,
}: Props) {
  if (!investments.length) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center shadow dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-xl font-bold dark:text-white">
          Portfolio Insights
        </h2>

        <p className="mt-3 text-gray-500">
          Add investments to unlock smart portfolio insights.
        </p>
      </div>
    );
  }

  const totalInvestment = investments.reduce(
    (sum, item) => sum + item.investedAmount,
    0,
  );

  const currentValue = investments.reduce(
    (sum, item) => sum + item.currentValue,
    0,
  );

  const profit = currentValue - totalInvestment;

  const roi =
    totalInvestment === 0
      ? 0
      : (profit / totalInvestment) * 100;

  const bestInvestment = [...investments].sort(
    (a, b) =>
      b.currentValue -
      b.investedAmount -
      (a.currentValue - a.investedAmount),
  )[0];

  const highRisk = investments.find(
    (item) => item.riskLevel === "High",
  );

  let health = 100;

  if (roi < 0) health -= 35;

  if (highRisk) health -= 15;

  if (investments.length === 1) health -= 10;

  health = Math.max(0, health);

  let recommendation =
    "Your portfolio looks balanced.";

  if (roi < 0) {
    recommendation =
      "Review underperforming investments and avoid emotional decisions.";
  } else if (highRisk) {
    recommendation =
      "Reduce high-risk exposure by adding diversified assets.";
  } else if (investments.length === 1) {
    recommendation =
      "Diversify your portfolio across multiple asset classes.";
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-linear-to-r from-indigo-50 via-white to-cyan-50 p-6 shadow-xl dark:border-gray-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">

      <div className="mb-6 flex items-center gap-3">

        <Brain
          className="text-indigo-600"
          size={28}
        />

        <h2 className="text-2xl font-bold dark:text-white">
          Portfolio Insights
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {/* Health */}

        <div className="rounded-2xl bg-white p-5 shadow dark:bg-gray-900">

          <ShieldCheck
            className="mb-3 text-green-600"
          />

          <p className="text-sm text-gray-500">
            Portfolio Health
          </p>

          <h3 className="mt-2 text-3xl font-bold text-green-600">
            {health}/100
          </h3>

        </div>

        {/* Best */}

        <div className="rounded-2xl bg-white p-5 shadow dark:bg-gray-900">

          <Trophy
            className="mb-3 text-yellow-500"
          />

          <p className="text-sm text-gray-500">
            Best Performer
          </p>

          <h3 className="mt-2 text-xl font-bold dark:text-white">
            {bestInvestment.title}
          </h3>

        </div>

        {/* Risk */}

        <div className="rounded-2xl bg-white p-5 shadow dark:bg-gray-900">

          <TriangleAlert
            className="mb-3 text-red-600"
          />

          <p className="text-sm text-gray-500">
            Highest Risk
          </p>

          <h3 className="mt-2 text-xl font-bold text-red-600">
            {highRisk
              ? highRisk.title
              : "None"}
          </h3>

        </div>

        {/* ROI */}

        <div className="rounded-2xl bg-white p-5 shadow dark:bg-gray-900">

          <Brain
            className="mb-3 text-blue-600"
          />

          <p className="text-sm text-gray-500">
            Portfolio ROI
          </p>

          <h3
            className={`mt-2 text-3xl font-bold ${
              roi >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {roi.toFixed(2)}%
          </h3>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-indigo-200 bg-white p-5 dark:border-indigo-800 dark:bg-gray-900">

        <h3 className="font-bold dark:text-white">
          💡 AI Recommendation
        </h3>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
          {recommendation}
        </p>

      </div>

    </div>
  );
}

export default PortfolioInsights;