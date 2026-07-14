import { Landmark } from "lucide-react";

import { useInvestments } from "../../hooks/useInvestments";

function InvestmentReport() {
  const { investments, portfolioSummary } = useInvestments();

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 flex items-center gap-3">
        <Landmark className="text-violet-600" size={28} />

        <h2 className="text-2xl font-bold dark:text-white">
          Investment Report
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div>
          <p className="text-gray-500">Total Investments</p>

          <h2 className="mt-2 text-3xl font-bold">{investments.length}</h2>
        </div>

        <div>
          <p className="text-gray-500">Invested</p>

          <h2 className="mt-2 text-3xl font-bold">
            ₹
            {(portfolioSummary?.totalInvestment ?? 0).toLocaleString(
              "en-IN",
            )}{" "}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Current Value</p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            ₹
            {(portfolioSummary?.currentValue ?? 0).toLocaleString("en-IN")}{" "}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Profit</p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            ₹{(portfolioSummary?.totalProfit ?? 0).toLocaleString("en-IN")}{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InvestmentReport;
