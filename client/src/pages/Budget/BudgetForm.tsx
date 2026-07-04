import { useState } from "react";
import { useBudget } from "../../hooks/useBudget";
import toast from "react-hot-toast";

function BudgetForm() {
  const today = new Date();

  const { createBudget } = useBudget(
    today.getMonth() + 1,
    today.getFullYear()
  );

  const [amount, setAmount] = useState("");

   const saveBudget = async () => {
  try {
    await createBudget({
      amount: Number(amount),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    });

    toast.success("Budget saved successfully");

    setAmount("");
  } catch {
    toast.error("Failed to save budget");
  }
};

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-4 text-xl font-bold">
        Monthly Budget
      </h2>

      <input
        type="number"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        className="w-full rounded border p-3"
        placeholder="Enter Budget"
      />

      <button
        onClick={saveBudget}
        className="mt-4 rounded bg-blue-600 px-5 py-2 text-white"
      >
        Save Budget
      </button>

    </div>
  );
}

export default BudgetForm;