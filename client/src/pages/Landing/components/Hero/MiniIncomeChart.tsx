import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { value: 12 },
  { value: 18 },
  { value: 16 },
  { value: 25 },
  { value: 28 },
  { value: 35 },
];

function MiniIncomeChart() {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h3 className="font-semibold dark:text-white">
        Income Trend
      </h3>

      <div className="mt-4 h-36">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <Area
              dataKey="value"
              stroke="#2563EB"
              fill="#93C5FD"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MiniIncomeChart;