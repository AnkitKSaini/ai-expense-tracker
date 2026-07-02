import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import * as expenseService from "../services/expense.service";
import type { Expense } from "../types/expense";

export function useExpenses() {
  const queryClient = useQueryClient();

  const expensesQuery = useQuery<Expense[]>({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await expenseService.getExpenses();
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: expenseService.createExpense,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });

  return {
    expenses: expensesQuery.data ?? [],
    loading: expensesQuery.isPending,

    createExpense: createMutation.mutateAsync,

    refetch: expensesQuery.refetch,
  };
}
