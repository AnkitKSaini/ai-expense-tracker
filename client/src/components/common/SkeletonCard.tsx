function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border bg-white p-5 shadow">
      <div className="mb-4 h-5 w-40 rounded bg-gray-200" />
      <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
      <div className="h-4 w-20 rounded bg-gray-200" />
    </div>
  );
}

export default SkeletonCard;