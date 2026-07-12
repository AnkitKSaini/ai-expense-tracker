import {
  CalendarDays,
  Pencil,
  Trash2,
  TrendingUp,
  TrendingDown,
  Wallet,
  Shield,
  Building2,
} from "lucide-react";

import type { Investment } from "../../types/investment";

interface Props {
  investment: Investment;
  onEdit: (investment: Investment) => void;
  onDelete: (id: string) => void;
}

function InvestmentCard({ investment, onEdit, onDelete }: Props) {
  const profit = investment.currentValue - investment.investedAmount;

  const roi =
    investment.investedAmount === 0
      ? 0
      : (profit / investment.investedAmount) * 100;

  const isProfit = profit >= 0;

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">
            {investment.title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">{investment.type}</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            investment.riskLevel === "High"
              ? "bg-red-100 text-red-700"
              : investment.riskLevel === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
          }`}
        >
          {investment.riskLevel} Risk
        </span>
      </div>

      {/* ROI */}

      <div className="mt-6 rounded-2xl bg-gray-50 p-5 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">ROI</span>

          <div
            className={`flex items-center gap-2 font-bold ${
              isProfit ? "text-green-600" : "text-red-600"
            }`}
          >
            {isProfit ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            {roi.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Details */}

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Invested</p>

          <h3 className="mt-1 font-bold text-blue-600">
            ₹{investment.investedAmount.toLocaleString()}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">Current</p>

          <h3 className="mt-1 font-bold text-green-600">
            ₹{investment.currentValue.toLocaleString()}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">Quantity</p>

          <h3 className="mt-1 font-bold dark:text-white">
            {investment.quantity}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">Profit / Loss</p>

          <h3
            className={`mt-1 font-bold ${
              isProfit ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{Math.abs(profit).toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-gray-500">
          <CalendarDays size={16} />

          {new Date(investment.purchaseDate).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Building2 size={16} />

          {investment.platform}
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Wallet size={16} />

          {investment.currency}
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Shield size={16} />

          {investment.status}
        </div>
      </div>

      {/* Action Buttons */}

      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          onClick={() => onEdit(investment)}
          className="
      group
      flex
      items-center
      justify-center
      gap-2
      rounded-2xl
      bg-linear-to-r
      from-blue-600
      to-cyan-600
      px-5
      py-3.5
      font-semibold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      active:scale-95
    "
        >
          <Pencil
            size={18}
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          Edit Investment
        </button>

        <button
          onClick={() => onDelete(investment._id)}
          className="
      group
      flex
      items-center
      justify-center
      gap-2
      rounded-2xl
      bg-linear-to-r
      from-red-600
      to-rose-600
      px-5
      py-3.5
      font-semibold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      active:scale-95
    "
        >
          <Trash2
            size={18}
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          Delete Investment
        </button>
      </div>
    </div>
  );
}

export default InvestmentCard;
