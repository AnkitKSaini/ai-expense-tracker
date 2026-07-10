import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

interface Props {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

function CalendarHeader({
  currentDate,
  onPrev,
  onNext,
  onToday,
}: Props) {
  const monthYear = currentDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
      {/* Gradient Header */}
      <div className="bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600 px-8 py-6">
        <div className="flex items-center gap-3 text-white">
          <CalendarDays size={32} />

          <div>
            <h2 className="text-3xl font-bold">
              Budget Planner
            </h2>

            <p className="text-sm text-blue-100">
              Track your monthly spending
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
        <button
          onClick={onPrev}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <ChevronLeft size={20} />

          Previous
        </button>

        <div className="text-center">
          <h3 className="text-3xl font-bold dark:text-white">
            {monthYear}
          </h3>

          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Monthly Budget Calendar
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={onToday}
            className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Today
          </button>

          <button
            onClick={onNext}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Next

            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarHeader;