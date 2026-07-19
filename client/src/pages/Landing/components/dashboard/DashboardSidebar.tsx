import { motion } from "framer-motion";
import {
  Sparkles,
  Wallet,
} from "lucide-react";

import { DASHBOARD_NAV_ITEMS } from "./dashboard.data";

function DashboardSidebar() {
  return (
    <aside
      className="
        relative
        flex
        h-full
        w-64
        flex-col
        overflow-hidden
        border-r
        border-white/40
        bg-white/70
        p-6
        backdrop-blur-2xl
        dark:border-slate-700/50
        dark:bg-slate-900/70
      "
    >
      {/* Ambient Glow */}

      <div className="absolute -left-16 top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-[90px]" />

      {/* Logo */}

      <div className="relative flex items-center gap-3">

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.08,
          }}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-blue-600
            via-cyan-500
            to-violet-500
            text-white
            shadow-lg
          "
        >
          <Wallet size={24} />
        </motion.div>

        <div>

          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Expense AI
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Smart Finance Platform
          </p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="relative mt-10 flex flex-col gap-2">

        {DASHBOARD_NAV_ITEMS.map(({ icon: Icon, label, active }) => (

          <motion.button
            key={label}
            whileHover={{
              x: 6,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className={`
              group
              relative
              flex
              items-center
              gap-3
              overflow-hidden
              rounded-2xl
              px-4
              py-3.5
              text-sm
              font-medium
              transition-all
              duration-300

              ${
                active
                  ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/80"
              }
            `}
          >
            {active && (
              <motion.div
                layoutId="sidebar-indicator"
                className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white"
              />
            )}

            <Icon
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            <span>{label}</span>

          </motion.button>

        ))}

      </nav>

      {/* AI Card */}

      <motion.div
        whileHover={{
          y: -4,
        }}
        className="
          relative
          mt-auto
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          from-blue-600
          via-cyan-500
          to-violet-500
          p-5
          text-white
          shadow-2xl
        "
      >
        {/* Glow */}

        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">

            <Sparkles size={14} />

            AI Assistant

          </div>

          <h4 className="mt-4 text-xl font-black">
            Financial Health
          </h4>

          <p className="mt-3 text-sm leading-6 text-white/90">
            Your spending is healthier than last month. Keep saving at this pace
            to achieve your monthly goal.
          </p>

          <div className="mt-5 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <span className="relative flex h-2.5 w-2.5">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />

              </span>

              <span className="text-xs font-medium">
                AI Online
              </span>

            </div>

            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              +18%
            </span>

          </div>

        </div>

      </motion.div>

    </aside>
  );
}

export default DashboardSidebar;