import {
  Brain,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

interface Props {
  budget: number;
  spent: number;
}

function BudgetTipsCard({
  budget,
  spent,
}: Props) {
  const remaining = budget - spent;

  const usage =
    budget > 0 ? (spent / budget) * 100 : 0;

  let title = "Excellent Budget Management";
  let color =
    "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20";

  let tips = [
    "Continue tracking your daily expenses.",
    "Consider investing part of your monthly savings.",
    "Maintain an emergency fund.",
  ];

  if (usage >= 90) {
    title = "Critical Budget Alert";

    color =
      "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20";

    tips = [
      "Avoid non-essential purchases this month.",
      "Review your highest spending category.",
      "Try increasing your monthly income.",
    ];
  } else if (usage >= 70) {
    title = "Budget Warning";

    color =
      "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20";

    tips = [
      "Reduce discretionary spending.",
      "Track every expense for the remaining month.",
      "Set a weekly spending limit.",
    ];
  }

  return (
    <div
      className={`rounded-3xl border p-8 shadow-lg ${color}`}
    >
      <div className="mb-6 flex items-center gap-3">
        <Brain
          className="text-blue-600"
          size={34}
        />

        <div>
          <h2 className="text-2xl font-bold dark:text-white">
            AI Budget Assistant
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Personalized Budget Recommendations
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 dark:bg-gray-900">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle
            size={18}
            className="text-orange-500"
          />

          <h3 className="font-semibold dark:text-white">
            {title}
          </h3>
        </div>

        <div className="space-y-3">
          {tips.map((tip) => (
            <div
              key={tip}
              className="flex items-start gap-3"
            >
              <Lightbulb
                size={18}
                className="mt-1 text-yellow-500"
              />

              <p className="text-gray-700 dark:text-gray-300">
                {tip}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/30">
          <div className="flex items-center gap-2">
            <TrendingUp
              size={18}
              className="text-blue-600"
            />

            <p className="font-medium dark:text-white">
              Remaining Budget
            </p>
          </div>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            ₹{remaining.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BudgetTipsCard;