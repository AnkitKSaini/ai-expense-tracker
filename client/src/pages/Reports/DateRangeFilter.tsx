interface Props {
  startDate: string;
  endDate: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
}

function DateRangeFilter({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">

      <input
        type="date"
        value={startDate}
        onChange={(e) =>
          onStartChange(e.target.value)
        }
        className="rounded-xl border p-3 dark:bg-gray-900"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) =>
          onEndChange(e.target.value)
        }
        className="rounded-xl border p-3 dark:bg-gray-900"
      />

    </div>
  );
}

export default DateRangeFilter;