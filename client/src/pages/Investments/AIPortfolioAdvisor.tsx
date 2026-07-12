import { Brain } from "lucide-react";

import type { Investment } from "../../types/investment";

import { getPortfolioAdvice } from "../../utils/investmentAdvisor";

interface Props {
  investments: Investment[];
}

function AIPortfolioAdvisor({
  investments,
}: Props) {
  const advice =
    getPortfolioAdvice(investments);

  return (
    <div className="rounded-3xl border border-indigo-200 bg-linear-to-r from-indigo-50 via-white to-cyan-50 p-6 shadow-xl dark:border-indigo-900 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">

      <div className="mb-6 flex items-center gap-3">

        <Brain
          className="text-indigo-600"
          size={28}
        />

        <h2 className="text-2xl font-bold dark:text-white">
          AI Portfolio Advisor
        </h2>

      </div>

      <div className="mb-6 flex items-center justify-between">

        <div>

          <p className="text-gray-500">
            Portfolio Score
          </p>

          <h3 className="mt-2 text-4xl font-bold text-indigo-600">
            {advice.score}/100
          </h3>

        </div>

        <span className="rounded-full bg-indigo-100 px-4 py-2 font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
          {advice.status}
        </span>

      </div>

      <div className="space-y-3">

        {advice.recommendations.map(
          (item, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900"
            >
              💡 {item}
            </div>
          ),
        )}

      </div>

    </div>
  );
}

export default AIPortfolioAdvisor;