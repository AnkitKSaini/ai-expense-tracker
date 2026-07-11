import { useEffect } from "react";
import { X } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGoals } from "../../hooks/useGoals";
import type {
  Goal,
  CreateGoalDto,
} from "../../types/goal";

const schema = z.object({
  title: z.string().min(2),

  targetAmount: z.coerce.number().positive(),

  savedAmount: z.coerce.number().min(0),

  deadline: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;

  onClose: () => void;

  goal: Goal | null;
}

function GoalForm({
  open,
  onClose,
  goal,
}: Props) {
  const {
    createGoal,
    updateGoal,
  } = useGoals();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (goal) {
      reset({
        title: goal.title,

        targetAmount:
          goal.targetAmount,

        savedAmount:
          goal.savedAmount,

        deadline:
          goal.deadline.slice(0, 10),
      });
    } else {
      reset({
        title: "",

        targetAmount: 0,

        savedAmount: 0,

        deadline: "",
      });
    }
  }, [goal, reset]);

  if (!open) return null;

  const submit = async (
    data: FormData,
  ) => {
    if (goal) {
      await updateGoal({
        id: goal._id,

        goal:
          data as CreateGoalDto,
      });
    } else {
      await createGoal(
        data as CreateGoalDto,
      );
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl dark:bg-gray-900">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-2xl font-bold dark:text-white">
            {goal
              ? "Edit Goal"
              : "New Goal"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit(
            submit,
          )}
          className="space-y-5"
        >
          <input
            {...register("title")}
            placeholder="Goal Name"
            className="w-full rounded-xl border p-3 dark:bg-gray-800"
          />

          <input
            type="number"
            {...register(
              "targetAmount",
            )}
            placeholder="Target Amount"
            className="w-full rounded-xl border p-3 dark:bg-gray-800"
          />

          <input
            type="number"
            {...register(
              "savedAmount",
            )}
            placeholder="Already Saved"
            className="w-full rounded-xl border p-3 dark:bg-gray-800"
          />

          <input
            type="date"
            {...register(
              "deadline",
            )}
            className="w-full rounded-xl border p-3 dark:bg-gray-800"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-white"
            >
              {goal
                ? "Update Goal"
                : "Create Goal"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default GoalForm;