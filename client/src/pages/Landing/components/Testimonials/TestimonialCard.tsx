import { motion } from "framer-motion";
import { Quote, Star, BadgeCheck } from "lucide-react";

interface Props {
  name: string;
  role: string;
  company: string;
  country: string;
  avatarGradient: string;
  review: string;
  rating: number;
}

function TestimonialCard({
  name,
  role,
  company,
  country,
  avatarGradient,
  review,
  rating,
}: Props) {
  const initials = name
    .split(" ")
    .map((item) => item[0])
    .join("");

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="group relative overflow-hidden rounded-32px border border-white/50 bg-white/70 p-8 shadow-xl backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/70"
    >
      {/* Hover Glow */}

      <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-cyan-500/0 to-violet-500/0 opacity-0 transition duration-500 group-hover:opacity-10" />

      {/* Quote */}

      <Quote
        size={44}
        className="absolute right-6 top-6 text-blue-100 transition-all duration-500 group-hover:rotate-12 group-hover:text-blue-500"
      />

      {/* User */}

      {/* User */}

      <div className="flex items-center gap-4">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${avatarGradient} text-xl font-bold text-white shadow-lg`}
        >
          {initials}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold dark:text-white">{name}</h3>

            <BadgeCheck size={18} className="text-blue-500" />
          </div>

          <p className="text-sm text-gray-500">{role}</p>

          <p className="mt-1 text-xs font-medium text-blue-600">{company}</p>

          <p className="text-xs text-gray-400">{country}</p>
        </div>
      </div>
      {/* Stars */}

      <div className="mt-7 flex gap-1">
        {Array.from({
          length: rating,
        }).map((_, index) => (
          <Star
            key={index}
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* Review */}

      <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">
        "{review}"
      </p>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-5 dark:border-gray-700">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          Verified User
        </span>

        <span className="text-sm font-medium text-gray-500">
          ⭐ {rating}.0 / 5
        </span>
      </div>

      {/* Bottom Border */}

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-blue-600 via-cyan-500 to-violet-500 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

export default TestimonialCard;
