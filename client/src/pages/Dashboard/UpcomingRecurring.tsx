import { CalendarClock } from "lucide-react";

import { useRecurring } from "../../hooks/useRecurring";

function UpcomingRecurring() {
  const { recurring } =
    useRecurring();

  const upcoming = recurring
    .filter((item) => item.isActive)
    .sort(
      (a, b) =>
        new Date(a.nextRun).getTime() -
        new Date(b.nextRun).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

      <div className="mb-5 flex items-center gap-3">

        <CalendarClock
          className="text-blue-600"
          size={24}
        />

        <h2 className="text-xl font-bold dark:text-white">
          Upcoming Recurring
        </h2>

      </div>

      {upcoming.length === 0 ? (
        <p className="text-gray-500">
          No upcoming recurring transactions.
        </p>
      ) : (
        <div className="space-y-4">
          {upcoming.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-800"
            >
              <div>
                <p className="font-semibold dark:text-white">
                  {item.title}
                </p>

                <p className="text-sm text-gray-500">
                  {item.frequency}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-blue-600">
                  ₹
                  {item.amount.toLocaleString(
                    "en-IN",
                  )}
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(
                    item.nextRun,
                  ).toLocaleDateString(
                    "en-IN",
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default UpcomingRecurring;