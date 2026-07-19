import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import SectionBackground from "../SectionBackground";
import StatCard from "./StatCard";
import { STATS } from "./statistics.data";

function Statistics() {
  return (
    <section
      id="statistics"
      className="
        relative
        overflow-hidden
        py-28
        bg-gradient-to-b
        from-white
        via-slate-50
        to-white
        dark:from-slate-950
        dark:via-slate-950
        dark:to-black
      "
    >
      <SectionBackground />

      {/* Background Glow */}

      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-400/15 blur-[120px] dark:bg-cyan-500/10" />

      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-violet-500/15 blur-[120px] dark:bg-violet-500/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-200
              bg-white/80
              px-5
              py-2
              text-sm
              font-semibold
              text-cyan-700
              shadow-sm
              backdrop-blur
              dark:border-cyan-900/40
              dark:bg-cyan-900/20
              dark:text-cyan-300
            "
          >
            <Sparkles size={16} />
            Trusted Worldwide
          </div>

          <h2 className="mt-8 text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-white">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
              Thousands
            </span>{" "}
            of Users
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            Helping people track expenses, manage budgets and make
            smarter financial decisions with AI-powered insights.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

          {STATS.map((stat, index) => (

            <StatCard
              key={stat.label}
              {...stat}
              delay={index * 0.12}
            />

          ))}

        </div>

      </div>

    </section>
  );
}

export default Statistics;