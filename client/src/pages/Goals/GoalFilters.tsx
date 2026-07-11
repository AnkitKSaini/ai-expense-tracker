const filters = [
  "All",
  "Active",
  "Completed",
  "Urgent",
];

interface Props {
  value: string;
  onChange: (filter: string) => void;
}

function GoalFilters({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() =>
            onChange(filter)
          }
          className={`rounded-full px-5 py-2 text-sm font-semibold transition

${
  value === filter
    ? "bg-blue-600 text-white"
    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-white"
}`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default GoalFilters;