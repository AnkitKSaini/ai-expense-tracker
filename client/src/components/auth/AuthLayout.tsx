import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Wallet } from "lucide-react";
import type { ReactNode } from "react";

import AuthBackground from "./AuthBackground";
import AuthCard from "./AuthCard";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">

      <AuthBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12">

        {/* Left Panel */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="hidden flex-1 lg:block"
        >
          <div className="max-w-xl">

            <div className="inline-flex items-center gap-3 rounded-full border border-blue-200 bg-blue-50 px-5 py-3 dark:border-blue-800 dark:bg-blue-900/20">

              <Wallet className="text-blue-600" size={22} />

              <span className="font-semibold">
                AI Expense Tracker
              </span>

            </div>

            <h1 className="mt-10 text-6xl font-black leading-tight text-slate-900 dark:text-white">

              Manage Money

              <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent">

                Smarter with AI

              </span>

            </h1>

            <p className="mt-8 text-lg leading-8 text-slate-600 dark:text-slate-400">

              Secure authentication with a premium experience.
              Track expenses, budgets and AI insights in one place.

            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-3">

                <ShieldCheck className="text-emerald-500" />

                <span>Bank-level security</span>

              </div>

              <div className="flex items-center gap-3">

                <Sparkles className="text-cyan-500" />

                <span>AI-powered financial insights</span>

              </div>

            </div>

          </div>
        </motion.div>

        {/* Right Panel */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="flex flex-1 justify-center"
        >
          <AuthCard>

            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              {title}
            </h2>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>

            <div className="mt-8">
              {children}
            </div>

          </AuthCard>
        </motion.div>

      </div>
    </main>
  );
}

export default AuthLayout;