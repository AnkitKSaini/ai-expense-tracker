import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import * as expenseService from "../services/expense.service";

import toast from "react-hot-toast";

export function useExpenses(
  search = "",
  category = "",
  sort = "latest",
  page = 1,
  limit = 10,
) {
  const queryClient = useQueryClient();

  // Get Expenses
  const expensesQuery = useQuery({
    queryKey: ["expenses", search, category, sort, page, limit],
    queryFn: async () => {
      return await expenseService.getExpenses(
        search,
        category,
        sort,
        page,
        limit,
      );
    },
  });

  // Create Expense
  const createMutation = useMutation({
    mutationFn: expenseService.createExpense,

    onSuccess: () => {
      toast.success("Expense added successfully");

      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },

    onError: () => {
      toast.error("Failed to add expense");
    },
  });

  // Update Expense
  const updateMutation = useMutation({
    mutationFn: ({ id, expense }: { id: string; expense: any }) =>
      expenseService.updateExpense(id, expense),
    onSuccess: () => {
      toast.success("Expense updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },

    onError: () => {
      toast.error("Failed to update expense");
    },
  });

  // Delete Expense
  const deleteMutation = useMutation({
    mutationFn: expenseService.deleteExpense,

    onSuccess: () => {
      toast.success("Expense deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },

    onError: () => {
      toast.error("Failed to delete expense");
    },
  });

  return {
    expenses: expensesQuery.data?.data?.expenses ?? [],

    total: expensesQuery.data?.data?.total ?? 0,

    page: expensesQuery.data?.data?.page ?? 1,

    totalPages: expensesQuery.data?.data?.totalPages ?? 1,

    loading: expensesQuery.isPending,

    error: expensesQuery.error,

    createExpense: createMutation.mutateAsync,

    updateExpense: updateMutation.mutateAsync,

    deleteExpense: deleteMutation.mutateAsync,

    refetch: expensesQuery.refetch,
  };
}
