import ExpensePieChart from "./ExpensePieChart";
import MonthlyChart from "./MonthlyChart";

interface MonthlyData {
  month: string;
  total: number;
}

interface CategoryData {
  category: string;
  total: number;
}

interface Props {
  monthlyData: MonthlyData[];
  categoryData: CategoryData[];
}

const DashboardAnalytics = ({
  monthlyData,
  categoryData,
}: Props) => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ExpensePieChart data={categoryData} />

      <MonthlyChart data={monthlyData} />
    </div>
  );
};

export default DashboardAnalytics;