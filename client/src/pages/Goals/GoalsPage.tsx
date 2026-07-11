import { useState } from "react";
import { Plus } from "lucide-react";

import DeleteGoalModal from "./DeleteGoalModal";

import GoalCard from "./GoalCard";
import GoalForm from "./GoalForm";
import GoalsOverview from "./GoalsOverview";
import GoalSearch from "./GoalSearch";
import GoalFilters from "./GoalFilters";
import GoalAnalytics from "./GoalAnalytics";

import GoalProgressChart from "./charts/GoalProgressChart";
import GoalStatusPie from "./charts/GoalStatusPie";

import { useGoals } from "../../hooks/useGoals";
import type { Goal } from "../../types/goal";

function GoalsPage() {
  const [deleteGoalId, setDeleteGoalId] =
    useState<string | null>(null);

  const { goals, deleteGoal } = useGoals();

  const [open, setOpen] = useState(false);

  const [selectedGoal, setSelectedGoal] =
    useState<Goal | null>(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] =
    useState("All");

  const filteredGoals = goals.filter(
    (goal: Goal) => {
      const percentage =
        (goal.savedAmount /
          goal.targetAmount) *
        100;

      const deadline = new Date(
        goal.deadline,
      );

      const daysLeft = Math.max(
        Math.ceil(
          (deadline.getTime() -
            Date.now()) /
            (1000 * 60 * 60 * 24),
        ),
        0,
      );

      const matchesSearch =
        goal.title
          .toLowerCase()
          .includes(
            search.trim().toLowerCase(),
          );

      const matchesFilter =
        filter === "All"
          ? true
          : filter === "Completed"
            ? percentage >= 100
            : filter === "Urgent"
              ? daysLeft <= 7 &&
                percentage < 100
              : percentage < 100;

      return (
        matchesSearch &&
        matchesFilter
      );
    },
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">

      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold dark:text-white">
            🎯 Financial Goals
          </h1>

          <p className="mt-2 text-gray-500">
            Track and achieve your financial dreams.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedGoal(null);
            setOpen(true);
          }}
          className="
            flex
            items-center
            justify-center
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
          New Goal
        </button>

      </div>

      {/* Overview */}

      <GoalsOverview goals={filteredGoals} />

      {/* Analytics */}

      <GoalAnalytics goals={filteredGoals} />

      {/* Charts */}

      <div className="grid gap-6 lg:grid-cols-2">
        <GoalProgressChart goals={filteredGoals} />

        <GoalStatusPie goals={filteredGoals} />
      </div>

      {/* Search + Filters */}

      <div className="grid gap-4 lg:grid-cols-2">
        <GoalSearch
          value={search}
          onChange={setSearch}
        />

        <GoalFilters
          value={filter}
          onChange={setFilter}
        />
      </div>

      {/* Goals */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredGoals.length === 0 ? (

          <div className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <div className="mb-5 text-6xl">
              🔍
            </div>

            <h2 className="text-2xl font-bold dark:text-white">
              No Goals Found
            </h2>

            <p className="mt-3 text-gray-500">
              Try changing your search or filter.
            </p>

          </div>

        ) : (

          filteredGoals.map((goal: Goal) => (
            <GoalCard
              key={goal._id}
              goal={goal}
              onDelete={(id) =>
                setDeleteGoalId(id)
              }
              onEdit={(goal) => {
                setSelectedGoal(goal);
                setOpen(true);
              }}
            />
          ))

        )}

      </div>

      {/* Goal Form */}

      <GoalForm
        open={open}
        goal={selectedGoal}
        onClose={() => setOpen(false)}
      />

      {/* Delete Modal */}

      {deleteGoalId && (
        <DeleteGoalModal
          onCancel={() =>
            setDeleteGoalId(null)
          }
          onConfirm={() => {
            deleteGoal(deleteGoalId);
            setDeleteGoalId(null);
          }}
        />
      )}

    </div>
  );
}

export default GoalsPage;