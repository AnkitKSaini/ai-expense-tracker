const stats = [
  {
    title: "Users",
    value: "10K+",
  },
  {
    title: "Money Tracked",
    value: "₹25M+",
  },
  {
    title: "Accuracy",
    value: "99.9%",
  },
];

function HeroStats() {
  return (
    <div className="mt-14 grid gap-5 sm:grid-cols-3">

      {stats.map((item)=>(
        <div
          key={item.title}
          className="rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900"
        >
          <h2 className="text-3xl font-bold text-blue-600">
            {item.value}
          </h2>

          <p className="mt-2 text-gray-500">
            {item.title}
          </p>

        </div>
      ))}

    </div>
  );
}

export default HeroStats;