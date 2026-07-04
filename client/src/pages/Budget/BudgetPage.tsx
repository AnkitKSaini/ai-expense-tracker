import BudgetForm from "./BudgetForm";
import BudgetProgress from "./BudgetProgress";

import { useBudget } from "../../hooks/useBudget";
import { useDashboard } from "../../hooks/useDashboard";

function BudgetPage() {
  const today = new Date();

  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const { budget, loading } = useBudget(month, year);

  const { data: dashboard } = useDashboard();

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <BudgetForm />

      <BudgetProgress
        budget={budget?.amount ?? 0}
        spent={dashboard?.totalExpense ?? 0}
      />
    </div>
  );
}

export default BudgetPage;