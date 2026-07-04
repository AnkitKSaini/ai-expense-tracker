import { useExpenses } from "../../hooks/useExpenses";
import ExpenseCard from "./ExpenseCard";

import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

import type { Expense } from "../../types/expense";

interface Props {
  search: string;
  category: string;
  sort: string;
  page: number;
  onEdit: (expense: Expense) => void;
}

function ExpenseList({ search, category, sort, page, onEdit }: Props) {
  const { expenses, loading, error, deleteExpense } = useExpenses(
    search,
    category,
    sort,
    page,
  );

  if (loading) return <Loader />;

  if (error) {
    return <ErrorState message="Failed to load expenses." />;
  }

  if (expenses.length === 0) {
    return <EmptyState title="No expenses found." />;
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense: Expense) => (
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
