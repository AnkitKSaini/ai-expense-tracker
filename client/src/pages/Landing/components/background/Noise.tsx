import { memo } from "react";

function Noise() {
  return (
    <div
      className="
      absolute
      inset-0
      opacity-[0.025]
      mix-blend-soft-light
      "
      style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255,255,255,.18) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(255,255,255,.14) 1px, transparent 1px)
        `,
        backgroundSize: "120px 120px",
      }}
    />
  );
}

export default memo(Noise);