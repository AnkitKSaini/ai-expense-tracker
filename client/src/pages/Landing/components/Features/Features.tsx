import FeatureCard from "./FeatureCard";
import FeatureStats from "./FeatureStats";

import SectionBackground from "../SectionBackground";

import { LANDING_FEATURES } from "../../../../constants/landing";

function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-32"
    >
      {/* Shared Background */}
      <SectionBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            FEATURES
          </span>

          <h2 className="mt-6 text-5xl font-extrabold leading-tight dark:text-white">
            Everything you need to manage your finances
          </h2>

          <p className="mt-6 text-xl leading-9 text-gray-500 dark:text-gray-400">
            Powerful AI-powered tools to help you track spending, control
            budgets, invest smarter and achieve your financial goals.
          </p>
        </div>

        {/* Premium Stats */}

        <FeatureStats />

        {/* Feature Cards */}

        <div className="relative z-10 mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {LANDING_FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;