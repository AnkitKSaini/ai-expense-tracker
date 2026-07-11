import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function InvestmentSearch({
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
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search investments..."
        className="
          w-full
          rounded-2xl
          border
          border-gray-300
          bg-white
          py-3
          pl-12
          pr-4
          outline-none
          transition-all
          focus:border-indigo-500
          focus:ring-4
          focus:ring-indigo-100
          dark:border-gray-700
          dark:bg-gray-900
          dark:text-white
        "
      />

    </div>
  );
}

export default InvestmentSearch;