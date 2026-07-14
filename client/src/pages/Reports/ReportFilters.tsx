interface Props {
  value: string;

  onChange: (
    value: string,
  ) => void;
}

function ReportFilters({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value,
        )
      }
      className="rounded-xl border bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
    >
      <option value="Monthly">
        Monthly
      </option>

      <option value="Quarterly">
        Quarterly
      </option>

      <option value="Yearly">
        Yearly
      </option>
    </select>
  );
}

export default ReportFilters;