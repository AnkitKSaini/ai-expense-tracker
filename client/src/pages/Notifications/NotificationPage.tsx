import { useState } from "react";
import { Bell } from "lucide-react";

import { useNotifications } from "../../hooks/useNotifications";

import NotificationCard from "./NotificationCard";
import NotificationFilters from "./NotificationFilters";
import NotificationSearch from "./NotificationSearch";
import NotificationStats from "./NotificationStats";

function NotificationPage() {
  const {
    notifications,
    markRead,
    markAllRead,
    deleteNotification,
    deleteRead,
  } = useNotifications();

  const [filter, setFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [type, setType] = useState("All");

  const [priority, setPriority] = useState("All");

  const filtered = notifications.filter((item) => {
    const statusMatch =
      filter === "All"
        ? true
        : filter === "Unread"
          ? !item.isRead
          : item.isRead;

    const searchMatch = item.title.toLowerCase().includes(search.toLowerCase());

    const typeMatch = type === "All" ? true : item.type === type;

    const priorityMatch =
      priority === "All" ? true : item.priority === priority;

    return statusMatch && searchMatch && typeMatch && priorityMatch;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold dark:text-white">
            🔔 Notifications
          </h1>

          <p className="mt-2 text-gray-500">
            Stay updated with all financial activities.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => markAllRead()}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Mark All Read
          </button>

          <button
            onClick={() => deleteRead()}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white"
          >
            Delete Read
          </button>
        </div>
      </div>

      <NotificationStats notifications={notifications} />

      <NotificationSearch value={search} onChange={setSearch} />

      <NotificationFilters
        status={filter}
        type={type}
        priority={priority}
        onStatusChange={setFilter}
        onTypeChange={setType}
        onPriorityChange={setPriority}
      />

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-white p-16 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <Bell className="mx-auto text-gray-400" size={60} />

          <h2 className="mt-6 text-2xl font-bold dark:text-white">
            No Notifications
          </h2>

          <p className="mt-2 text-gray-500">You're all caught up.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onRead={() => markRead(notification._id)}
              onDelete={() => deleteNotification(notification._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationPage;
