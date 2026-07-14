import { Repeat } from "lucide-react";

import { useRecurring } from "../../hooks/useRecurring";

function RecurringReport() {
  const { recurring } = useRecurring();

  const active =
    recurring.filter(
      (item) => item.isActive,
    ).length;

  const monthly =
    recurring.filter(
      (item) =>
        item.frequency === "Monthly",
    ).length;

  const totalAmount =
    recurring.reduce(
      (sum, item) =>
        sum + item.amount,
      0,
    );

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

      <div className="mb-6 flex items-center gap-3">

        <Repeat
          className="text-cyan-600"
          size={28}
        />

        <h2 className="text-2xl font-bold dark:text-white">
          Recurring Report
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div>

          <p className="text-gray-500">
            Active
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {active}
          </h2>

        </div>

        <div>

          <p className="text-gray-500">
            Monthly
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {monthly}
          </h2>

        </div>

        <div>

          <p className="text-gray-500">
            Total Amount
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            ₹{totalAmount.toLocaleString("en-IN")}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default RecurringReport;