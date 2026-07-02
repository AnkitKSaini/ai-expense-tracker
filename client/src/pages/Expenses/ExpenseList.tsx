import ExpenseCard from "./ExpenseCard";
import { useExpenses } from "../../hooks/useExpenses";


function ExpenseList() {
  const { expenses, loading } = useExpenses();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (expenses.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No expenses found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense._id}
          expense={expense}
        />
      ))}
    </div>
  );
}

export default ExpenseList;