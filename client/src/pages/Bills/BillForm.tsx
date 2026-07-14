import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Bill } from "../../types/bill";
import { useBills } from "../../hooks/useBills";

interface Props {
  open: boolean;
  bill: Bill | null;
  onClose: () => void;
}

function BillForm({ open, bill, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Utilities");
  const [dueDate, setDueDate] = useState("");
  const [reminderDays, setReminderDays] = useState("3");
  const { createBill, updateBill } = useBills();
  const [paymentMethod, setPaymentMethod] =
    useState<Bill["paymentMethod"]>("UPI");
  const [notes, setNotes] = useState("");

  const [autoCreateExpense, setAutoCreateExpense] = useState(true);

  useEffect(() => {
    if (bill) {
      setTitle(bill.title);
      setAmount(String(bill.amount));
      setCategory(bill.category);
      setDueDate(new Date(bill.dueDate).toISOString().split("T")[0]);
      setReminderDays(String(bill.reminderDays));

      setPaymentMethod(bill.paymentMethod ?? "UPI");
      setNotes(bill.notes ?? "");
      setAutoCreateExpense(bill.autoCreateExpense ?? true);
    } else {
      setTitle("");
      setAmount("");
      setCategory("Utilities");
      setDueDate("");
      setReminderDays("3");
      setPaymentMethod("UPI");
      setNotes("");
      setAutoCreateExpense(true);
    }
  }, [bill]);

  if (!open) return null;

  const handleSubmit = async () => {
    const data = {
      title,
      amount: Number(amount),
      category,
      dueDate,
      reminderDays: Number(reminderDays),
      paymentMethod,
      notes,
      autoCreateExpense,
    };

    try {
      if (bill) {
        await updateBill({
          id: bill._id,
          data,
        });
      } else {
        await createBill(data);
      }

      // Reset Form
      setTitle("");
      setAmount("");
      setCategory("Utilities");
      setDueDate("");
      setReminderDays("3");

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl dark:bg-gray-900">
        {/* Header */}

        <div className="flex items-start justify-between rounded-t-3xl bg-linear-to-r from-blue-600 to-cyan-600 px-8 py-6">
          <div>
            <h2 className="text-3xl font-bold text-white">
              {bill ? "Edit Bill" : "New Bill"}
            </h2>

            <p className="mt-2 text-blue-100">Manage your upcoming bills.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-white transition hover:bg-white/20"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}

        <div className="max-h-[65vh] overflow-y-auto overscroll-contain p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Title */}

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Electricity Bill"
                className="w-full rounded-2xl border p-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Amount */}

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Amount
              </label>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="5000"
                className="w-full rounded-2xl border p-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Category */}

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border p-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option>Utilities</option>
                <option>Internet</option>
                <option>Rent</option>
                <option>Insurance</option>
                <option>Subscription</option>
                <option>EMI</option>
                <option>Credit Card</option>
                <option>Other</option>
              </select>
            </div>

            {/* Due Date */}

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Due Date
              </label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-2xl border p-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Reminder Days */}

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Reminder Days
              </label>

              <input
                type="number"
                min={0}
                value={reminderDays}
                onChange={(e) => setReminderDays(e.target.value)}
                placeholder="3"
                className="w-full rounded-2xl border p-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Payment Method */}

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                Payment Method
              </label>

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value as Bill["paymentMethod"])
                }
                className="w-full rounded-2xl border p-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Wallet">Wallet</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Notes */}

            <div className="md:col-span-2">
              <label className="mb-2 block font-semibold dark:text-white">
                Notes
              </label>

              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes..."
                className="w-full rounded-2xl border p-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Auto Expense */}

            <div className="md:col-span-2">
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border p-5 dark:border-gray-700">
                <div>
                  <h3 className="font-semibold dark:text-white">
                    Auto Create Expense
                  </h3>

                  <p className="text-sm text-gray-500">
                    Automatically create an expense when this bill is paid.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoCreateExpense}
                  onChange={(e) => setAutoCreateExpense(e.target.checked)}
                  className="h-5 w-5 accent-blue-600"
                />{" "}
              </label>
            </div>
          </div>
        </div>
        {/* Footer */}

        <div className="flex flex-col-reverse gap-4 border-t p-6 dark:border-gray-700 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-2xl bg-linear-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {bill ? "Update Bill" : "Create Bill"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillForm;
