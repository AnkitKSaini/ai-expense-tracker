interface Props {
  value: string;
  onChange: (
    value: string,
  ) => void;
}

function BillFilters({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="rounded-2xl border bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
    >
      <option value="All">
        All
      </option>

      <option value="Pending">
        Pending
      </option>

      <option value="Paid">
        Paid
      </option>

      <option value="Skipped">
        Skipped
      </option>
    </select>
  );
}

export default BillFilters;