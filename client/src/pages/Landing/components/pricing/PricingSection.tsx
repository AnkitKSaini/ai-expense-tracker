import { motion } from "framer-motion";
import { useState } from "react";
import { BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";

import SectionBackground from "../SectionBackground";
import PricingCard from "./PricingCard";
import { PRICING_PLANS } from "./pricing.data";

function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="relative overflow-hidden py-32">
      <SectionBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}

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
              bg-cyan-50
              px-5
              py-2
              text-sm
              font-semibold
              text-cyan-700
              dark:border-cyan-500/20
              dark:bg-cyan-500/10
              dark:text-cyan-300
            "
          >
            <Sparkles size={16} />
            Pricing
          </div>

          <h2 className="mt-8 text-4xl font-black tracking-tight text-slate-900 md:text-5xl xl:text-6xl dark:text-white">
            Simple Pricing,
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Choose the perfect plan for your financial journey. Upgrade anytime
            as your needs grow.
          </p>
        </motion.div>

        {/* Billing Toggle */}

        <div className="mt-12 flex justify-center">
          <div
            className="
              inline-flex
              rounded-full
              border
              border-white/60
              bg-white/70
              p-2
              shadow-lg
              backdrop-blur-xl
              dark:border-slate-700
              dark:bg-slate-900/70
            "
          >
            <button
              onClick={() => setBilling("monthly")}
              className={`
    rounded-full
    px-6
    py-3
    font-semibold
    transition-all
    duration-300

    ${
      billing === "monthly"
        ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 text-white shadow-lg"
        : "text-slate-600 hover:text-blue-600 dark:text-slate-300"
    }
  `}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`
    relative
    rounded-full
    px-6
    py-3
    font-semibold
    transition-all
    duration-300

    ${
      billing === "yearly"
        ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 text-white shadow-lg"
        : "text-slate-600 hover:text-blue-600 dark:text-slate-300"
    }
  `}
            >
              Yearly
              <span
                className="
      absolute
      -right-3
      -top-2
      rounded-full
      bg-emerald-500
      px-2
      py-0.5
      text-[10px]
      font-bold
      text-white
    "
              >
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              billing={billing}
            />
          ))}
        </div>

        {/* Guarantee */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.2,
          }}
          className="
            mt-20
            rounded-[30px]
            border
            border-white/60
            bg-white/70
            p-8
            shadow-lg
            backdrop-blur-xl
            dark:border-slate-700
            dark:bg-slate-900/70
          "
        >
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-600
                  via-cyan-500
                  to-violet-500
                  text-white
                "
              >
                <ShieldCheck size={24} />
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  30-Day Guarantee
                </h4>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Risk-free upgrade.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-600
                  via-cyan-500
                  to-violet-500
                  text-white
                "
              >
                <BadgeCheck size={24} />
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  Cancel Anytime
                </h4>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  No hidden fees.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-600
                  via-cyan-500
                  to-violet-500
                  text-white
                "
              >
                <Sparkles size={24} />
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  Trusted Worldwide
                </h4>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Used by 50,000+ users.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;
