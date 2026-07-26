import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { recurringService } from "../services/recurring.service";

import type { RecurringTransaction } from "../types/recurring";

export function useRecurring() {
  const queryClient = useQueryClient();

  const recurringQuery = useQuery({
    queryKey: ["recurring"],
    queryFn: recurringService.getAll,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ["recurring"],
    });

  // Create Recurring
  const createMutation = useMutation({
    mutationFn: recurringService.create,

    onSuccess: () => {
      toast.success("Recurring transaction created.");

      invalidate();
    },

    onError: () => {
      toast.error("Failed to create recurring.");
    },
  });

  // Update Recurring
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<RecurringTransaction>;
    }) => recurringService.update(id, data),

    onSuccess: () => {
      toast.success("Recurring updated.");

      invalidate();
    },

    onError: () => {
      toast.error("Failed to update recurring.");
    },
  });

  // Delete Recurring
  const deleteMutation = useMutation({
    mutationFn: recurringService.delete,

    onSuccess: () => {
      toast.success("Recurring deleted.");

      invalidate();
    },

    onError: () => {
      toast.error("Failed to delete recurring.");
    },
  });

  // Run Recurring
  const runMutation = useMutation({
    mutationFn: recurringService.run,

    onSuccess: () => {
      toast.success("Recurring transaction executed.");

      invalidate();

      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },

    onError: () => {
      toast.error("Failed to execute recurring transaction.");
    },
  });

  return {
    recurring: recurringQuery.data ?? [],

    loading: recurringQuery.isLoading,

    error: recurringQuery.error,

    isError: recurringQuery.isError,

    refetch: recurringQuery.refetch,

    createRecurring:
      createMutation.mutateAsync,

    updateRecurring:
      updateMutation.mutateAsync,

    deleteRecurring:
      deleteMutation.mutateAsync,

    runRecurring:
      runMutation.mutateAsync,
  };
}