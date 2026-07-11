import {
  TrendingUp,
  TrendingDown,
  PieChart,
  Wallet,
} from "lucide-react";

import type { Investment } from "../../types/investment";

interface Props {
  investments: Investment[];
}

function PortfolioAnalytics({
  investments,
}: Props) {
  const totalInvestment =
    investments.reduce(
      (sum, item) =>
        sum + item.investedAmount,
      0,
    );

  const currentValue =
    investments.reduce(
      (sum, item) =>
        sum + item.currentValue,
      0,
    );

  const profit =
    currentValue - totalInvestment;

  const roi =
    totalInvestment === 0
      ? 0
      : (profit / totalInvestment) *
        100;

  const activeAssets =
    investments.filter(
      (item) =>
        item.status === "Active",
    ).length;

  const cards = [
    {
      title: "Portfolio Value",
      value: `₹${currentValue.toLocaleString()}`,
      icon: Wallet,
      color: "text-blue-600",
    },
    {
      title: "Total Profit",
      value: `₹${profit.toLocaleString()}`,
      icon:
        profit >= 0
          ? TrendingUp
          : TrendingDown,
      color:
        profit >= 0
          ? "text-green-600"
          : "text-red-600",
    },
    {
      title: "ROI",
      value: `${roi.toFixed(2)}%`,
      icon: PieChart,
      color: "text-purple-600",
    },
    {
      title: "Active Assets",
      value: activeAssets,
      icon: TrendingUp,
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

                <h2
                  className={`mt-2 text-3xl font-bold ${card.color}`}
                >
                  {card.value}
                </h2>

              </div>

              <div className="rounded-2xl bg-gray-100 p-4 dark:bg-gray-800">

                <Icon
                  size={28}
                  className={card.color}
                />

              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}

export default PortfolioAnalytics;