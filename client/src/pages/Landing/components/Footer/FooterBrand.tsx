import { Wallet, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import FooterSocial from "./FooterSocial";
import { TRUST_BADGES } from "./footer.data";

function FooterBrand() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      {/* Logo */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 via-cyan-500 to-violet-500 text-white shadow-xl">

          <Wallet size={26} />

        </div>

        <div>

          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            AI Expense Tracker
          </h2>

          <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300">

            <Sparkles size={12} />

            Smart Finance Platform

          </div>

        </div>

      </div>

      {/* Description */}
      <p className="mt-8 max-w-md text-[15px] leading-8 text-slate-600 dark:text-slate-400">
        Manage expenses, budgets and AI-powered financial insights
        through a secure, fast and beautifully designed finance
        platform built for modern users.
      </p>

      {/* Rating */}

      <div className="mt-6 flex items-center gap-3">

        <span className="text-lg">
          ⭐⭐⭐⭐⭐
        </span>

        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Rated 4.9/5 by 10K+ users
        </span>

      </div>

      {/* Trust Badges */}

      <div className="mt-6 flex flex-wrap gap-3">

        {TRUST_BADGES.map((badge) => (

          <span
            key={badge}
            className="
              rounded-full
              border
              border-slate-200
              bg-white/80
              px-4
              py-2
              text-xs
              font-semibold
              text-slate-700
              shadow-sm
              backdrop-blur
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-cyan-300
              hover:shadow-lg
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
            "
          >
            {badge}
          </span>

        ))}

      </div>

      {/* Social */}

      <div className="mt-6">
        <FooterSocial />
      </div>

    </motion.div>
  );
}

export default FooterBrand;