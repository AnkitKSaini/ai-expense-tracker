import { motion } from "framer-motion";

import SectionBackground from "../SectionBackground";
import TestimonialsMarquee from "./TestimonialsMarquee";

import { TESTIMONIALS, TRUST_BADGES } from "../../../../constants/landing";

function Testimonials() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Background */}

      <SectionBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-blue-200/60 bg-white/70 px-5 py-2 text-sm font-semibold text-blue-600 shadow-lg backdrop-blur-xl dark:border-blue-800/40 dark:bg-gray-900/70 dark:text-blue-400">
            ❤️ Trusted Worldwide
          </span>

          <h2 className="mt-8 text-4xl font-extrabold leading-tight md:text-6xl dark:text-white">
            Loved by
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
              Thousands of Users
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            Discover why thousands of users rely on AI Expense Tracker to manage
            budgets, track expenses and make smarter financial decisions every
            day.
          </p>
        </motion.div>

        {/* Stats */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 grid grid-cols-3 gap-8 rounded-[32px] border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/60"
        >
          <div className="text-center">
            <h3 className="text-4xl font-extrabold text-blue-600">10K+</h3>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Active Users
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-extrabold text-blue-600">4.9★</h3>

            <p className="mt-2 text-gray-500 dark:text-gray-400">User Rating</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-extrabold text-blue-600">99%</h3>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Satisfaction
            </p>
          </div>
        </motion.div>

        {/* Testimonials */}

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
        >
          <TestimonialsMarquee testimonials={TESTIMONIALS} />
        </motion.div>

        {/* Bottom Badges */}

        <div className="mt-20 flex flex-wrap justify-center gap-5">
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;

            return (
              <motion.div
                key={badge.title}
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                className="flex items-center gap-3 rounded-full border border-white/50 bg-white/70 px-6 py-3 shadow-lg backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/70"
              >
                <Icon size={20} className="text-blue-600" />

                <span className="font-semibold dark:text-white">
                  {badge.title}
                </span>
              </motion.div>
            );
          })}
        </div>

       {/* Bottom CTA */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="relative mt-28 overflow-hidden rounded-[36px] border border-blue-200/40 bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-8 py-16 text-center shadow-2xl dark:border-gray-800 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
>
  {/* Background Glow */}
  <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
  <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

  <div className="relative z-10">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow backdrop-blur dark:border-gray-700 dark:bg-gray-800/70 dark:text-cyan-300">
      🚀 Join 10,000+ Smart Users
    </div>

    {/* Heading */}
    <h3 className="mx-auto mt-8 max-w-3xl text-4xl font-extrabold leading-tight dark:text-white md:text-5xl">
      Start Managing Your{" "}
      <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
        Finances Smarter
      </span>
    </h3>

    {/* Description */}
    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
      Experience AI-powered budgeting, intelligent insights, beautiful
      analytics and effortless expense tracking — all in one place.
    </p>

    {/* Feature Pills */}
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {[
        "⚡ AI Powered",
        "🔒 Secure",
        "💳 No Credit Card",
        "🎉 Free Forever",
      ].map((item) => (
        <span
          key={item}
          className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        >
          {item}
        </span>
      ))}
    </div>

    {/* CTA */}
    <button className="group mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-cyan-500/30">
      Get Started Free
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </button>

    {/* Trust */}
    <div className="mt-8">
      <p className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</p>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Rated <span className="font-semibold">4.9/5</span> by{" "}
        <span className="font-semibold">10,000+</span> happy users worldwide.
      </p>
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
