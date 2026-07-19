import { DASHBOARD_STATS } from "../dashboard.data";
import DashboardCard from "./DashboardCard";

function DashboardCards() {
  return (
    <section
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {DASHBOARD_STATS.map((stat) => (
        <DashboardCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          positive={stat.positive}
        />
      ))}
    </section>
  );
}

export default DashboardCards;