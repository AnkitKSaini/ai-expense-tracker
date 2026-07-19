import {
  Brain,
  Sparkles,
} from "lucide-react";

function MiniAIInsight() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-xl">
      <div className="flex items-center gap-3">
        <Brain size={26} />

        <h3 className="text-lg font-bold">
          AI Insight
        </h3>
      </div>

      <p className="mt-4 leading-7 text-blue-100">
        Great job! You're saving 18% more this
        month compared to last month. Continue
        maintaining your budget for even better
        financial health.
      </p>

      <div className="mt-5 flex items-center gap-2">
        <Sparkles size={18} />

        <span className="text-sm">
          AI Confidence 96%
        </span>
      </div>
    </div>
  );
}

export default MiniAIInsight;