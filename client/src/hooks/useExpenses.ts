import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import * as expenseService from "../services/expense.service";

export function useExpenses(
  search = "",
  category = "",
  page = 1,
  limit = 10
) {
  const queryClient = useQueryClient();

  // Get Expenses
const expensesQuery = useQuery({
  queryKey: [
    "expenses",
    search,
    category,
    page,
    limit,
  ],
  queryFn: async () => {
    return await expenseService.getExpenses(
      search,
      category,
      page,
      limit
    );
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
expenses: expensesQuery.data?.data?.expenses ?? [],

total: expensesQuery.data?.data?.total ?? 0,

page: expensesQuery.data?.data?.page ?? 1,

totalPages:
  expensesQuery.data?.data?.totalPages ?? 1,
     loading: expensesQuery.isPending,

    createExpense: createMutation.mutateAsync,

    updateExpense: updateMutation.mutateAsync,

    deleteExpense: deleteMutation.mutateAsync,

    refetch: expensesQuery.refetch,
  };
}
