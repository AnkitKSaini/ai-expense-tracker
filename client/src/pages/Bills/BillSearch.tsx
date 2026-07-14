import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function BillSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search bills..."
        className="
          w-full
          rounded-2xl
          border
          bg-white
          py-3
          pl-12
          pr-4
          shadow-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          dark:border-gray-700
          dark:bg-gray-900
          dark:text-white
        "
      />
    </div>
  );
}

export default BillSearch;