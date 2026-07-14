import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

import type { RecurringTransaction } from "../../types/recurring";
import { useRecurring } from "../../hooks/useRecurring";

interface Props {
  open: boolean;
  recurring: RecurringTransaction | null;
  onClose: () => void;
}

function RecurringForm({ open, recurring, onClose }: Props) {
  const { register, handleSubmit, reset } = useForm();
  const { createRecurring, updateRecurring } = useRecurring();

  useEffect(() => {
    if (recurring) {
      reset(recurring);
    } else {
      reset({
        type: "Expense",
        frequency: "Monthly",
        isActive: true,
      });
    }
  }, [recurring, reset]);

  const onSubmit = async (data: any) => {
    try {
      if (recurring) {
        await updateRecurring({
          id: recurring._id,
          data,
        });
      } else {
        await createRecurring(data);
      }

      onClose();

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl dark:bg-gray-900">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-8 dark:border-gray-800">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">
              {recurring ? "Edit Recurring" : "New Recurring"}
            </h2>

            <p className="mt-1 text-gray-500">
              Automate your recurring transactions.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={22} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-h-[65vh] overflow-y-auto overscroll-contain p-8"
        >
          {" "}
          <div className="grid gap-5 md:grid-cols-2">
            <input
              {...register("title")}
              placeholder="Title"
              className="rounded-xl border p-3 dark:bg-gray-800"
            />

            <input
              type="number"
              {...register("amount")}
              placeholder="Amount"
              className="rounded-xl border p-3 dark:bg-gray-800"
            />

            <select
              {...register("type")}
              className="rounded-xl border p-3 dark:bg-gray-800"
            >
              <option>Expense</option>
              <option>Income</option>
            </select>

            <input
              {...register("category")}
              placeholder="Category"
              className="rounded-xl border p-3 dark:bg-gray-800"
            />

            <select
              {...register("frequency")}
              className="rounded-xl border p-3 dark:bg-gray-800"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>

            <input
              type="date"
              {...register("startDate")}
              className="rounded-xl border p-3 dark:bg-gray-800"
            />

            <input
              type="date"
              {...register("endDate")}
              className="rounded-xl border p-3 dark:bg-gray-800"
            />

            <select
              {...register("isActive")}
              className="rounded-xl border p-3 dark:bg-gray-800"
            >
              <option value="true">Active</option>

              <option value="false">Inactive</option>
            </select>
          </div>
          <textarea
            {...register("notes")}
            rows={4}
            placeholder="Notes"
            className="w-full rounded-xl border p-3 dark:bg-gray-800"
          />
          <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-6 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              {recurring ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecurringForm;
