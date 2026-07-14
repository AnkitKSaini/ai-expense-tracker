import { TrendingUp, Clock3, CheckCircle2, AlertTriangle } from "lucide-react";

import type { Bill } from "../../types/bill";

interface Props {
  bills: Bill[];
}

function BillAnalytics({ bills }: Props) {
  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);

  const paidAmount = bills
    .filter((bill) => bill.status === "Paid")
    .reduce((sum, bill) => sum + bill.amount, 0);

  const pendingAmount = bills
    .filter((bill) => bill.status === "Pending")
    .reduce((sum, bill) => sum + bill.amount, 0);

  const overdue = bills.filter(
    (bill) => bill.status === "Pending" && new Date(bill.dueDate) < new Date(),
  ).length;

  const dueToday = bills.filter((bill) => {
    if (bill.status !== "Pending") return false;

    const due = new Date(bill.dueDate);

    due.setHours(0, 0, 0, 0);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return due.getTime() === today.getTime();
  }).length;

  const cards = [
    {
      title: "Total Bills",
      value: `₹${totalAmount.toLocaleString("en-IN")}`,
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Paid",
      value: `₹${paidAmount.toLocaleString("en-IN")}`,
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Pending",
      value: `₹${pendingAmount.toLocaleString("en-IN")}`,
      icon: Clock3,
      color: "from-orange-500 to-yellow-500",
    },
    {
      title: "Overdue",
      value: overdue,
      icon: AlertTriangle,
      color: "from-red-500 to-rose-500",
    },
    {
      title: "Due Today",
      value: dueToday,
      icon: Clock3,
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
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

            <p className="text-sm text-gray-500">{card.title}</p>

            <h2 className="mt-2 text-3xl font-bold dark:text-white">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default BillAnalytics;
