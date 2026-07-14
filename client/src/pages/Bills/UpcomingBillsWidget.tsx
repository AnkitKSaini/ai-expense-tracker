import { ReceiptText } from "lucide-react";

import { useBills } from "../../hooks/useBills";

function UpcomingBills() {
  const { bills } = useBills();

  const upcoming = bills
    .filter((bill) => bill.status === "Pending")
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5 flex items-center gap-3">
        <ReceiptText size={24} className="text-orange-600" />

        <h2 className="text-xl font-bold dark:text-white">Upcoming Bills</h2>
      </div>

      {upcoming.length === 0 ? (
        <p className="text-gray-500">No pending bills.</p>
      ) : (
        <div className="space-y-4">
          {upcoming.map((bill) => (
            <div
              key={bill._id}
              className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-800"
            >
              <div>
                <p className="font-semibold dark:text-white">{bill.title}</p>

                <p className="text-sm text-gray-500">
                  Due: {new Date(bill.dueDate).toLocaleDateString("en-IN")}
                </p>
              </div>

              <p className="font-bold text-orange-600">
                ₹{bill.amount.toLocaleString("en-IN")}
              </p>

              <p className="text-xs text-orange-500">{bill.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingBills;
