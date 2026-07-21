import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { FAQS } from "../../../../constants/landing";

import SectionBackground from "../SectionBackground";

import { Link } from "react-router-dom";

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
  <section
    id="faq"
    className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-28 dark:from-slate-950 dark:via-gray-950 dark:to-slate-950"
  >
    {/* Shared Background */}
    <SectionBackground />

    {/* Background Glow */}
    <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px] dark:bg-cyan-500/10" />

    <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px] dark:bg-violet-500/10" />

    <div className="relative z-10 mx-auto max-w-5xl px-6">
      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="
inline-flex
items-center
justify-center
gap-2
rounded-full
border
border-blue-200
bg-blue-50
px-8
py-3
text-base
font-semibold
shadow-lg
backdrop-blur
dark:border-blue-800
dark:bg-blue-900/30
dark:text-blue-300
">
          <HelpCircle size={16} />
          Frequently Asked Questions
        </div>

        <h2 className="mt-8 text-4xl font-black tracking-tight text-slate-900 md:text-6xl dark:text-white">
          Got{" "}
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
            Questions?
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Everything you need to know about AI Expense Tracker,
          AI Insights, Security, Budgets and Analytics.
        </p>

        {/* Trust Pills */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          {[
            "10K+ Users",
            "99.9% Uptime",
            "24/7 Support",
            "Free Forever",
          ].map((item) => (

            <div
              key={item}
              className="rounded-full border border-slate-200 bg-white/80 px-5 py-2 text-sm font-medium shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
            >
              {item}
            </div>

          ))}

        </div>
      </motion.div>

      {/* FAQ */}

      <div className="mt-20 space-y-6">

        {FAQS.map((item, index) => (

          <motion.div
            key={item.question}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className={`group overflow-hidden rounded-[30px] border backdrop-blur-xl transition-all duration-500

            ${
              open === index
                ? "border-cyan-400 bg-white/90 shadow-[0_20px_60px_rgba(6,182,212,0.15)] dark:border-cyan-500 dark:bg-slate-900/80"
                : "border-slate-200 bg-white/70 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/60"
            }`}
          >
            <button
              onClick={() =>
                setOpen(
                  open === index
                    ? null
                    : index
                )
              }
              className="flex w-full items-center justify-between px-8 py-7 text-left"
            >
              <div className="flex items-center gap-5">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">

                  <MessageCircle size={22} />

                </div>

                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">

                  {item.question}

                </span>

              </div>

              <ChevronDown
                className={`transition-all duration-500 group-hover:text-cyan-500

                ${
                  open === index
                    ? "rotate-180 text-cyan-500"
                    : "text-slate-500"
                }`}
              />
            </button>

            <AnimatePresence>

              {open === index && (

                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-slate-100 px-8 py-6 text-[16px] leading-8 text-slate-600 dark:border-slate-800 dark:text-slate-300">

                    {item.answer}

                  </p>
                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

        ))}

      </div>

             {/* Bottom Support Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-24 overflow-hidden rounded-[40px] border border-cyan-200/50 bg-gradient-to-br from-white via-cyan-50 to-blue-50 p-12 shadow-[0_20px_80px_rgba(6,182,212,0.12)] dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
      >
        {/* Background Glow */}
        <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />

        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/10" />

        <div className="relative z-10 text-center">

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-5 py-2 text-sm font-semibold text-cyan-700 shadow-sm backdrop-blur dark:border-cyan-900 dark:bg-cyan-900/20 dark:text-cyan-300">
            💬 Support Team Online
          </div>

          {/* Heading */}

          <h3 className="mt-8 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Still Have{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
              Questions?
            </span>
          </h3>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Our support team is always ready to help you with setup,
            budgeting, AI insights, exports and everything you need
            to get started.
          </p>

          {/* Stats */}

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            {[
              "⚡ Fast Response",
              "📧 Email Support",
              "🛡 Secure Platform",
              "❤️ Friendly Team",
            ].map((item) => (

              <div
                key={item}
                className="rounded-full border border-slate-200 bg-white/80 px-5 py-2 text-sm font-medium shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
              >
                {item}
              </div>

            ))}

          </div>

          {/* CTA */}

          <Link
  to="/contact"
            className="
            group
            mt-10
            inline-flex
            items-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            via-cyan-500
            to-violet-500
            px-8
            py-4
            font-semibold
            text-white
            shadow-xl
            shadow-cyan-500/20
            transition-all
            duration-300
            hover:-translate-y-1
            hover:scale-105
            hover:shadow-cyan-500/40
            "
          >
            Contact Support

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          {/* Trust */}

          <div className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800">

            <div className="text-xl">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Trusted by{" "}
              <span className="font-semibold text-slate-800 dark:text-white">
                10,000+
              </span>{" "}
              users across the world with an average rating of{" "}
              <span className="font-semibold text-slate-800 dark:text-white">
                4.9/5
              </span>
            </p>

          </div>

        </div>

      </motion.div>

    </div>

  </section>
);

}

export default FAQ;