import { useState } from "react";
import { motion } from "framer-motion";

import MiniBalanceCard from "./MiniBalanceCard";
import MiniIncomeChart from "./MiniIncomeChart";
import MiniExpenseChart from "./MiniExpenseChart";
import MiniTransactions from "./MiniTransactions";
import MiniAIInsight from "./MiniAIInsight";

function HeroDashboard() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{
        y: -8,
        scale: 1.01,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setMouse({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/70 p-6 shadow-[0_35px_90px_rgba(37,99,235,0.18)] backdrop-blur-2xl dark:border-gray-700 dark:bg-gray-900/70">
        {/* Mouse Glow */}
       <div
  className="pointer-events-none absolute h-56 w-56 rounded-full bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-violet-500/15 blur-[120px]"
  style={{
    left: mouse.x - 100,
    top: mouse.y - 100,
  }}
/>

        {/* Premium Badge */}
        <div className="absolute right-6 top-6 z-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold tracking-wide text-white shadow-lg">
          LIVE DEMO
        </div>

        {/* Dashboard Content */}
        <div className="relative z-10 grid gap-5 lg:grid-cols-2">
          <MiniBalanceCard />

          <MiniIncomeChart />

          <MiniExpenseChart />

          <MiniTransactions />
        </div>

        <div className="relative z-10 mt-5">
          <MiniAIInsight />
        </div>
      </div>
    </motion.div>
  );
}

export default HeroDashboard;