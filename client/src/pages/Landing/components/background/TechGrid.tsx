import { memo } from "react";

function TechGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(59,130,246,.16) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,.16) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage:
          "radial-gradient(circle at center, black 40%, transparent 90%)",
        WebkitMaskImage:
          "radial-gradient(circle at center, black 40%, transparent 90%)",
      }}
    />
  );
}

export default memo(TechGrid);