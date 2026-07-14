import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";

import { useNotifications } from "../../hooks/useNotifications";
import NotificationDropdown from "./NotificationDropdown";

function NotificationBell() {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const { notifications } = useNotifications();

  const unread = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-xl p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Bell size={24} />

        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      {open && <NotificationDropdown close={() => setOpen(false)} />}
    </div>
  );
}

export default NotificationBell;
