import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function GoalSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search goals..."
        className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 shadow-sm transition focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
      />
    </div>
  );
}

export default GoalSearch;