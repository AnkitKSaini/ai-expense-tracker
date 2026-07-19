import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  {
    name: "Food",
    value: 35,
  },
  {
    name: "Bills",
    value: 25,
  },
  {
    name: "Travel",
    value: 20,
  },
  {
    name: "Others",
    value: 20,
  },
];

const COLORS = [
  "#2563EB",
  "#06B6D4",
  "#8B5CF6",
  "#10B981",
];

function MiniExpenseChart() {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h3 className="font-semibold dark:text-white">
        Expense Distribution
      </h3>

      <div className="mt-4 h-40">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={40}
              outerRadius={60}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MiniExpenseChart;