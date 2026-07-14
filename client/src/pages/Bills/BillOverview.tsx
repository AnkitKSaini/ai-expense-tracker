import {
  Receipt,
  CheckCircle2,
  Clock3,
  Wallet,
} from "lucide-react";

import type { Bill } from "../../types/bill";

interface Props {
  bills: Bill[];
}

function BillOverview({
  bills,
}: Props) {
  const paid =
    bills.filter(
      (b) =>
        b.status === "Paid",
    ).length;

  const pending =
    bills.filter(
      (b) =>
        b.status ===
        "Pending",
    ).length;

  const total = bills.reduce(
    (sum, b) =>
      sum + b.amount,
    0,
  );

  const cards = [
    {
      title: "Bills",
      value: bills.length,
      icon: Receipt,
      color:
        "from-blue-500 to-cyan-500",
    },
    {
      title: "Paid",
      value: paid,
      icon: CheckCircle2,
      color:
        "from-green-500 to-emerald-500",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      color:
        "from-orange-500 to-red-500",
    },
    {
      title: "Total",
      value: `₹${total.toLocaleString(
        "en-IN",
      )}`,
      icon: Wallet,
      color:
        "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon =
          card.icon;

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

export default BillOverview;