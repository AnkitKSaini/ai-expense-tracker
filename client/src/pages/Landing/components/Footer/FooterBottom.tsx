import { motion } from "framer-motion";

const LEGAL_LINKS = [
  "Privacy",
  "Terms",
  "Cookies",
  "Security",
];

function FooterBottom() {
  return (
    <>
      {/* Divider */}

      <div className="my-12 h-px bg-linear-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Bottom */}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="space-y-3">

          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              AI Expense Tracker
            </span>
            . All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">

            {LEGAL_LINKS.map((item) => (

              <button
                key={item}
                className="
                  text-sm
                  text-slate-500
                  transition-colors
                  hover:text-cyan-600
                  dark:text-slate-500
                  dark:hover:text-cyan-400
                "
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col items-start gap-4 lg:items-end">

          <p className="text-sm text-slate-500 dark:text-slate-500">
            Made with ❤️ using{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              React
            </span>
            ,{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              TypeScript
            </span>{" "}
            &{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Tailwind CSS
            </span>
          </p>

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-200
              bg-emerald-50
              px-4
              py-2
              text-xs
              font-semibold
              text-emerald-700
              dark:border-emerald-900/40
              dark:bg-emerald-900/10
              dark:text-emerald-400
            "
          >
            <motion.span
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="h-2.5 w-2.5 rounded-full bg-emerald-500"
            />

            All Systems Operational

          </div>

        </div>

      </div>
    </>
  );
}

export default FooterBottom;