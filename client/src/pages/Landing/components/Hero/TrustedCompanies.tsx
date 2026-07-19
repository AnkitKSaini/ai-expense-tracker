import {
  FaMicrosoft,
  FaAmazon,
} from "react-icons/fa6";

import {
  SiGoogle,
} from "react-icons/si";

function TrustedCompanies() {
 const companies = [
  {
    name: "Google",
    icon: SiGoogle,
  },
  {
    name: "Microsoft",
    icon: FaMicrosoft,
  },
   
  {
    name: "Amazon",
    icon: FaAmazon,
  },
];

  return (
    <div className="mt-16">
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
        Trusted Technologies
      </p>

      <div className="flex flex-wrap gap-8">
        {companies.map((company) => {
          const Icon = company.icon;

          return (
            <div
              key={company.name}
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
            >
              <Icon
                size={24}
                className="text-blue-600"
              />

              <span className="font-medium dark:text-white">
                {company.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrustedCompanies;