import { motion } from "framer-motion";

interface CalendarCell {
  day: number | null;
}

interface CalendarExpense {
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

interface Props {
  currentDate: Date;
  expenses: CalendarExpense[];
  loading: boolean;
}

function CalendarGrid({ currentDate, expenses, loading }: Props) {
  if (loading) {
    return (
      <div className="rounded-3xl border bg-white p-10 text-center dark:bg-gray-900">
        Loading Calendar...
      </div>
    );
  }
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();

  const firstDay = new Date(year, month, 1);

  let startDay = firstDay.getDay();

  // Monday First
  startDay = startDay === 0 ? 6 : startDay - 1;

  const totalDays = new Date(year, month + 1, 0).getDate();

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const cells: CalendarCell[] = [];
  // Empty Cells
  for (let i = 0; i < startDay; i++) {
    cells.push({
      day: null,
    });
  }

  // Month Days
  for (let day = 1; day <= totalDays; day++) {
    cells.push({
      day,
    });
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      {/* Week Header */}
      <div className="mb-5 grid grid-cols-7 gap-3">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-3">
        {cells.map((cell, index) => {
          if (cell.day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const day = cell.day!;

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          const dayTransactions = expenses.filter((item) => {
            return new Date(item.date).getDate() === day;
          });

          const totalAmount = dayTransactions.reduce(
            (sum, item) => sum + item.amount,
            0,
          );

          const hasExpense = dayTransactions.some(
            (item) => item.type === "expense",
          );

          let heatColor = "";

          if (totalAmount > 0 && totalAmount < 500) {
            heatColor = "bg-green-100 dark:bg-green-900/30";
          } else if (totalAmount >= 500 && totalAmount < 1000) {
            heatColor = "bg-yellow-100 dark:bg-yellow-900/30";
          } else if (totalAmount >= 1000 && totalAmount < 2000) {
            heatColor = "bg-orange-100 dark:bg-orange-900/30";
          } else if (totalAmount >= 2000) {
            heatColor = "bg-red-100 dark:bg-red-900/30";
          }

          return (
            <motion.div
              key={day}
              whileHover={{
                scale: 1.08,
                y: -6,
                rotate: 1,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
              className={`group relative aspect-square rounded-2xl border p-2 transition-all cursor-pointer
  ${
    isToday
      ? "border-blue-600 bg-blue-600 text-white shadow-xl"
      : `border-gray-200 ${heatColor || "bg-gray-50"} hover:border-blue-500 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700`
  }
`}
            >
              {/* Day */}
              <div className="flex h-full flex-col justify-between">
                <div className="text-center text-lg font-bold">{day}</div>

                {dayTransactions.length > 0 ? (
                  <div className="space-y-1">
                    <div className="flex justify-center">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          hasExpense ? "bg-red-500" : "bg-green-500"
                        }`}
                      />
                    </div>

                    <p
                      className={`text-center text-[11px] font-semibold ${
                        isToday
                          ? "text-white"
                          : hasExpense
                            ? "text-red-600"
                            : "text-green-600"
                      }`}
                    >
                      ₹{totalAmount}
                    </p>
                  </div>
                ) : (
                  <div />
                )}
              </div>

              {/* Premium Tooltip */}

              {dayTransactions.length > 0 && (
                <div
                  className="
      pointer-events-none
      absolute
      left-1/2
      -top-32
      z-30
      hidden
      w-64
      -translate-x-1/2
      rounded-2xl  
      border
      border-gray-700
      bg-gray-900
      p-4
      text-white
      shadow-2xl
      group-hover:block
    "
                >
                  <h4 className="mb-3 text-lg font-bold">
                    📅 {day}{" "}
                    {currentDate.toLocaleString("default", {
                      month: "long",
                    })}
                  </h4>

                  <div className="space-y-3">
                    {dayTransactions.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b border-gray-700 pb-2"
                      >
                        <div>
                          <p className="font-semibold">{item.category}</p>

                          <p className="text-xs text-gray-400">{item.type}</p>
                        </div>

                        <p
                          className={`font-bold ${
                            item.type === "expense"
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          ₹{item.amount}
                        </p>
                      </div>
                    ))}

                    <div className="mt-3 flex justify-between border-t border-gray-700 pt-3">
                      <span className="font-bold">Total</span>

                      <span className="font-bold text-cyan-400">
                        ₹{totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Today Badge */}
              {isToday && (
                <div className="absolute -right-2 -top-2 rounded-full bg-yellow-400 px-2 py-1 text-[10px] font-bold text-black shadow-lg">
                  Today
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;
