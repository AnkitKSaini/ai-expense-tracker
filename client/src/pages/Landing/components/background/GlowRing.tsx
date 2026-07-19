import { memo } from "react";

function GlowRing() {
  return (
    <>
      {/* Ring 1 */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-cyan-400/10
          animate-rotate-slow
        "
      />

      {/* Ring 2 */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[720px]
          w-[720px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-blue-500/10
          animate-rotate-slow
        "
        style={{
          animationDuration: "95s",
          animationDirection: "reverse",
        }}
      />

      {/* Ring 3 */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[920px]
          w-[920px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-violet-500/5
          animate-rotate-slow
        "
        style={{
          animationDuration: "120s",
        }}
      />

      {/* Center Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          animate-pulse-glow
        "
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,.14), transparent 72%)",
          filter: "blur(40px)",
        }}
      />
    </>
  );
}

export default memo(GlowRing);