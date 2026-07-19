import {
  ShoppingBag,
  Coffee,
  Car,
} from "lucide-react";

const items = [
  {
    title: "Shopping",
    amount: "-₹2,350",
    icon: ShoppingBag,
  },
  {
    title: "Coffee",
    amount: "-₹280",
    icon: Coffee,
  },
  {
    title: "Fuel",
    amount: "-₹1,200",
    icon: Car,
  },
];

function MiniTransactions() {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-5 font-semibold dark:text-white">
        Recent Transactions
      </h3>

      <div className="space-y-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-2 dark:bg-blue-900/30">
                  <Icon
                    size={18}
                    className="text-blue-600"
                  />
                </div>

                <span className="text-sm dark:text-white">
                  {item.title}
                </span>
              </div>

              <span className="font-semibold text-red-500">
                {item.amount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MiniTransactions;