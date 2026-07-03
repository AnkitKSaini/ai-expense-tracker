import { useState } from "react";
import type { Expense } from "../../types/expense";
import EditExpenseModal from "./EditExpenseModal";

import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

import SearchBar from "../../components/common/SearchBar";
import CategoryFilter from "../../components/common/CategoryFilter";
import Pagination from "../../components/common/Pagination";

function ExpensesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

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
      </div>

      <ExpenseList
        search={search}
        category={category}
        onEdit={(expense) => setSelectedExpense(expense)}
      />

      <Pagination
        page={page}
        totalPages={1}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setPage((prev) => prev + 1)}
      />

      <EditExpenseModal
        expense={selectedExpense}
        onClose={() => setSelectedExpense(null)}
      />
    </div>
  );
}

export default ExpensesPage;
