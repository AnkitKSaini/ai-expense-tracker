import {
  Receipt,
  Wallet,
  Target,
  Landmark,
} from "lucide-react";

interface Props {
  report: any;
}

function ReportOverview({
  report,
}: Props) {
  const cards = [
    {
      title: "Expenses",
      value: `₹${report.totalExpense ?? 0}`,
      icon: Receipt,
      color:
        "from-red-500 to-orange-500",
    },
    {
      title: "Budget",
      value: `₹${report.totalBudget ?? 0}`,
      icon: Wallet,
      color:
        "from-blue-500 to-cyan-500",
    },
    {
      title: "Goals",
      value:
        report.totalGoals ?? 0,
      icon: Target,
      color:
        "from-green-500 to-emerald-500",
    },
    {
      title: "Investments",
      value: `₹${report.totalInvestment ?? 0}`,
      icon: Landmark,
      color:
        "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
          >
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r ${card.color} text-white`}
            >
              <Icon size={28} />
            </div>

            <p className="text-sm text-gray-500">
              {card.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold dark:text-white">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default ReportOverview;