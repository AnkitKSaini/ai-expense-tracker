import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { useCalendarExpenses } from "../../hooks/useCalendarExpenses";

function BudgetCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = currentDate.getMonth() + 1;

const year = currentDate.getFullYear();

const { data, isPending } =
  useCalendarExpenses(month, year);

  const previousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1,
      ),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1,
      ),
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
     </div>
  );
}

export default BudgetCalendar;