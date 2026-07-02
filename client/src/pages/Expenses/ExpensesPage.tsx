import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";


function ExpensesPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <ExpenseForm />
      
      <ExpenseList />

    </div>
  );
}

export default ExpensesPage;