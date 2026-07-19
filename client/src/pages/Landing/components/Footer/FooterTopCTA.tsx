import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function FooterTopCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-[36px] border border-cyan-200/50 bg-linear-to-br from-blue-50 via-white to-cyan-50 p-10 shadow-[0_20px_80px_rgba(6,182,212,0.12)] dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
    >
      {/* Glow */}
      <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />

      <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/10" />

      <div className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm backdrop-blur dark:border-cyan-900 dark:bg-cyan-900/20 dark:text-cyan-300">
          <Sparkles size={15} />
          Trusted by 10,000+ Users
        </div>

        <h2 className="mt-8 text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-white">
          Ready to Take Control of{" "}
          <span className="bg-linear-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
            Your Finances?
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Join thousands of users who already manage expenses,
          budgets and AI-powered financial insights with confidence.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="group inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 via-cyan-500 to-violet-500 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
            Get Started Free

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          <button className="rounded-2xl border border-slate-300 bg-white/80 px-8 py-4 font-semibold text-slate-700 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default FooterTopCTA;