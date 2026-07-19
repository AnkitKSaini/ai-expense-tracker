import Aurora from "./Aurora";
import TechGrid from "./TechGrid";
import ParticleSystem from "./ParticleSystem";
import Noise from "./Noise";
import LightRays from "./LightRays";
import GlowRing from "./GlowRing";
import ShootingStars from "./ShootingStars";

function PremiumBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base */}

      <div className="absolute inset-0 bg-[#020617]" />

      {/* Hero Spotlight */}

      <div
        className="absolute inset-0"
        style={{
          background: `
          radial-gradient(circle at 50% 18%,
          rgba(37,99,235,.18),
          transparent 35%)
        `,
        }}
      />

      <Aurora />

      <TechGrid />

      <LightRays />
      
      <GlowRing />

      <ShootingStars />

      <ParticleSystem />

      <Noise />
    </div>
  );
}

export default PremiumBackground;
