import { Wallet, Globe, Mail, Heart } from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import FooterSection from "./FooterSection";
import FooterLink from "./FooterLink";
import ScrollTop from "./ScrollTop";

import { FOOTER } from "../../../constants/footer";

function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-gray-200 bg-white/90 backdrop-blur-xl shadow-[0_-10px_40px_rgba(59,130,246,0.08)] dark:border-gray-800 dark:bg-gray-950/90">
      {" "}
      {/* Gradient Top Border */}
      <div className="absolute left-0 top-0 h-2px w-full bg-linear-to-r from-blue-600 via-cyan-500 to-violet-600" />
      {/* Background Blur */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-20 top-10 h-56 w-56 rounded-full bg-blue-500 blur-[140px]" />

        <div className="absolute bottom-10 right-20 h-72 w-72 rounded-full bg-cyan-500 blur-[160px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 p-3 text-white shadow-lg">
                <Wallet size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold dark:text-white">
                  AI Expense Tracker
                </h2>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {FOOTER.version}
                </span>
              </div>
            </div>

            <p className="mt-6 max-w-sm leading-8 text-gray-600 dark:text-gray-400">
              Manage expenses, budgets, goals, investments and financial reports
              with an enterprise-grade AI-powered finance platform.
            </p>

            {/* Social Icons */}

            <div className="mt-8 flex gap-4">
              <a
                href={FOOTER.socials.github}
                target="_blank"
                rel="noreferrer"
                className="
rounded-xl
border
border-gray-200
bg-white
p-3
shadow-sm
transition-all
duration-300
hover:-translate-y-2
hover:rotate-6
hover:scale-110
hover:border-blue-500
hover:text-blue-600
hover:shadow-lg
hover:shadow-blue-500/20
dark:border-gray-700
dark:bg-gray-900
"
              >
                <FaGithub size={20} />
              </a>

              <a
                href={FOOTER.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="
rounded-xl
border
border-gray-200
bg-white
p-3
shadow-sm
transition-all
duration-300
hover:-translate-y-2
hover:rotate-6
hover:scale-110
hover:border-blue-500
hover:text-blue-600
hover:shadow-lg
hover:shadow-blue-500/20
dark:border-gray-700
dark:bg-gray-900
"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href={FOOTER.socials.portfolio}
                target="_blank"
                rel="noreferrer"
                className="
rounded-xl
border
border-gray-200
bg-white
p-3
shadow-sm
transition-all
duration-300
hover:-translate-y-2
hover:rotate-6
hover:scale-110
hover:border-blue-500
hover:text-blue-600
hover:shadow-lg
hover:shadow-blue-500/20
dark:border-gray-700
dark:bg-gray-900
"
              >
                <Globe size={20} />
              </a>

              <a
                href={FOOTER.socials.email}
                className="
rounded-xl
border
border-gray-200
bg-white
p-3
shadow-sm
transition-all
duration-300
hover:-translate-y-2
hover:rotate-6
hover:scale-110
hover:border-blue-500
hover:text-blue-600
hover:shadow-lg
hover:shadow-blue-500/20
dark:border-gray-700
dark:bg-gray-900
"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}

          <FooterSection title="Quick Links">
            <FooterLink to="/">Dashboard</FooterLink>
            <FooterLink to="/expenses">Expenses</FooterLink>
            <FooterLink to="/budget">Budget</FooterLink>
            <FooterLink to="/goals">Goals</FooterLink>
            <FooterLink to="/reports">Reports</FooterLink>
          </FooterSection>

          {/* Finance */}

          <FooterSection title="Finance">
            <FooterLink to="/investments">Investments</FooterLink>
            <FooterLink to="/bills">Bills</FooterLink>
            <FooterLink to="/recurring">Recurring</FooterLink>
            <FooterLink to="/notifications">Notifications</FooterLink>
            <FooterLink to="/backup">Backup</FooterLink>
          </FooterSection>

          {/* Resources */}

          <FooterSection title="Resources">
            <FooterLink to="/profile">Profile</FooterLink>
            <FooterLink to="/settings">Settings</FooterLink>
            <FooterLink to="/ai">AI Insights</FooterLink>
            <FooterLink to="/chat">AI Chat</FooterLink>
          </FooterSection>
        </div>

        {/* Tech Stack */}

        <div className="mt-16 border-t pt-8 dark:border-gray-800">
          <h3 className="mb-5 text-lg font-bold dark:text-white">Built With</h3>

          <div className="flex flex-wrap gap-3">
            {FOOTER.tech.map((item) => (
              <span
                key={item}
                className="
rounded-full
border
border-gray-300
bg-gray-100
px-4
py-2
text-sm
font-medium
transition-all
duration-300
hover:-translate-y-1
hover:border-blue-500
hover:bg-blue-600
hover:text-white
hover:shadow-lg
hover:shadow-blue-500/20
dark:border-gray-700
dark:bg-gray-900
dark:text-gray-300
dark:hover:bg-blue-600
"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}

        <div className="mt-10 border-t pt-5 dark:border-gray-800">
          <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} AI Expense Tracker. All rights
              reserved.
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              Made with
              <Heart size={16} className="fill-red-500 text-red-500" />
              using React + TypeScript
            </div>
          </div>
        </div>

        {/* Scroll To Top */}

        <ScrollTop />
      </div>
    </footer>
  );
}

export default Footer;
