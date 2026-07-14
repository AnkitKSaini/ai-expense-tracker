import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function NotificationSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search notifications..."
        className="w-full rounded-2xl border py-3 pl-11 pr-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />

    </div>
  );
}

export default NotificationSearch;