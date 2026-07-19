import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-4">

      <Link
        to="/register"
        className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
      >
        Get Started

        <ArrowRight size={18}/>
      </Link>

      <a
        href="#dashboard"
        className="rounded-2xl border px-8 py-4 font-semibold transition hover:border-blue-600 dark:border-gray-700 dark:text-white"
      >
        Live Preview
      </a>

    </div>
  );
}

export default HeroButtons;