import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { expenseSchema, type ExpenseFormData } from "./expense.schema";
import { useExpenses } from "../../hooks/useExpenses";

function ExpenseForm() {
  const { createExpense } = useExpenses();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      type: "Expense",
    },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      setLoading(true);

      await createExpense(data);

      toast.success("Expense added successfully");

      reset();
    } catch (error) {
      toast.error("Failed to add expense");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg bg-white p-6 shadow"
    >
      <h2 className="text-2xl font-bold">Add Expense</h2>

      <input
        {...register("title")}
        placeholder="Title"
        className="w-full rounded border p-3"
      />
      <p className="text-sm text-red-500">{errors.title?.message}</p>

      <input
        type="number"
        {...register("amount")}
        placeholder="Amount"
        className="w-full rounded border p-3"
      />
      <p className="text-sm text-red-500">{errors.amount?.message}</p>

      <select {...register("category")} className="w-full rounded border p-3">
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Health">Health</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Salary">Salary</option>
        <option value="Other">Other</option>
      </select>
      <p className="text-sm text-red-500">{errors.category?.message}</p>

      <select {...register("type")} className="w-full rounded border p-3">
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>

      <input
        type="date"
        {...register("date")}
        className="w-full rounded border p-3"
      />
      <p className="text-sm text-red-500">{errors.date?.message}</p>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
