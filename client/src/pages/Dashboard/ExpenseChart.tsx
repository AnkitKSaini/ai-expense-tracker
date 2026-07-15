import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", expense: 12000 },
  { month: "Feb", expense: 18000 },
  { month: "Mar", expense: 14000 },
  { month: "Apr", expense: 22000 },
  { month: "May", expense: 17000 },
];

function ExpenseChart() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-6">
        Monthly Expenses
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <Tooltip />
          <Line
            dataKey="Expense"
            stroke="#2563EB"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;