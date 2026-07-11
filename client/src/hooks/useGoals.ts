import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import * as goalService from "../services/goal.service";

import toast from "react-hot-toast";

import type { CreateGoalDto } from "../types/goal";

export function useGoals() {
  const queryClient = useQueryClient();

  const goalsQuery = useQuery({
    queryKey: ["goals"],
    queryFn: goalService.getGoals,
  });

  const createMutation = useMutation({
    mutationFn: goalService.createGoal,

    onSuccess: () => {
      toast.success("Goal created");

      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: goalService.deleteGoal,

    onSuccess: () => {
      toast.success("Goal deleted");

      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, goal }: { id: string; goal: CreateGoalDto }) =>
      goalService.updateGoal(id, goal),

    onSuccess: () => {
      toast.success("Goal updated");

      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });

  return {
    goals: goalsQuery.data?.data ?? [],
    loading: goalsQuery.isPending,

    createGoal: createMutation.mutateAsync,

    deleteGoal: deleteMutation.mutateAsync,

    updateGoal: updateMutation.mutateAsync,
  };
}
