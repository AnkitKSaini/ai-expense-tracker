import { useState } from "react";

import ReportOverview from "./ReportOverview";
import ReportFilters from "./ReportFilters";
import ExportButtons from "./ExportButtons";

import ExpenseReport from "./ExpenseReport";
import BudgetReport from "./BudgetReport";
import GoalReport from "./GoalReport";

import InvestmentReport from "./InvestmentReport";
import RecurringReport from "./RecurringReport";
import BillsReport from "./BillsReport";

import MonthlyReport from "./MonthlyReport";
import YearlyReport from "./YearlyReport";
import CategoryChart from "./CategoryChart";

import DateRangeFilter from "./DateRangeFilter";
import CompareReport from "./CompareReport";

function ReportsPage() {
  const [filter, setFilter] = useState("Monthly");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  // Temporary data
  const report = {
    totalExpense: 0,
    totalBudget: 0,
    totalGoals: 0,
    totalInvestment: 0,
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">

      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold dark:text-white">
            📊 Reports Center
          </h1>

          <p className="mt-2 text-gray-500">
            Analyze your complete financial activity.
          </p>

        </div>

        <ExportButtons />

      </div>

      {/* Overview */}

      <ReportOverview report={report} />

      {/* Filters */}

      <div className="flex justify-end">
        <ReportFilters
          value={filter}
          onChange={setFilter}
        />
      </div>

      {/* Date Range */}

      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartChange={setStartDate}
        onEndChange={setEndDate}
      />

      {/* Compare Report */}

      <CompareReport />

      {/* Reports */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <ExpenseReport />

        <BudgetReport />

        <GoalReport />

        <InvestmentReport />

        <RecurringReport />

        <BillsReport />

        <MonthlyReport />

        <YearlyReport />

        <CategoryChart />

      </div>

    </div>
  );
}

export default ReportsPage;