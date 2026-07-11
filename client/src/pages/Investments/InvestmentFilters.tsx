interface Props {
  value: string;
  onChange: (value: string) => void;
}

const filters = [
  "All",
  "Stock",
  "Mutual Fund",
  "SIP",
  "ETF",
  "Gold",
  "Crypto",
  "FD",
  "PPF",
  "NPS",
  "Real Estate",
];

function InvestmentFilters({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
        w-full
        rounded-2xl
        border
        border-gray-300
        bg-white
        px-4
        py-3
        outline-none
        transition
        focus:border-indigo-500
        dark:border-gray-700
        dark:bg-gray-900
        dark:text-white
      "
    >
      {filters.map((filter) => (
        <option
          key={filter}
          value={filter}
        >
          {filter}
        </option>
      ))}
    </select>
  );
}

export default InvestmentFilters;