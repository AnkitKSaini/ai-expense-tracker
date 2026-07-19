import { motion } from "framer-motion";

import WhyChooseCard from "../WhyChoose/WhyChooseCard";
import { WHY_CHOOSE } from "../../../../constants/landing";
import SectionBackground from "../SectionBackground";

function WhyChoose() {
  return (
    <section className="relative overflow-hidden py-32">
        <SectionBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
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
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/70 px-5 py-2 text-sm font-semibold text-blue-600 shadow-lg backdrop-blur-xl dark:border-blue-800/40 dark:bg-gray-900/70 dark:text-blue-400">
            ✨ AI Expense Tracker
          </div>

          <h2 className="mt-8 text-4xl font-extrabold leading-tight md:text-6xl dark:text-white">
            Everything You Need To

            <span className="mt-2 block bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
              Manage Money Smarter
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            AI-powered expense tracking, intelligent budgeting,
            beautiful analytics, bill reminders, savings goals,
            and personalized financial insights —
            all in one modern platform.
          </p>
        </motion.div>

        {/* Cards */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            staggerChildren: 0.12,
          }}
          className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {WHY_CHOOSE.map((item) => (
            <WhyChooseCard
              key={item.title}
              {...item}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}

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
            duration: 0.7,
          }}
          className="mt-24 text-center"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join thousands of users managing their finances smarter with AI.
          </p>

          <button className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-xl transition duration-300 hover:scale-105 hover:shadow-2xl">
            Get Started Free
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChoose;