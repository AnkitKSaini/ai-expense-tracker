import Skeleton from "../../components/common/Skeleton";

function DashboardSkeleton() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <Skeleton className="h-10 w-64" />

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
      </div>

      {/* Transactions */}
      <Skeleton className="h-80" />

      {/* AI Insights */}
      <Skeleton className="h-72" />

    </div>
  );
}

export default DashboardSkeleton;