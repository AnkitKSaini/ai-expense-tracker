import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Reports",
    href: "#reports",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky
        top-0
        z-50
        transition-all
        duration-300
        ${
          scrolled
            ? "border-b border-slate-200/80 bg-white/95 shadow-[0_10px_40px_rgba(15,23,42,.08)] backdrop-blur-3xl dark:border-slate-800 dark:bg-slate-950/95"
            : "border-b border-transparent bg-white/80 backdrop-blur-2xl dark:bg-slate-950/80"
        }
      `}
    >
      <div className="flex h-[82px] w-full items-center justify-between px-8 lg:px-16">
        {/* Logo */}

        <Link to="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.06,
            }}
            transition={{
              duration: 0.25,
            }}
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
              shadow-lg
            "
          >
            <Wallet size={28} />
          </motion.div>

          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              AI Expense Tracker
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Smart Personal Finance
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="
                group
                relative
                font-medium
                text-slate-600
                transition-colors
                duration-300
                hover:text-cyan-600
                dark:text-slate-300
                dark:hover:text-cyan-400
              "
            >
              {item.label}

              <span
                className="
                  absolute
                  -bottom-2
                  left-0
                  h-0.5
                  w-0
                  rounded-full
                  bg-cyan-500
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </a>
          ))}
        </nav>

        {/* Buttons */}

        <div className="flex items-center gap-3">
         <motion.div
  whileHover={{
    y: -2,
  }}
  whileTap={{
    scale: 0.96,
  }}
>
  <Link
    to="/login"
    className="
      inline-flex
      items-center
      justify-center
      rounded-2xl
      bg-gradient-to-r
      from-blue-600
      via-cyan-500
      to-violet-500
      px-5
      py-3
      font-semibold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:shadow-[0_12px_35px_rgba(6,182,212,.35)]
      hover:-translate-y-0.5
      active:scale-95
    "
  >
    Login
  </Link>
</motion.div>

          <motion.div
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            <Link
              to="/register"
              className="
    inline-flex
    items-center
    gap-2
    rounded-2xl
    bg-gradient-to-r
    from-blue-600
    via-cyan-500
    to-violet-500
    px-6
    py-3
    font-semibold
    text-white
    shadow-lg
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:shadow-[0_12px_35px_rgba(6,182,212,.35)]
  "
            >
              Sign Up
              
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;
