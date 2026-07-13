import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useState } from "react";

import { useRecurring } from "../../hooks/useRecurring";

function RecurringCalendar() {
  const { recurring } = useRecurring();

  const [date, setDate] = useState<Date>(new Date());

  const events = recurring.filter(
    (item) => new Date(item.nextRun).toDateString() === date.toDateString(),
  );

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        📅 Recurring Calendar
      </h2>

     <div className="calendar-wrapper">
  <Calendar
    value={date}
    onChange={(value) => setDate(value as Date)}
    tileClassName={({ date }) => {
      const hasRecurring = recurring.some(
        (item) =>
          new Date(item.nextRun).toDateString() ===
          date.toDateString(),
      );

      return hasRecurring
        ? "has-recurring"
        : "";
    }}
  />
</div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-900/20">
          <p className="text-sm text-gray-500">Active</p>

          <h2 className="mt-2 text-2xl font-bold dark:text-white">
            {recurring.filter((i) => i.isActive).length}
          </h2>
        </div>

        <div className="rounded-2xl bg-green-50 p-5 dark:bg-green-900/20">
          <p className="text-sm text-gray-500">Income</p>

          <h2 className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
            ₹
            {recurring
              .filter((i) => i.type === "Income")
              .reduce((sum, i) => sum + i.amount, 0)
              .toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="rounded-2xl bg-red-50 p-5 dark:bg-red-900/20">
          <p className="text-sm text-gray-500">Expense</p>

          <h2 className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
            {" "}
            ₹
            {recurring
              .filter((i) => i.type === "Expense")
              .reduce((sum, i) => sum + i.amount, 0)
              .toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-4 font-semibold dark:text-white">
          Scheduled Transactions
        </h3>

        {events.length === 0 ? (
          <p className="text-gray-500">
            No recurring transactions on this date.
          </p>
        ) : (
          <div className="space-y-3">
            {events.map((item) => (
              <div
                key={item._id}
                className="rounded-xl border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold dark:text-white">
                      {item.title}
                    </p>

                    <p className="text-sm text-gray-500">{item.frequency}</p>
                  </div>

                  <span
                    className={`font-bold ${
                      item.type === "Income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹{item.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecurringCalendar;
