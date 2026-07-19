import { memo } from "react";

const stars = [
  { top: "8%", left: "8%", delay: "0s", duration: "7s" },
  { top: "18%", left: "72%", delay: "2s", duration: "9s" },
  { top: "30%", left: "25%", delay: "4s", duration: "8s" },
  { top: "12%", left: "55%", delay: "6s", duration: "10s" },
  { top: "42%", left: "82%", delay: "3s", duration: "11s" },
];

function ShootingStars() {
  return (
    <>
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute animate-shooting"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        >
          <div
            className="h-px w-28 rounded-full"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,.95), rgba(56,189,248,.55), transparent)",
              filter: "drop-shadow(0 0 10px rgba(56,189,248,.45))",
            }}
          />
        </div>
      ))}
    </>
  );
}

export default memo(ShootingStars);