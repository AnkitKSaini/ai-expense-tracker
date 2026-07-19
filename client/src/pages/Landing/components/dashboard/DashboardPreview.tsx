import { motion } from "framer-motion";

import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

import DashboardCards from "./cards/DashboardCards";
import BudgetProgress from "./cards/BudgetProgress";
import AIInsightCard from "./cards/AIInsightCard";

import ExpenseChart from "./charts/ExpenseChart";
import ExpensePieChart from "./charts/ExpensePieChart";

function DashboardPreview() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        relative
        isolate
        overflow-hidden
        rounded-[36px]
        border
        border-white/40
        bg-gradient-to-br
        from-white
        via-slate-50
        to-blue-50
        shadow-[0_40px_120px_rgba(15,23,42,0.18)]
        backdrop-blur-2xl
        dark:border-slate-700/50
        dark:from-slate-950
        dark:via-slate-900
        dark:to-slate-950
      "
    >
      {/* Ambient Glow */}

      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[140px]" />

      <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-[120px]" />

      <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]" />

      <div className="relative flex min-h-[760px]">

        <DashboardSidebar />

        <div className="flex flex-1 flex-col">

          <DashboardHeader />

          <main className="flex-1 space-y-8 p-8 xl:p-10">

            {/* Top Statistics */}

            <DashboardCards />

            {/* Analytics */}

            <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">

              <ExpenseChart />

              <ExpensePieChart />

            </section>

            {/* AI + Budget */}

            <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">

              <AIInsightCard />

              <BudgetProgress />

            </section>

          </main>

        </div>

      </div>
    </motion.div>
  );
}

export default DashboardPreview;