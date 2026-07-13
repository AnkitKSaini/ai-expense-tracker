import { useState } from "react";
import { Plus } from "lucide-react";

import { useRecurring } from "../../hooks/useRecurring";

import type { RecurringTransaction } from "../../types/recurring";

import RecurringOverview from "./RecurringOverview";
import RecurringAnalytics from "./RecurringAnalytics";
import RecurringSearch from "./RecurringSearch";
import RecurringFilters from "./RecurringFilters";
import RecurringCard from "./RecurringCard";
import RecurringForm from "./RecurringForm";
import DeleteRecurringModal from "./DeleteRecurringModal";
import RecurringCalendar from "./RecurringCalendar";

function RecurringPage() {
  const { recurring, deleteRecurring } = useRecurring();

  const [open, setOpen] = useState(false);

  const [selectedRecurring, setSelectedRecurring] =
    useState<RecurringTransaction | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const filteredRecurring = recurring.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Active"
          ? item.isActive
          : !item.isActive;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold dark:text-white">
            🔁 Recurring Transactions
          </h1>

          <p className="mt-2 text-gray-500">
            Automate your income and expenses.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedRecurring(null);
            setOpen(true);
          }}
          className="
          flex
          items-center
          gap-2
          rounded-2xl
          bg-linear-to-r
          from-blue-600
          to-cyan-600
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
          New Recurring
        </button>
      </div>

      <RecurringOverview recurring={filteredRecurring} />

      <RecurringAnalytics recurring={filteredRecurring} />

      <RecurringCalendar />

      <div className="grid gap-4 lg:grid-cols-2">
        <RecurringSearch value={search} onChange={setSearch} />

        <RecurringFilters value={filter} onChange={setFilter} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredRecurring.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-5 text-6xl">🔁</div>

            <h2 className="text-2xl font-bold dark:text-white">
              No Recurring Transactions
            </h2>

            <p className="mt-3 text-gray-500">
              Create your first recurring transaction.
            </p>
          </div>
        ) : (
          filteredRecurring.map((item) => (
            <RecurringCard
              key={item._id}
              recurring={item}
              onEdit={() => {
                setSelectedRecurring(item);

                setOpen(true);
              }}
              onDelete={() => setDeleteId(item._id)}
            />
          ))
        )}
      </div>

      <RecurringForm
        open={open}
        recurring={selectedRecurring}
        onClose={() => setOpen(false)}
      />

      {deleteId && (
        <DeleteRecurringModal
          onCancel={() => setDeleteId(null)}
          onConfirm={async () => {
            if (!deleteId) return;

            await deleteRecurring(deleteId);

            setDeleteId(null);
          }}
        />
      )}
    </div>
  );
}

export default RecurringPage;
