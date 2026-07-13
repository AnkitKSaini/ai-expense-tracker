import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { recurringService } from "../services/recurring.service";

export function useRecurring() {
  const queryClient = useQueryClient();

  const recurringQuery = useQuery({
    queryKey: ["recurring"],
    queryFn: recurringService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: recurringService.create,

    onSuccess: () => {
      toast.success("Recurring transaction created.");

      queryClient.invalidateQueries({
        queryKey: ["recurring"],
      });
    },

    onError: () => {
      toast.error("Failed to create recurring.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) =>
      recurringService.update(id, data),

    onSuccess: () => {
      toast.success("Recurring updated.");

      queryClient.invalidateQueries({
        queryKey: ["recurring"],
      });
    },

    onError: () => {
      toast.error("Failed to update recurring.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: recurringService.delete,

    onSuccess: () => {
      toast.success("Recurring deleted.");

      queryClient.invalidateQueries({
        queryKey: ["recurring"],
      });
    },

    onError: () => {
      toast.error("Failed to delete recurring.");
    },
  });

  return {
    recurring: recurringQuery.data ?? [],

    loading: recurringQuery.isLoading,

    error: recurringQuery.isError,

    refetch: recurringQuery.refetch,

    createRecurring:
      createMutation.mutateAsync,

    updateRecurring:
      updateMutation.mutateAsync,

    deleteRecurring:
      deleteMutation.mutateAsync,
  };
}