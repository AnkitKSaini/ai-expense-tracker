import {
  Target,
} from "lucide-react";

import { useGoals } from "../../hooks/useGoals";
import type { Goal } from "../../types/goal";

function GoalReport() {

  const {
    goals,
  } = useGoals();

  const completed = goals.filter(
  (g: Goal) => g.completed
).length;

  return (

    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

      <div className="mb-6 flex items-center gap-3">

        <Target
          className="text-green-600"
          size={28}
        />

        <h2 className="text-2xl font-bold dark:text-white">

          Goals Report

        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div>

          <p className="text-gray-500">
            Total Goals
          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {goals.length}

          </h2>

        </div>

        <div>

          <p className="text-gray-500">
            Completed
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">

            {completed}

          </h2>

        </div>

        <div>

          <p className="text-gray-500">
            Progress
          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {goals.length
              ? Math.round(
                  (completed /
                    goals.length) *
                    100,
                )
              : 0}
            %

          </h2>

        </div>

      </div>

    </div>

  );

}

export default GoalReport;