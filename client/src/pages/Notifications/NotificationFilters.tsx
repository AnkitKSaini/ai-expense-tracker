interface Props {
  status: string;
  type: string;
  priority: string;

  onStatusChange: (v: string) => void;
  onTypeChange: (v: string) => void;
  onPriorityChange: (v: string) => void;
}

function NotificationFilters({
  status,
  type,
  priority,
  onStatusChange,
  onTypeChange,
  onPriorityChange,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">

      <select
        value={status}
        onChange={(e) =>
          onStatusChange(
            e.target.value,
          )
        }
        className="rounded-xl border p-3 dark:bg-gray-900"
      >
        <option>All</option>
        <option>Unread</option>
        <option>Read</option>
      </select>

      <select
        value={type}
        onChange={(e) =>
          onTypeChange(
            e.target.value,
          )
        }
        className="rounded-xl border p-3 dark:bg-gray-900"
      >
        <option>All</option>
        <option>Expense</option>
        <option>Budget</option>
        <option>Goal</option>
        <option>Investment</option>
        <option>Recurring</option>
        <option>Bill</option>
        <option>AI</option>
        <option>System</option>
      </select>

      <select
        value={priority}
        onChange={(e) =>
          onPriorityChange(
            e.target.value,
          )
        }
        className="rounded-xl border p-3 dark:bg-gray-900"
      >
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

    </div>
  );
}

export default NotificationFilters;