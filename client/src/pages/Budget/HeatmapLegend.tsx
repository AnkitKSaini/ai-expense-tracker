function HeatmapLegend() {
  const items = [
    {
      label: "Low",
      color: "bg-green-400",
    },
    {
      label: "Medium",
      color: "bg-yellow-400",
    },
    {
      label: "High",
      color: "bg-orange-400",
    },
    {
      label: "Very High",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-5 text-xl font-bold dark:text-white">
        🔥 Spending Heatmap
      </h2>

      <div className="flex flex-wrap gap-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3"
          >
            <div
              className={`h-5 w-5 rounded-md ${item.color}`}
            />

            <span className="font-medium dark:text-white">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeatmapLegend;