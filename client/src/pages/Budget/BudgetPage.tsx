import BudgetForm from "./BudgetForm";
import BudgetProgress from "./BudgetProgress";
import BudgetSummaryCard  from "./BudgetSummaryCard";
import BudgetTipsCard from "./BudgetTipsCard";

import { useBudget } from "../../hooks/useBudget";
import { useDashboard } from "../../hooks/useDashboard";
import Loader from "../../components/common/Loader";

function BudgetPage() {
  const today = new Date();

  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const { budget, loading } = useBudget(month, year);

  const { data: dashboard } = useDashboard();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      {/* Budget Summary */}
      <BudgetSummaryCard
        budget={budget?.amount ?? 0}
        spent={dashboard?.totalExpense ?? 0}
      />

      {/* Form + Progress */}
      <div className="grid gap-6 lg:grid-cols-2">
        <BudgetForm />

        <BudgetProgress
          budget={budget?.amount ?? 0}
          spent={dashboard?.totalExpense ?? 0}
        />
      </div>

      {/* AI Tips */}
      <BudgetTipsCard
        budget={budget?.amount ?? 0}
        spent={dashboard?.totalExpense ?? 0}
      />
    </div>
  );
}

export default BudgetPage;