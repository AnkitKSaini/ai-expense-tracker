interface Props {
  budget: number;
  spent: number;
}

function BudgetProgress({ budget, spent }: Props) {

  const remaining = budget - spent;
const percentage = budget > 0 ? (spent / budget) * 100 : 0;

const progressWidth = Math.min(percentage, 100);
  let status = "Good";
  let color = "bg-green-500";

  if (percentage >= 100) {
    status = "Budget Exceeded";
    color = "bg-red-500";
  } else if (percentage >= 80) {
    status = "Budget Warning";
    color = "bg-yellow-500";
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">Monthly Budget</h2>

      <p>Budget : ₹ {budget}</p>

      <p>Spent : ₹ {spent}</p>

      <p>Remaining : ₹ {remaining}</p>

      <div className="mt-4 h-3 w-full rounded-full bg-gray-200">
        <div
         style={{ width: `${progressWidth}%` }}


          className={`h-3 rounded-full ${color}`}
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p>{percentage.toFixed(0)}%</p>

        <span className={`rounded px-2 py-1 text-xs text-white ${color}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

export default BudgetProgress;
