import {
  ShieldAlert,
  ShieldCheck,
  Shield,
} from "lucide-react";

import type { Investment } from "../../types/investment";

import {
  getPortfolioRiskSummary,
} from "../../utils/investmentRisk";

interface Props {
  investments: Investment[];
}

function RiskSummaryCard({
  investments,
}: Props) {
  const summary =
    getPortfolioRiskSummary(
      investments,
    );

  const Icon =
    summary.overallRisk === "High"
      ? ShieldAlert
      : summary.overallRisk === "Medium"
      ? Shield
      : ShieldCheck;

  const color =
    summary.overallRisk === "High"
      ? "text-red-600"
      : summary.overallRisk === "Medium"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">

      <div className="mb-6 flex items-center gap-3">

        <Icon
          className={color}
          size={28}
        />

        <h2 className="text-2xl font-bold dark:text-white">
          Portfolio Risk Summary
        </h2>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div>
          <p className="text-gray-500">
            Overall Risk
          </p>

          <h3 className={`mt-2 text-2xl font-bold ${color}`}>
            {summary.overallRisk}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Diversification
          </p>

          <h3 className="mt-2 text-2xl font-bold text-blue-600">
            {summary.diversificationScore}%
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Concentration
          </p>

          <h3 className="mt-2 text-2xl font-bold text-purple-600">
            {summary.concentrationScore}%
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            High Risk Assets
          </p>

          <h3 className="mt-2 text-2xl font-bold text-red-600">
            {summary.highRiskPercentage}%
          </h3>
        </div>

      </div>

    </div>
  );
}

export default RiskSummaryCard;