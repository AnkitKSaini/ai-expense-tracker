import { Plus } from "lucide-react";
import { useState } from "react";
import { Download } from "lucide-react";


import PortfolioOverview from "./PortfolioOverview";
import PortfolioAnalytics from "./PortfolioAnalytics";
import PortfolioInsights from "./PortfolioInsights";
import TopPerformers from "./TopPerformers";
import InvestmentTimeline from "./InvestmentTimeline";

import AssetAllocationChart from "../charts/AllocationPie";
import PortfolioGrowthChart from "../charts/GrowthChart";
import ProfitLossChart from "../charts/ProfitLossChart";
import RiskDistributionChart from "../charts/RiskDistributionChart";
import RiskSummaryCard from "./RiskSummaryCard";
import AIPortfolioAdvisor from "./AIPortfolioAdvisor";

import InvestmentCard from "./InvestmentCard";
import InvestmentForm from "./InvestmentForm";

import InvestmentSearch from "./InvestmentSearch";
import InvestmentFilters from "./InvestmentFilters";

import DeleteInvestmentModal from "./DeleteInvestmentModal";

import { useInvestments } from "../../hooks/useInvestments";

import type { Investment } from "../../types/investment";
import { exportPortfolioPDF } from "../../services/investmentExport.service";

function InvestmentsPage() {
  const [open, setOpen] = useState(false);

  const [selectedInvestment, setSelectedInvestment] =
    useState<Investment | null>(null);

  const [deleteInvestmentId, setDeleteInvestmentId] = useState<string | null>(
    null,
  );

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const {
    investments,
    investmentsLoading,
    portfolioSummary,
    deleteInvestment,
  } = useInvestments();

  const filteredInvestments = investments.filter((investment) => {
    const matchesSearch = investment.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesFilter = filter === "All" ? true : investment.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold dark:text-white">📈 Investments</h1>

          <p className="mt-2 text-gray-500">
            Manage your portfolio and track your wealth.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedInvestment(null);
            setOpen(true);
          }}
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-linear-to-r
            from-indigo-600
            to-blue-600
            px-6
            py-3
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <Plus size={20} />
          Add Investment
        </button>
      </div>
      <div>

<button
  onClick={exportPortfolioPDF}
  className="
    group
    inline-flex
    items-center
    justify-center
    gap-3
    rounded-2xl
    bg-linear-to-r
    from-indigo-600
    via-violet-600
    to-purple-600
    px-6
    py-3
    font-semibold
    text-white
    shadow-lg
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
    active:scale-95
    dark:from-indigo-500
    dark:via-violet-500
    dark:to-purple-500
  "
>
  <Download
    size={20}
    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
  />

  <span>Export Portfolio PDF</span>
</button>
      </div>
      {/* Portfolio Overview */}

      <PortfolioOverview
        summary={portfolioSummary}
        loading={investmentsLoading}
      />

      <PortfolioAnalytics investments={filteredInvestments} />

      <PortfolioInsights investments={filteredInvestments} />

      <RiskSummaryCard investments={filteredInvestments} />

      <AIPortfolioAdvisor investments={filteredInvestments} />

      <TopPerformers investments={filteredInvestments} />

      <InvestmentTimeline investments={filteredInvestments} />

      <div className="grid gap-4 lg:grid-cols-2">
        <InvestmentSearch value={search} onChange={setSearch} />

        <InvestmentFilters value={filter} onChange={setFilter} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AssetAllocationChart investments={filteredInvestments} />
        <PortfolioGrowthChart investments={filteredInvestments} />
        <ProfitLossChart investments={filteredInvestments} />
        <RiskDistributionChart investments={filteredInvestments} />
      </div>

      {/* Investment List */}

      {filteredInvestments.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-16 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-6 text-6xl">💼</div>

          <h2 className="text-2xl font-bold dark:text-white">
            No Investments Yet
          </h2>

          <p className="mt-3 text-gray-500">
            Start building your investment portfolio.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredInvestments.map((investment) => (
            <InvestmentCard
              key={investment._id}
              investment={investment}
              onEdit={(investment) => {
                setSelectedInvestment(investment);
                setOpen(true);
              }}
              onDelete={(id) => setDeleteInvestmentId(id)}
            />
          ))}
        </div>
      )}

      {/* Investment Form */}

      <InvestmentForm
        open={open}
        investment={selectedInvestment}
        onClose={() => {
          setOpen(false);
          setSelectedInvestment(null);
        }}
      />

      {deleteInvestmentId && (
        <DeleteInvestmentModal
          onCancel={() => setDeleteInvestmentId(null)}
          onConfirm={() => {
            deleteInvestment(deleteInvestmentId);
            setDeleteInvestmentId(null);
          }}
        />
      )}
    </div>
  );
}

export default InvestmentsPage;
