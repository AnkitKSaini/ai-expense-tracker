import { Bell, BellRing, AlertTriangle } from "lucide-react";

import type { Notification } from "../../types/notification";

interface Props {
  notifications: Notification[];
}

function NotificationStats({
  notifications,
}: Props) {
  const unread = notifications.filter(
    (n) => !n.isRead,
  ).length;

  const high = notifications.filter(
    (n) =>
      n.priority === "High",
  ).length;

  const cards = [
    {
      title: "Total",
      value: notifications.length,
      icon: Bell,
    },
    {
      title: "Unread",
      value: unread,
      icon: BellRing,
    },
    {
      title: "High Priority",
      value: high,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <Icon
              size={28}
              className="mb-4 text-blue-600"
            />

            <p className="text-gray-500">
              {card.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold dark:text-white">
              {card.value}
            </h2>

          </div>
        );
      })}
    </div>
  );
}

export default NotificationStats;