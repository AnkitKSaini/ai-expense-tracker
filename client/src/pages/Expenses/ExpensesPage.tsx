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
function ExpensesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const { totalPages } = useExpenses(search, category,sort , page);

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
        <SortSelect
  value={sort}
  onChange={setSort}
/>
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
