interface Props {
  value: string;
  onChange: (value: string) => void;
}

function RecurringFilters({
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
        rounded-2xl
        border
        bg-white
        px-4
        py-3
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
    >
      <option value="All">
        All
      </option>

      <option value="Active">
        Active
      </option>

      <option value="Inactive">
        Inactive
      </option>
    </select>
  );
}

export default RecurringFilters;