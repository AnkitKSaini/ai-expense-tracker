import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as budgetService from "../services/budget.service";

export function useBudget(month: number, year: number) {
  const queryClient = useQueryClient();

  const budgetQuery = useQuery({
    queryKey: ["budget", month, year],
    queryFn: () => budgetService.getBudget(month, year),
  });

  const createMutation = useMutation({
    mutationFn: budgetService.createBudget,

    onSuccess: () => {
      toast.success("Budget saved successfully");

      queryClient.invalidateQueries({
        queryKey: ["budget"],
      });
    },

    onError: () => {
      toast.error("Failed to save budget");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: budgetService.deleteBudget,

    onSuccess: () => {
      toast.success("Budget reset successfully");

      queryClient.invalidateQueries({
        queryKey: ["budget"],
      });
    },

    onError: () => {
      toast.error("Failed to reset budget");
    },
  });

  return {
    budget: budgetQuery.data?.data,
    loading: budgetQuery.isPending,

    createBudget: createMutation.mutateAsync,

    resetBudget: deleteMutation.mutateAsync,
  };
}