import {
  CalendarDays,
  Pencil,
  Trash2,
  Laptop,
  Car,
  Home,
  Plane,
  Smartphone,
  Bike,
  GraduationCap,
  Target,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

import Confetti from "react-confetti";

import type { Goal } from "../../types/goal";

import GoalMilestones from "./GoalMilestones";

import GoalBadge from "./GoalBadge";

import GoalPredictionCard from "./GoalPredictionCard";

interface Props {
  goal: Goal;
  onDelete: (id: string) => void;
  onEdit: (goal: Goal) => void;
}

function GoalCard({ goal, onDelete, onEdit }: Props) {
  const percentage = Math.min(
    (goal.savedAmount / goal.targetAmount) * 100,
    100,
  );

  const completed = percentage >= 100;

  const remaining = Math.max(goal.targetAmount - goal.savedAmount, 0);

  const today = new Date();

  const deadline = new Date(goal.deadline);

  const daysLeft = Math.max(
    Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
    0,
  );

  const dailySaving =
    daysLeft > 0 ? Math.ceil(remaining / daysLeft) : remaining;

  const status =
    percentage >= 100 ? "Completed" : daysLeft <= 7 ? "Urgent" : "On Track";

  const statusColor =
    percentage >= 100
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      : daysLeft <= 7
        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";

  const confidence = Math.min(
    100,
    Math.max(40, Math.round(percentage + (daysLeft > 30 ? 20 : 5))),
  );

  const recommendation =
    status === "Completed"
      ? "Congratulations! Consider creating a new financial goal."
      : dailySaving < 200
        ? `Save ₹${dailySaving}/day to comfortably reach your goal.`
        : `Try reducing non-essential expenses to save ₹${dailySaving}/day.`;

  const progressColor =
    percentage >= 100
      ? "from-green-500 to-emerald-500"
      : percentage >= 75
        ? "from-blue-500 to-cyan-500"
        : percentage >= 40
          ? "from-yellow-500 to-orange-500"
          : "from-red-500 to-pink-500";

  const deadlineColor =
    daysLeft <= 7
      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      : daysLeft <= 30
        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";

  const getGoalIcon = () => {
    const title = goal.title.toLowerCase();

    if (title.includes("laptop")) return Laptop;
    if (title.includes("car")) return Car;
    if (title.includes("house")) return Home;
    if (title.includes("home")) return Home;
    if (title.includes("vacation")) return Plane;
    if (title.includes("trip")) return Plane;
    if (title.includes("phone")) return Smartphone;
    if (title.includes("mobile")) return Smartphone;
    if (title.includes("bike")) return Bike;
    if (title.includes("education")) return GraduationCap;

    return Target;
  };

  const GoalIcon = getGoalIcon();
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);

  const dailySavingText =
    completed || remaining === 0
      ? "Completed"
      : `${formatCurrency(dailySaving)}/day`;

  const remainingText =
    remaining === 0 ? "No Remaining Amount" : formatCurrency(remaining);

  return (
    <div
      className={`flex h-full flex-col rounded-3xl border p-6 shadow-lg ring-1 ring-black/5 dark:ring-white/10 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:ring-2 hover:ring-blue-500/20

${
  completed
    ? "border-green-400 bg-linear-to-br from-green-50 via-white to-emerald-100 dark:border-green-600 dark:from-green-950 dark:via-slate-900 dark:to-green-900"
    : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
}`}
    >
      {completed && (
        <>
          <Confetti recycle={false} numberOfPieces={250} />
          <div className="mb-5 rounded-2xl border border-green-300 bg-green-100 p-4 text-center dark:border-green-700 dark:bg-green-900/30">
            <h2 className="text-xl font-bold text-green-700 dark:text-green-300">
              🏆 Financial Goal Completed
            </h2>

            <p className="mt-2 text-sm text-green-700 dark:text-green-300">
              Outstanding achievement! You've successfully reached this
              financial milestone. Time to set your next big goal.
            </p>
          </div>
        </>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`rounded-2xl bg-linear-to-br ${progressColor} p-4 shadow-lg`}
          >
            <GoalIcon size={28} className="text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold dark:text-white">{goal.title}</h2>

            <p className="mt-1 text-sm text-gray-500">Financial Goal</p>
          </div>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-xs font-bold ${
            completed
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
              : statusColor
          }`}
        >
          {completed ? "🏆 Completed" : status}
        </span>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500">Progress</span>

          <span className="font-bold text-blue-600">
            {percentage.toFixed(1)}%
          </span>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            style={{
              width: `${percentage}%`,
            }}
            className={`flex h-full items-center justify-end rounded-full bg-linear-to-r ${progressColor} pr-2 transition-all duration-1000 ease-out`}
          >
            {percentage > 12 && (
              <span className="text-[10px] font-bold text-white">
                {percentage.toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Saved */}
        <div className="rounded-2xl bg-green-50 p-4 transition hover:shadow-md dark:bg-green-900/20">
          <div className="flex items-center gap-2">
            <PiggyBank size={18} className="text-green-600" />

            <span className="text-xs font-medium text-gray-500">Saved</span>
          </div>

          <p className="mt-3 text-xl font-bold text-green-600">
            {formatCurrency(goal.savedAmount)}
          </p>
        </div>

        {/* Target */}
        <div className="rounded-2xl bg-blue-50 p-4 transition hover:shadow-md dark:bg-blue-900/20">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-blue-600" />

            <span className="text-xs font-medium text-gray-500">Target</span>
          </div>

          <p className="mt-3 text-xl font-bold dark:text-white">
            {formatCurrency(goal.targetAmount)}
          </p>
        </div>

        {/* Remaining */}
        <div className="rounded-2xl bg-orange-50 p-4 transition hover:shadow-md dark:bg-orange-900/20">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-orange-600" />

            <span className="text-xs font-medium text-gray-500">Remaining</span>
          </div>

          <p className="mt-3 text-xl font-bold text-orange-600">
            {remainingText}
          </p>
        </div>

        {/* Daily Saving */}
        <div className="rounded-2xl bg-cyan-50 p-4 transition hover:shadow-md dark:bg-cyan-900/20">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-cyan-600" />

            <span className="text-xs font-medium text-gray-500">
              Daily Saving
            </span>
          </div>

          <p className="mt-3 text-xl font-bold text-cyan-600">
            {dailySavingText}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {completed ? "Goal Successfully Achieved" : "Required per day"}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
              <CalendarDays size={20} className="text-blue-600" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Deadline
              </p>

              <p className="font-semibold dark:text-white">
                {deadline.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-bold ${deadlineColor}`}
          >
            {completed ? "Completed" : `${daysLeft} Days Left`}
          </span>
        </div>

        {!completed && daysLeft <= 7 && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
            <p className="text-sm font-medium text-red-600 dark:text-red-300">
              🚨 Your deadline is approaching. Increase your daily savings to
              stay on track.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-3xl border border-cyan-200 bg-linear-to-br from-cyan-50 via-white to-blue-50 p-6 shadow-sm dark:border-cyan-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-100 p-3 dark:bg-cyan-900/30">
              <span className="text-xl">🤖</span>
            </div>

            <div>
              <h3 className="font-bold text-cyan-700 dark:text-cyan-300">
                AI Goal Advisor
              </h3>

              <p className="text-xs text-gray-500">
                Smart financial recommendation
              </p>
            </div>
          </div>

          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
            AI Powered
          </span>
        </div>

        <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900">
          <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            💡 {recommendation}
          </p>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Confidence
            </span>

            <span className="font-bold text-cyan-600">{confidence}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              style={{
                width: `${confidence}%`,
              }}
              className="h-full rounded-full bg-linear-to-r from-cyan-500 to-blue-600 transition-all duration-1000"
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
            <p className="text-xs uppercase text-gray-500">Risk Level</p>

            <p className="mt-2 font-bold text-green-600">
              {daysLeft <= 7 ? "High" : "Low"}
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-xs uppercase text-gray-500">Status</p>

            <p className="mt-2 font-bold text-blue-600">{status}</p>
          </div>
        </div>
      </div>

      <GoalBadge percentage={percentage} />
      <GoalMilestones percentage={percentage} />
      <GoalPredictionCard goal={goal} />

      <div className="mt-auto pt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Edit Button */}

          <button
            onClick={() => onEdit(goal)}
            className="
      group
      flex
      items-center
      justify-center
      gap-3
      rounded-2xl
      bg-linear-to-r
      from-blue-600
      to-cyan-600
      px-5
      py-3.5
      font-semibold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      active:scale-95
    "
          >
            <Pencil
              size={18}
              className="transition-transform duration-300 group-hover:rotate-12"
            />
            Edit Goal
          </button>

          {/* Delete Button */}

          <button
            onClick={() => onDelete(goal._id)}
            className="
      group
      flex
      items-center
      justify-center
      gap-3
      rounded-2xl
      bg-linear-to-r
      from-red-600
      to-rose-600
      px-5
      py-3.5
      font-semibold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      active:scale-95
    "
          >
            <Trash2
              size={18}
              className="transition-transform duration-300 group-hover:rotate-12"
            />
            Delete Goal
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalCard;
