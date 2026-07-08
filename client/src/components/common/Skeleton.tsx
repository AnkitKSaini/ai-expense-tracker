interface SkeletonProps {
  className?: string;
}

function Skeleton({
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 ${className}`}
    >
      <div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/10"
        style={{
          animation: "shimmer 1.5s infinite",
        }}
      />
    </div>
  );
}

export default Skeleton;