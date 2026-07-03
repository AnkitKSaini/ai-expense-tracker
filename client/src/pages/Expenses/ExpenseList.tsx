import { useExpenses } from "../../hooks/useExpenses";
import ExpenseCard from "./ExpenseCard";

import type { Expense } from "../../types/expense";

interface Props {
  search: string;
  category: string;
  onEdit: (expense: Expense) => void;
}

function ExpenseList({ search, category, onEdit }: Props) {
  const { expenses, loading, deleteExpense } = useExpenses(search, category);
  
  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense._id}
          expense={expense}
          onEdit={onEdit}
          onDelete={async (id) => {
            if (!confirm("Delete this expense?")) return;

            await deleteExpense(id);
          }}
        />
      ))}
    </div>
  );
}

export default ExpenseList;
