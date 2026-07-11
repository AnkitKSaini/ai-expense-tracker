import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { useCalendarExpenses } from "../../hooks/useCalendarExpenses";
import MonthlyAnalytics from "./MonthlyAnalytics";
import HeatmapLegend from "./HeatmapLegend";
import SpendingTimeline from "./SpendingTimeline";
import BudgetForecast from "./BudgetForecast";
import BudgetAIInsights from "./BudgetAIInsights";

interface Props {
  budget: number;
}

function BudgetCalendar({ budget }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = currentDate.getMonth() + 1;

  const year = currentDate.getFullYear();

  const { data, isPending } = useCalendarExpenses(month, year);

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="space-y-6">
      <CalendarHeader
        currentDate={currentDate}
        onPrev={previousMonth}
        onNext={nextMonth}
        onToday={goToToday}
      />

      <CalendarGrid
        currentDate={currentDate}
        expenses={data?.data ?? []}
        loading={isPending}
      />
      <MonthlyAnalytics expenses={data?.data ?? []} />

      <BudgetForecast expenses={data?.data ?? []} budget={budget} />

      <BudgetAIInsights expenses={data?.data ?? []} budget={budget} />

      <SpendingTimeline expenses={data?.data ?? []} />

      <HeatmapLegend />
    </div>
  );
}

export default BudgetCalendar;
