import {
  Calendar,
  CreditCard,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react";

import type { Bill } from "../../types/bill";

interface Props {
  bill: Bill;
  onEdit: () => void;
  onDelete: () => void;
  onPay: () => void;
}

function BillCard({ bill, onEdit, onDelete, onPay }: Props) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(bill.dueDate);

  dueDate.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  const isOverdue = bill.status === "Pending" && diffDays < 0;

  const isDueToday = bill.status === "Pending" && diffDays === 0;

  const isDueTomorrow = bill.status === "Pending" && diffDays === 1;

  const isDueSoon = bill.status === "Pending" && diffDays > 1 && diffDays <= 3;

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold dark:text-white">{bill.title}</h2>

          <p className="mt-1 text-gray-500">{bill.category}</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            bill.status === "Paid"
              ? "bg-green-100 text-green-700"
              : isOverdue
                ? "bg-red-100 text-red-700"
                : isDueToday
                  ? "bg-red-50 text-red-600"
                  : isDueTomorrow
                    ? "bg-orange-100 text-orange-700"
                    : isDueSoon
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
          }`}
        >
          {bill.status === "Paid"
            ? "Paid"
            : isOverdue
              ? "Overdue"
              : isDueToday
                ? "Due Today"
                : isDueTomorrow
                  ? "Due Tomorrow"
                  : isDueSoon
                    ? "Due Soon"
                    : "Pending"}
        </span>
      </div>

      <h3 className="mt-6 text-3xl font-bold text-blue-600">
        ₹{bill.amount.toLocaleString("en-IN")}
      </h3>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar size={18} />
            Due Date
          </div>

          <span className="font-semibold dark:text-white">
            {new Date(bill.dueDate).toLocaleDateString("en-IN")}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <CreditCard size={18} />
            Payment
          </div>

          <span className="font-semibold dark:text-white">
            {bill.paymentMethod}
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <button
          onClick={onEdit}
          className="rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          <Pencil className="mx-auto" size={18} />
        </button>

        <button
          onClick={onDelete}
          className="rounded-xl bg-red-600 py-3 text-white hover:bg-red-700"
        >
          <Trash2 className="mx-auto" size={18} />
        </button>

        <button
          disabled={bill.status === "Paid"}
          onClick={onPay}
          className="rounded-xl bg-green-600 py-3 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircle2 className="mx-auto" size={18} />
        </button>
      </div>
    </div>
  );
}

export default BillCard;
