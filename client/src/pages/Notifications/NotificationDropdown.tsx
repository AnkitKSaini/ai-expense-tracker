import { Link } from "react-router-dom";

import { useNotifications } from "../../hooks/useNotifications";

interface Props {
  close: () => void;
}

function NotificationDropdown({
  close,
}: Props) {

  const {
    notifications,
    markRead,
  } =
    useNotifications();

  const latest =
    notifications.slice(0, 5);

  return (

    <div className="absolute right-0 z-50 mt-3 w-96 rounded-3xl border bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">

      <div className="border-b p-5">

        <h2 className="text-xl font-bold dark:text-white">
          Notifications
        </h2>

      </div>

      <div className="max-h-96 overflow-y-auto">

        {latest.length === 0 ? (

          <p className="p-6 text-center text-gray-500">
            No notifications
          </p>

        ) : (

          latest.map((item) => (

            <button
              key={item._id}
              onClick={() =>
                markRead(item._id)
              }
              className={`block w-full border-b p-4 text-left transition hover:bg-gray-50 dark:hover:bg-gray-800 ${
                !item.isRead
                  ? "bg-blue-50 dark:bg-blue-900/20"
                  : ""
              }`}
            >
              <p className="font-semibold dark:text-white">
                {item.title}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {item.message}
              </p>

            </button>

          ))

        )}

      </div>

      <Link
        to="/notifications"
        onClick={close}
        className="block rounded-b-3xl bg-blue-600 p-4 text-center font-semibold text-white hover:bg-blue-700"
      >
        View All Notifications
      </Link>

    </div>

  );

}

export default NotificationDropdown;