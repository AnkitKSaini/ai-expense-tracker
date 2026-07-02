import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Expense } from "../../types/expense";
import { useExpenses } from "../../hooks/useExpenses";

interface Props {
  expense: Expense | null;
  onClose: () => void;
}

function EditExpenseModal({ expense, onClose }: Props) {
  const { register, handleSubmit, reset } = useForm<Expense>();

  const { updateExpense } = useExpenses();

  useEffect(() => {
    if (expense) reset(expense);
  }, [expense, reset]);

  const onSubmit = async (data: Expense) => {
    if (!expense) return;

    await updateExpense({
      id: expense._id,
      expense: data,
    });
    onClose();
  };

  if (!expense) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-6"
      >
        <h2 className="mb-4 text-xl font-bold">Edit Expense</h2>

        <input
          {...register("title")}
          className="mb-3 w-full rounded border p-2"
        />

        <input
          type="number"
          {...register("amount", {
            valueAsNumber: true,
          })}
          className="mb-3 w-full rounded border p-2"
        />

        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditExpenseModal;
