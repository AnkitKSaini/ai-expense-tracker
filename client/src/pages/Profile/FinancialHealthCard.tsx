interface Props {
  balance: number;
  income: number;
  expense: number;
}

function FinancialHealthCard({
  balance,
  income,
  expense,
}: Props) {
  const savingRate =
    income > 0
      ? (((income - expense) / income) * 100).toFixed(1)
      : "0";

  const health =
    balance > 0
      ? "Excellent"
      : "Needs Attention";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-5 text-xl font-bold dark:text-white">
        ❤️ Financial Health
      </h2>

      <div className="space-y-3">
        <p className="dark:text-gray-300">
          Status:
          <span className="ml-2 font-semibold text-green-600">
            {health}
          </span>
        </p>

        <p className="dark:text-gray-300">
          Saving Rate:
          <span className="ml-2 font-semibold">
            {savingRate}%
          </span>
        </p>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-green-500"
            style={{
              width: `${Math.min(Number(savingRate), 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FinancialHealthCard;