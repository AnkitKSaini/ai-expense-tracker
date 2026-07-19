import { motion } from "framer-motion";

import { SOCIALS } from "./footer.data";

function FooterSocial() {
  return (
    <div className="flex items-center gap-3">
      {SOCIALS.map((item) => {
        const Icon = item.icon;

        return (
          <motion.a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              y: -5,
              scale: 1.08,
              rotate: 6,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200
              bg-white/80
              text-slate-600
              shadow-sm
              backdrop-blur
              transition-all
              duration-300
              hover:border-cyan-400
              hover:text-cyan-600
              hover:shadow-xl
              dark:border-slate-700
              dark:bg-slate-900/70
              dark:text-slate-300
              dark:hover:border-cyan-500
              dark:hover:text-cyan-400
            "
            aria-label={item.name}
          >
            <Icon size={20} />
          </motion.a>
        );
      })}
    </div>
  );
}

export default FooterSocial;