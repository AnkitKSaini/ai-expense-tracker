import { useState } from "react";
import { Wallet, RotateCcw } from "lucide-react";
import { useBudget } from "../../hooks/useBudget";
import toast from "react-hot-toast";

function BudgetForm() {
  const today = new Date();

  const { budget, createBudget, resetBudget } = useBudget(
    today.getMonth() + 1,
    today.getFullYear(),
  );

  const [amount, setAmount] = useState(
    budget?.amount?.toString() ?? "",
  );

  const saveBudget = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid budget.");
      return;
    }

    try {
      await createBudget({
        amount: Number(amount),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
      });

      toast.success("Budget saved successfully");
    } catch {
      toast.error("Failed to save budget");
    }
  };

  const handleReset = async () => {
    if (!budget) {
      toast.error("No budget found");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to reset your monthly budget?",
    );

    if (!confirmed) return;

    try {
      await resetBudget(budget._id);

      setAmount("");

      toast.success("Budget reset successfully");
    } catch {
      toast.error("Failed to reset budget");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-6 flex items-center gap-3">
        <Wallet
          className="text-blue-600"
          size={28}
        />

        <h2 className="text-2xl font-bold dark:text-white">
          Set Monthly Budget
        </h2>
      </div>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter monthly budget"
        className="w-full rounded-xl border border-gray-300 bg-white p-4 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />

      <button
        onClick={saveBudget}
        className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Save Budget
      </button>

      {budget && (
        <button
          onClick={handleReset}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500 py-3 font-semibold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <RotateCcw size={18} />
          Reset Budget
        </button>
      )}
    </div>
  );
}

export default BudgetForm;