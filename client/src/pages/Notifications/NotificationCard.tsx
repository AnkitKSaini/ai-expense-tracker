import {
  Bell,
  CheckCircle2,
  Trash2,
} from "lucide-react";

import type { Notification } from "../../types/notification";

interface Props {
  notification: Notification;

  onRead: () => void;

  onDelete: () => void;
}

function NotificationCard({
  notification,
  onRead,
  onDelete,
}: Props) {

  const priorityColor = {
    Low: "border-l-green-500",
    Medium: "border-l-yellow-500",
    High: "border-l-red-500",
  }[notification.priority];

  return (
    <div
      className={`rounded-3xl border-l-4 ${priorityColor} border p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 ${
        notification.isRead
          ? "bg-white dark:bg-gray-900"
          : "border-blue-300 bg-blue-50 dark:bg-blue-950/20"
      }`}
    >
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="rounded-2xl bg-blue-600 p-3 text-white">
            <Bell size={22} />
          </div>

          <div>

            <h2 className="font-bold dark:text-white">
              {notification.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {notification.message}
            </p>

            <p className="mt-3 text-xs text-gray-400">
              {new Date(
                notification.createdAt,
              ).toLocaleString("en-IN")}
            </p>

          </div>

        </div>

        <div className="flex gap-2">

          {!notification.isRead && (
            <button
              onClick={onRead}
              className="rounded-xl bg-green-600 p-2 text-white transition hover:bg-green-700"
            >
              <CheckCircle2 size={18} />
            </button>
          )}

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 p-2 text-white transition hover:bg-red-700"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>
    </div>
  );
}

export default NotificationCard;