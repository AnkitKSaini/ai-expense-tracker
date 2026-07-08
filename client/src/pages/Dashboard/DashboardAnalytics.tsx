import ExpensePieChart from "./ExpensePieChart";
import MonthlyChart from "./MonthlyChart";
import IncomeExpenseChart from "./IncomeExpenseChart";
import TopCategoriesChart from "./TopCategoriesChart";

interface MonthlyData {
  month: string;
  total: number;
}

interface CategoryData {
  category: string;
  total: number;
}

interface IncomeExpenseData {
  month: string;
  income: number;
  expense: number;
}

interface Props {
  monthlyData: MonthlyData[];
  categoryData: CategoryData[];
  incomeExpenseData: IncomeExpenseData[];
}

function DashboardAnalytics({
  monthlyData,
  categoryData,
  incomeExpenseData,
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ExpensePieChart data={categoryData} />

      <MonthlyChart data={monthlyData} />

      <div className="lg:col-span-2">
        <IncomeExpenseChart data={incomeExpenseData} />

        <TopCategoriesChart data={categoryData} />
      </div>
    </div>
  );
}

export default DashboardAnalytics;
