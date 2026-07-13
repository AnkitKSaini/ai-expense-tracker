import { Calendar, Pencil, Trash2, Play, Repeat } from "lucide-react";

import { toast } from "react-hot-toast";

import { recurringService } from "../../services/recurring.service";

import type { RecurringTransaction } from "../../types/recurring";
import { useRecurring } from "../../hooks/useRecurring";

interface Props {
  recurring: RecurringTransaction;
  onEdit: () => void;
  onDelete: () => void;
}

function RecurringCard({ recurring, onEdit, onDelete }: Props) {
  const { refetch } = useRecurring();
  const handleRun = async () => {
    try {
      await recurringService.run(recurring._id);

      await refetch();

      toast.success("Recurring transaction executed successfully.");
    } catch {
      toast.error("Failed to execute recurring transaction.");
    }
  };

  const daysLeft = Math.ceil(
    (new Date(recurring.nextRun).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <div
      className="
      rounded-3xl
      border
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      dark:border-gray-800
      dark:bg-gray-900
    "
    >
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold dark:text-white">
            {recurring.title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">{recurring.category}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              recurring.isActive
                ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                : "bg-red-100 text-red-700 dark:bg-red-900/30"
            }`}
          >
            {recurring.isActive ? "Active" : "Inactive"}
          </span>

          {daysLeft <= 3 && daysLeft >= 0 && recurring.isActive && (
            <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
              Due Soon
            </span>
          )}

          {daysLeft < 0 && recurring.isActive && (
            <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">
              Overdue
            </span>
          )}
        </div>
      </div>
      {/* Amount */}

      <div className="mt-6">
        <p className="text-sm text-gray-500">Amount</p>

        <h3
          className={`mt-1 text-3xl font-bold ${
            recurring.type === "Income" ? "text-green-600" : "text-red-600"
          }`}
        >
          ₹{recurring.amount.toLocaleString("en-IN")}
        </h3>
      </div>

      {/* Details */}

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Repeat size={18} />
            Frequency
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30">
            {recurring.frequency}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar size={18} />
            Next Run
          </div>

          <span className="font-semibold dark:text-white">
            {new Date(recurring.nextRun).toLocaleDateString("en-IN")}
          </span>
        </div>
      </div>

      {/* Buttons */}

      <div className="mt-8 grid grid-cols-3 gap-3">
        <button
          onClick={onEdit}
          className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-blue-600
          py-3
          font-medium
          text-white
          transition
          hover:bg-blue-700
        "
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={onDelete}
          className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-red-600
          py-3
          font-medium
          text-white
          transition
          hover:bg-red-700
        "
        >
          <Trash2 size={18} />
        </button>

        <button
          onClick={handleRun}
          className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-green-600
          py-3
          font-medium
          text-white
          transition
          hover:bg-green-700
          "
        >
          <Play size={18} />
        </button>
      </div>
    </div>
  );
}

export default RecurringCard;
