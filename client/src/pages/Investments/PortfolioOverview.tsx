import {
  Wallet,
  TrendingUp,
  DollarSign,
  PieChart,
} from "lucide-react";

import type { PortfolioSummary } from "../../types/investment";

interface Props {
  summary?: PortfolioSummary;

  loading: boolean;
}

function PortfolioOverview({
  summary,
  loading,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-3xl border bg-white p-12 text-center dark:bg-gray-900">
        Loading Portfolio...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Investment",
      value: `₹${summary?.totalInvestment.toLocaleString() ?? 0}`,
      icon: Wallet,
      color: "text-blue-600",
    },
    {
      title: "Current Value",
      value: `₹${summary?.currentValue.toLocaleString() ?? 0}`,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Profit",
      value: `₹${summary?.totalProfit.toLocaleString() ?? 0}`,
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "ROI",
      value: `${summary?.roi ?? 0}%`,
      icon: PieChart,
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

export default PortfolioOverview;