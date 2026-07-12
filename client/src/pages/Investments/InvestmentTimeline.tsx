import {
  CalendarDays,
  TrendingUp,
} from "lucide-react";

import type { Investment } from "../../types/investment";

interface Props {
  investments: Investment[];
}

function InvestmentTimeline({
  investments,
}: Props) {
  if (!investments.length) {
    return null;
  }

  const sorted = [...investments].sort(
    (a, b) =>
      new Date(b.purchaseDate).getTime() -
      new Date(a.purchaseDate).getTime(),
  );

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">

      <div className="mb-8 flex items-center gap-3">

        <CalendarDays className="text-blue-600" />

        <h2 className="text-2xl font-bold dark:text-white">
          Investment Timeline
        </h2>

      </div>

      <div className="space-y-6">

        {sorted.map((investment) => (

          <div
            key={investment._id}
            className="flex gap-5"
          >

            <div className="flex flex-col items-center">

              <div className="rounded-full bg-blue-600 p-2 text-white">

                <TrendingUp size={16} />

              </div>

              <div className="mt-1 h-full w-px bg-gray-300 dark:bg-gray-700" />

            </div>

            <div className="flex-1 rounded-2xl bg-gray-50 p-5 dark:bg-gray-800">

              <div className="flex items-center justify-between">

                <h3 className="text-lg font-bold dark:text-white">
                  {investment.title}
                </h3>

                <span className="text-sm text-gray-500">
                  {new Date(
                    investment.purchaseDate,
                  ).toLocaleDateString()}
                </span>

              </div>

              <p className="mt-2 text-gray-500">
                Purchased via{" "}
                <strong>
                  {investment.platform}
                </strong>
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4">

                <div>

                  <p className="text-sm text-gray-500">
                    Invested
                  </p>

                  <h4 className="font-bold text-blue-600">
                    ₹{investment.investedAmount.toLocaleString()}
                  </h4>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Current Value
                  </p>

                  <h4 className="font-bold text-green-600">
                    ₹{investment.currentValue.toLocaleString()}
                  </h4>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default InvestmentTimeline;