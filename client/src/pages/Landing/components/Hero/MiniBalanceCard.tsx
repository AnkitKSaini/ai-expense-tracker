import { Wallet } from "lucide-react";
import { motion } from "framer-motion";

function MiniBalanceCard() {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="rounded-2xl border bg-white p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
          <Wallet
            size={22}
            className="text-blue-600"
          />
        </div>

        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
          Live
        </span>
      </div>

      <h2 className="mt-5 text-3xl font-bold dark:text-white">
        ₹1,25,000
      </h2>

      <p className="mt-2 text-gray-500">
        Total Balance
      </p>
    </motion.div>
  );
}

export default MiniBalanceCard;