import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import SectionBackground from "../SectionBackground";
import DashboardPreview from "./DashboardPreview";

function DashboardShowcase() {
  return (
    <section
      className="
        relative
        overflow-hidden
        py-32
      "
    >
      <SectionBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold">
            <Sparkles size={16} />
            Product Preview
          </div>

          <h2 className="mt-8 text-5xl font-black">
            Experience the Dashboard
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
            Manage expenses, budgets, analytics and AI insights
            from one beautiful workspace.
          </p>

          <button
            className="
              mt-10
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              via-cyan-500
              to-violet-500
              px-7
              py-4
              font-semibold
              text-white
            "
          >
            Explore Dashboard

            <ArrowRight size={18} />
          </button>

        </motion.div>

        <div className="mt-20">

          <DashboardPreview />

        </div>

      </div>

    </section>
  );
}

export default DashboardShowcase;