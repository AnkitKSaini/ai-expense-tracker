import {
  PiggyBank,
  ShoppingCart,
  TrendingUp,
  Wallet,
  Landmark,
  AlertTriangle,
} from "lucide-react";

const questions = [
  {
    icon: PiggyBank,
    title: "Save More",
    question: "How can I save more money?",
  },
  {
    icon: ShoppingCart,
    title: "Overspending",
    question: "Where am I overspending?",
  },
  {
    icon: Wallet,
    title: "Buy Laptop",
    question: "Can I buy a laptop next month?",
  },
  {
    icon: TrendingUp,
    title: "Forecast",
    question: "What is my financial forecast?",
  },
  {
    icon: Landmark,
    title: "Investment",
    question: "Should I start investing?",
  },
  {
    icon: AlertTriangle,
    title: "Risk",
    question: "Is my financial risk high?",
  },
];

interface Props {
  onSelect: (question: string) => void;
}

function SuggestedQuestions({ onSelect }: Props) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        💡 Suggested Questions
      </h3>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {questions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => onSelect(item.question)}
              className="rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Icon size={20} />
              </div>

              <h4 className="font-semibold dark:text-white">
                {item.title}
              </h4>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {item.question}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SuggestedQuestions;