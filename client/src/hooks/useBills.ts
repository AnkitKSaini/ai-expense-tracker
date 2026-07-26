import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { billService } from "../services/bill.service";

import type { Bill } from "../types/bill";

export function useBills() {
  const queryClient = useQueryClient();

  const billsQuery = useQuery({
    queryKey: ["bills"],
    queryFn: billService.getAll,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ["bills"],
    });

  // Create Bill
  const createBill = useMutation({
    mutationFn: billService.create,

    onSuccess() {
      toast.success("Bill created.");

      invalidate();
    },

    onError() {
      toast.error("Failed to create bill.");
    },
  });

  // Update Bill
  const updateBill = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Bill>;
    }) => billService.update(id, data),

    onSuccess() {
      toast.success("Bill updated.");

      invalidate();
    },

    onError() {
      toast.error("Failed to update bill.");
    },
  });

  // Delete Bill
  const deleteBill = useMutation({
    mutationFn: billService.delete,

    onSuccess() {
      toast.success("Bill deleted.");

      invalidate();
    },

    onError() {
      toast.error("Failed to delete bill.");
    },
  });

  // Pay Bill
  const payBill = useMutation({
    mutationFn: billService.pay,

    onSuccess() {
      toast.success("Bill paid successfully.");

      invalidate();

      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },

    onError() {
      toast.error("Failed to pay bill.");
    },
  });

  return {
    bills: billsQuery.data ?? [],

    loading: billsQuery.isLoading,

    error: billsQuery.error,

    isError: billsQuery.isError,

    refetch: billsQuery.refetch,

    createBill: createBill.mutateAsync,

    updateBill: updateBill.mutateAsync,

    deleteBill: deleteBill.mutateAsync,

    payBill: payBill.mutateAsync,
  };
}