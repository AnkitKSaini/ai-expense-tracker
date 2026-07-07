import { useState } from "react";
import type { Expense } from "../../types/expense";
import EditExpenseModal from "./EditExpenseModal";

import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

import SearchBar from "../../components/common/SearchBar";
import CategoryFilter from "../../components/common/CategoryFilter";
import Pagination from "../../components/common/Pagination";
import { useExpenses } from "../../hooks/useExpenses";
import SortSelect from "../../components/common/SortSelect";
import toast from "react-hot-toast";


import { exportCSV, exportPDF } from "../../services/export.service";

function ExpensesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const { totalPages } = useExpenses(search, category, sort, page);
  const [isDownloading, setIsDownloading] = useState(false);


const handleExportPDF = async () => {
  try {
    setIsDownloading(true);

    await exportPDF();

    toast.success("PDF exported successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to export PDF");
  } finally {
    setIsDownloading(false);
  }
};
 

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <ExpenseForm />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search expenses..."
        />

        <CategoryFilter value={category} onChange={setCategory} />
        <SortSelect value={sort} onChange={setSort} />

        <button
          onClick={exportCSV}
          className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          📊 Export CSV
        </button>

        <button
          onClick={handleExportPDF}
          disabled={isDownloading}
          className={`rounded-lg px-4 py-2 text-white transition ${
            isDownloading
              ? "cursor-not-allowed bg-gray-500"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isDownloading ? "⏳ Generating PDF..." : "📄 Export PDF"}
        </button>
      </div>

      <ExpenseList
        search={search}
        category={category}
        page={page}
        sort={sort}
        onEdit={(expense) => setSelectedExpense(expense)}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      />

      <EditExpenseModal
        expense={selectedExpense}
        onClose={() => setSelectedExpense(null)}
      />
    </div>
  );
}

export default ExpensesPage;
