import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import HeroDashboard from "./HeroDashboard";
import TrustedCompanies from "./TrustedCompanies";

import SectionBackground from "../SectionBackground";

function Hero() {
  return (
    <section className="relative overflow-visible">
      {/* Shared Background */}
      <SectionBackground />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20">
        <div className="grid w-full items-center gap-20 lg:grid-cols-2">
          {/* Left Side */}

          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              🚀 AI Powered Personal Finance
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight text-gray-900 dark:text-white lg:text-6xl">
              Manage Your Money

              <span className="mt-2 block bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 bg-clip-text text-transparent">
                Smarter with AI
              </span>
            </h1>

            <p className="mt-8 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Track expenses, manage budgets, achieve goals, monitor
              investments, generate reports and receive AI-powered financial
              insights — all in one beautiful platform.
            </p>

            <HeroButtons />

            <HeroStats />

            <TrustedCompanies />
          </div>

          {/* Right Side */}

          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}

export default Hero;