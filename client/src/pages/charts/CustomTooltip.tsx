interface Props {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: Props) {
  if (
    !active ||
    !payload ||
    !payload.length
  )
    return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-900">

      <h3 className="mb-2 font-bold dark:text-white">
        {label}
      </h3>

      {payload.map((item) => (

        <div
          key={item.dataKey}
          className="mb-1 flex items-center justify-between gap-5"
        >
          <span
            style={{
              color: item.color,
            }}
            className="font-medium"
          >
            {item.name}
          </span>

          <span className="font-bold dark:text-white">
            ₹{Number(item.value).toLocaleString("en-IN")}
          </span>

        </div>

      ))}

    </div>
  );
}

export default CustomTooltip;