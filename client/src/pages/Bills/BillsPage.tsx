import { useState } from "react";
import { Plus } from "lucide-react";

import { useBills } from "../../hooks/useBills";

import BillAnalytics from "./BillAnalytics";
import BillSearch from "./BillSearch";
import BillFilters from "./BillFilters";
import BillCard from "./BillCard";
import BillForm from "./BillForm";
import DeleteBillModal from "./DeleteBillModal";
import type { Bill } from "../../types/bill";

function BillsPage() {
  const [open, setOpen] = useState(false);

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { bills, payBill, deleteBill } = useBills();

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const filteredBills = bills.filter((bill) => {
    const matchesSearch = bill.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "All" ? true : bill.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold dark:text-white">💡 Bills</h1>

          <p className="mt-2 text-gray-500">Track your upcoming bills.</p>
        </div>

        <button
          onClick={() => {
            setSelectedBill(null);
            setOpen(true);
          }}
          className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
        >
          <Plus size={20} />
          New Bill
        </button>
      </div>

      {/* Overview */}

      <BillAnalytics bills={bills} />

      {/* Search + Filter */}

      <div className="grid gap-4 lg:grid-cols-2">
        <BillSearch value={search} onChange={setSearch} />

        <BillFilters value={filter} onChange={setFilter} />
      </div>

      {/* Bills Grid */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredBills.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-5 text-6xl">💡</div>

            <h2 className="text-2xl font-bold dark:text-white">
              No Bills Found
            </h2>

            <p className="mt-3 text-gray-500">
              Add your first bill to start tracking payments.
            </p>
          </div>
        ) : (
          filteredBills.map((bill) => (
            <BillCard
              key={bill._id}
              bill={bill}
              onEdit={() => {
                setSelectedBill(bill);
                setOpen(true);
              }}
              onDelete={() => setDeleteId(bill._id)}
              onPay={() => payBill(bill._id)}
            />
          ))
        )}
      </div>

      {/* Bill Form */}

      <BillForm
        open={open}
        bill={selectedBill}
        onClose={() => {
          setOpen(false);
          setSelectedBill(null);
        }}
      />

      {/* Delete Modal */}

      {deleteId && (
        <DeleteBillModal
          onCancel={() => setDeleteId(null)}
          onConfirm={async () => {
            if (!deleteId) return;

            await deleteBill(deleteId);

            setDeleteId(null);
          }}
        />
      )}
    </div>
  );
}

export default BillsPage;
