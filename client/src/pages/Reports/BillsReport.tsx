import { ReceiptText } from "lucide-react";

import { useBills } from "../../hooks/useBills";

function BillsReport() {
  const { bills } = useBills();

  const paid =
    bills.filter(
      (bill) =>
        bill.status === "Paid",
    ).length;

  const pending =
    bills.filter(
      (bill) =>
        bill.status === "Pending",
    ).length;

  const total =
    bills.reduce(
      (sum, bill) =>
        sum + bill.amount,
      0,
    );

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

      <div className="mb-6 flex items-center gap-3">

        <ReceiptText
          className="text-orange-600"
          size={28}
        />

        <h2 className="text-2xl font-bold dark:text-white">
          Bills Report
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div>

          <p className="text-gray-500">
            Paid
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {paid}
          </h2>

        </div>

        <div>

          <p className="text-gray-500">
            Pending
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {pending}
          </h2>

        </div>

        <div>

          <p className="text-gray-500">
            Total Bills
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            ₹{total.toLocaleString("en-IN")}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default BillsReport;