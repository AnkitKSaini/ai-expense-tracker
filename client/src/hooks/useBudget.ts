import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as budgetService from "../services/budget.service";

export function useBudget(month: number, year: number) {
  const budgetQuery = useQuery({
    queryKey: ["budget", month, year],
    queryFn: () => budgetService.getBudget(month, year),
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: budgetService.createBudget,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budget"],
      });
    },
  });

  return {
    budget: budgetQuery.data?.data,
    loading: budgetQuery.isPending,
    createBudget: createMutation.mutateAsync,
  };
}
