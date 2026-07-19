import { motion } from "framer-motion";
import {
  Bell,
  CalendarDays,
  Search,
} from "lucide-react";

function DashboardHeader() {
  return (
    <header
      className="
        sticky
        top-0
        z-20
        flex
        items-center
        justify-between
        border-b
        border-white/40
        bg-white/70
        px-8
        py-5
        backdrop-blur-2xl
        dark:border-slate-700/50
        dark:bg-slate-900/70
      "
    >
      {/* Left */}

      <div>

        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Welcome back 👋
        </h2>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">

          <CalendarDays size={15} />

          <span>
            Today • Manage your finances smarter
          </span>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div
          className="
            hidden
            items-center
            gap-3
            rounded-2xl
            border
            border-white/50
            bg-white/80
            px-4
            py-3
            shadow-sm
            backdrop-blur-xl
            transition-all
            hover:border-cyan-300
            hover:shadow-lg
            md:flex
            dark:border-slate-700
            dark:bg-slate-900/80
          "
        >
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search expenses..."
            className="
              w-72
              bg-transparent
              text-sm
              outline-none
              placeholder:text-slate-400
            "
          />

          <kbd
            className="
              rounded-lg
              border
              border-slate-200
              bg-slate-100
              px-2
              py-1
              text-xs
              font-medium
              text-slate-500
              dark:border-slate-700
              dark:bg-slate-800
            "
          >
            ⌘ K
          </kbd>

        </div>

        {/* Notification */}

        <motion.button
          whileHover={{
            scale: 1.08,
            rotate: 6,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-white/40
            bg-white/80
            shadow-sm
            backdrop-blur-xl
            transition-all
            hover:border-cyan-300
            hover:shadow-lg
            dark:border-slate-700
            dark:bg-slate-900/80
          "
        >
          <Bell size={20} />

          <span
            className="
              absolute
              right-3
              top-3
              h-2.5
              w-2.5
              rounded-full
              bg-rose-500
              ring-2
              ring-white
              dark:ring-slate-900
            "
          />
        </motion.button>

        {/* Avatar */}

        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          className="relative"
        >
          <div
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
              text-lg
              font-bold
              text-white
              shadow-lg
            "
          >
            A
          </div>

          {/* Online Status */}

          <span
            className="
              absolute
              -bottom-1
              -right-1
              h-4
              w-4
              rounded-full
              border-2
              border-white
              bg-emerald-500
              dark:border-slate-900
            "
          />
        </motion.div>

      </div>

    </header>
  );
}

export default DashboardHeader;