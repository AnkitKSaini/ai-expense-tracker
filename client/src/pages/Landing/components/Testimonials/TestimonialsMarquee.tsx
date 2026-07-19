import { motion } from "framer-motion";

import TestimonialCard from "./TestimonialCard";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  country: string;
  avatarGradient: string;
  review: string;
  rating: number;
}

interface Props {
  testimonials: Testimonial[];
}

function TestimonialsMarquee({
  testimonials,
}: Props) {
  // Duplicate for seamless infinite scroll
  const firstRow = testimonials.filter((_, index) => index % 2 === 0);
  const secondRow = testimonials.filter((_, index) => index % 2 !== 0);

  const row1 = [...firstRow, ...firstRow];
  const row2 = [...secondRow, ...secondRow];

  return (
    <div className="relative mt-20 space-y-8 overflow-hidden">
      {/* Left Fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80" />

      {/* Row 1 */}
      <div className="group flex overflow-hidden">
        <div className="marquee flex gap-8 group-hover:[animation-play-state:paused]">
          {row1.map((item, index) => (
            <div
              key={`row1-${index}`}
              className="w-[360px] shrink-0"
            >
              <motion.div
                whileHover={{
                  y: -8,
                }}
              >
                <TestimonialCard {...item} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="group flex overflow-hidden">
        <div className="marquee-reverse flex gap-8 group-hover:[animation-play-state:paused]">
          {row2.map((item, index) => (
            <div
              key={`row2-${index}`}
              className="w-[360px] shrink-0"
            >
              <motion.div
                whileHover={{
                  y: -8,
                }}
              >
                <TestimonialCard {...item} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsMarquee;