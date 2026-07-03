import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import * as expenseService from "../services/expense.service";
import type { Expense } from "../types/expense";

export function useExpenses(
  search = "",
  category = ""
) {
  const queryClient = useQueryClient();

  // Get Expenses
 const expensesQuery = useQuery<Expense[]>({
  queryKey: ["expenses", search, category],
  queryFn: async () => {
    const response =
      await expenseService.getExpenses(
        search,
        category
      );

    return response.data;
  },
});

  // Create Expense
  const createMutation = useMutation({
    mutationFn: expenseService.createExpense,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, expense }: { id: string; expense: any }) =>
      expenseService.updateExpense(id, expense),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });

  // Delete Expense
  const deleteMutation = useMutation({
    mutationFn: expenseService.deleteExpense,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });

  return {
    expenses: expensesQuery.data ?? [],
    loading: expensesQuery.isPending,

    createExpense: createMutation.mutateAsync,

    updateExpense: updateMutation.mutateAsync,

    deleteExpense: deleteMutation.mutateAsync,

    refetch: expensesQuery.refetch,
  };
}
