import { motion } from "framer-motion";
import {
  BadgeCheck,
  Fingerprint,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

import SectionBackground from "../SectionBackground";
import SecurityCard from "./SecurityCard";
import { SECURITY_ITEMS } from "./security.data";

const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    label: "256-bit AES Encryption",
  },
  {
    icon: KeyRound,
    label: "JWT Authentication",
  },
  {
    icon: Fingerprint,
    label: "Biometric Ready",
  },
  {
    icon: BadgeCheck,
    label: "GDPR Compliant",
  },
];

const SECURITY_STATS = [
  {
    value: "99.99%",
    label: "System Uptime",
  },
  {
    value: "256-bit",
    label: "AES Encryption",
  },
  {
    value: "24/7",
    label: "Threat Monitoring",
  },
  {
    value: "10K+",
    label: "Protected Accounts",
  },
];

function SecuritySection() {
  return (
    <section
      id="security"
      className="relative overflow-hidden py-32"
    >
      <SectionBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Heading */}

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
              shadow-sm
              dark:border-cyan-500/20
              dark:bg-cyan-500/10
              dark:text-cyan-300
            "
          >
            <ShieldCheck size={16} />
            Security & Privacy
          </div>

          <h2 className="mt-8 text-4xl font-black tracking-tight text-slate-900 md:text-5xl xl:text-6xl dark:text-white">
            Your Financial Data
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
              Always Protected
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Enterprise-grade encryption, secure cloud infrastructure and
            modern authentication keep your financial information safe,
            private and always under your control.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3">
          {SECURITY_ITEMS.map((item, index) => (
            <SecurityCard
              key={item.title}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* Trust Heading */}

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
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">
            Trusted Security Standards
          </h3>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Built using enterprise-grade technologies trusted by modern
            financial platforms worldwide.
          </p>
        </motion.div>

        {/* Trust Badges */}

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
            mt-10
            grid
            grid-cols-2
            gap-4
            rounded-[30px]
            border
            border-white/60
            bg-white/70
            p-6
            shadow-[0_20px_60px_rgba(15,23,42,.08)]
            backdrop-blur-2xl
            md:grid-cols-4
            dark:border-slate-700/50
            dark:bg-slate-900/70
          "
        >
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                p-3
                transition-all
                duration-300
                hover:bg-slate-100
                dark:hover:bg-slate-800
              "
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
                  text-white
                  shadow-lg
                "
              >
                <Icon size={20} />
              </div>

              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Security Stats */}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {SECURITY_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{
                y: -5,
              }}
              className="
                rounded-3xl
                border
                border-white/60
                bg-white/70
                p-7
                text-center
                shadow-lg
                backdrop-blur-xl
                dark:border-slate-700/50
                dark:bg-slate-900/70
              "
            >
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                {stat.value}
              </div>

              <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SecuritySection;