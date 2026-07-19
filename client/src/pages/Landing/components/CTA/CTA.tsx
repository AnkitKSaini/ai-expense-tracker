import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SectionBackground from "../SectionBackground";

const FEATURES = [
  "No Credit Card",
  "AI Powered",
  "100% Secure",
  "Free Forever",
];

function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      {/* Shared Background */}
      <SectionBackground />

      {/* Background Glow */}
      <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-blue-200/30 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 px-8 py-20 text-center text-white shadow-[0_25px_80px_rgba(37,99,235,0.35)] md:px-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
          <Sparkles size={16} className="text-yellow-300" />
          <span className="text-sm font-semibold tracking-wide">
            Start Your Financial Journey
          </span>
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
          Take Control of Your{" "}
          <span className="bg-gradient-to-r from-cyan-200 via-white to-yellow-200 bg-clip-text text-transparent">
            Finances with AI
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100 md:text-xl">
          Join thousands of users managing expenses, budgets and investments
          smarter with powerful AI insights and real-time analytics.
        </p>

        {/* Feature Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {FEATURES.map((item) => (
            <div
              key={item}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md"
            >
              {item}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="group inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-blue-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            Get Started Free
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <ShieldCheck size={18} />
            Sign In
          </Link>
        </div>

        {/* Trust */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <div className="text-xl text-yellow-300">⭐⭐⭐⭐⭐</div>

          <p className="text-sm text-blue-100">
            Rated <span className="font-bold text-white">4.9/5</span> by{" "}
            <span className="font-bold text-white">10,000+</span> happy users
            worldwide
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTA;
