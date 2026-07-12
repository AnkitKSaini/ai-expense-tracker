import {
  Trophy,
  TrendingDown,
  Wallet,
  TriangleAlert,
} from "lucide-react";

import type { Investment } from "../../types/investment";

interface Props {
  investments: Investment[];
}

function TopPerformers({
  investments,
}: Props) {
  if (!investments.length) return null;

  const investmentsWithROI = investments.map((item) => {
    const profit =
      item.currentValue -
      item.investedAmount;

    const roi =
      item.investedAmount === 0
        ? 0
        : (profit /
            item.investedAmount) *
          100;

    return {
      ...item,
      profit,
      roi,
    };
  });

  const bestROI = [...investmentsWithROI].sort(
    (a, b) => b.roi - a.roi,
  )[0];

  const worstROI = [...investmentsWithROI].sort(
    (a, b) => a.roi - b.roi,
  )[0];

  const highestInvestment =
    [...investments].sort(
      (a, b) =>
        b.investedAmount -
        a.investedAmount,
    )[0];

  const highestRisk =
    investments.find(
      (item) =>
        item.riskLevel === "High",
    ) ?? null;

  const cards = [
    {
      title: "Best ROI",
      value: bestROI.title,
      extra: `${bestROI.roi.toFixed(1)}%`,
      icon: Trophy,
      color: "text-green-600",
    },
    {
      title: "Worst ROI",
      value: worstROI.title,
      extra: `${worstROI.roi.toFixed(1)}%`,
      icon: TrendingDown,
      color: "text-red-600",
    },
    {
      title: "Highest Investment",
      value: highestInvestment.title,
      extra: `₹${highestInvestment.investedAmount.toLocaleString()}`,
      icon: Wallet,
      color: "text-blue-600",
    },
    {
      title: "Highest Risk",
      value: highestRisk
        ? highestRisk.title
        : "None",
      extra: highestRisk
        ? highestRisk.riskLevel
        : "-",
      icon: TriangleAlert,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-lg font-bold dark:text-white">
                  {card.value}
                </h2>

                <p className={`mt-2 font-semibold ${card.color}`}>
                  {card.extra}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-100 p-4 dark:bg-gray-800">
                <Icon
                  className={card.color}
                  size={28}
                />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}

export default TopPerformers;