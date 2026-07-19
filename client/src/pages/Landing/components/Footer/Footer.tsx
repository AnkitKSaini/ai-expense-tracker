import { motion } from "framer-motion";

import SectionBackground from "../SectionBackground";

import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";
import FooterBottom from "./FooterBottom";

function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-slate-200
        bg-linear-to-b
        from-white
        via-slate-50
        to-white
        dark:border-slate-800
        dark:from-slate-950
        dark:via-slate-950
        dark:to-black
      "
    >
      <SectionBackground />

      {/* Background Glow */}

      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-[120px] md:h-96 md:w-96 dark:bg-cyan-500/10" />

      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px] md:h-96 md:w-96 dark:bg-violet-500/10" />

      {/* Main Footer */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">

        {/* Top Grid */}

        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">

          {/* Brand */}

          <FooterBrand />

          {/* Links */}

          <FooterLinks />

        </div>

        {/* Newsletter */}

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
            delay: 0.2,
          }}
          className="mt-16"
        >
          <FooterNewsletter />
        </motion.div>

        {/* Bottom */}

        <FooterBottom />

      </div>

    </footer>
  );
}

export default Footer;