import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

function FooterNewsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        rounded-32px
        border
        border-slate-200
        bg-white/80
        p-8
        shadow-xl
        backdrop-blur-xl
        dark:border-slate-800
        dark:bg-slate-900/70
      "
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div className="max-w-xl">

          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300">
            <Mail size={16} />
            Weekly Newsletter
          </div>

          <h3 className="mt-5 text-3xl font-black text-slate-900 dark:text-white">
            Stay Updated
          </h3>

          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
            Get product updates, AI finance tips and exclusive feature releases directly in your inbox.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg space-y-4"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              bg-white
              px-5
              py-4
              outline-none
              transition-all
              focus:border-cyan-500
              focus:ring-4
              focus:ring-cyan-200
              dark:border-slate-700
              dark:bg-slate-950
              dark:text-white
            "
          />

          <button
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-linear-to-r
              from-blue-600
              via-cyan-500
              to-violet-500
              py-4
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            Subscribe

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />

          </button>

          <div className="flex flex-wrap gap-2 text-xs text-slate-500">

            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
              No Spam
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
              Unsubscribe Anytime
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
              100% Privacy
            </span>

          </div>

        </form>

      </div>

    </motion.div>
  );
}

export default FooterNewsletter;