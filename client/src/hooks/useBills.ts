import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { billService } from "../services/bill.service";

export function useBills() {
  const queryClient =
    useQueryClient();

  const billsQuery = useQuery({
    queryKey: ["bills"],
    queryFn: billService.getAll,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ["bills"],
    });

  const createBill =
    useMutation({
      mutationFn:
        billService.create,

      onSuccess() {
        toast.success(
          "Bill created.",
        );

        invalidate();
      },
    });

  const updateBill =
    useMutation({
      mutationFn: ({
        id,
        data,
      }: any) =>
        billService.update(
          id,
          data,
        ),

      onSuccess() {
        toast.success(
          "Bill updated.",
        );

        invalidate();
      },
    });

  const deleteBill =
    useMutation({
      mutationFn:
        billService.delete,

      onSuccess() {
        toast.success(
          "Bill deleted.",
        );

        invalidate();
      },
    });

  const payBill =
    useMutation({
      mutationFn:
        billService.pay,

      onSuccess() {
        toast.success(
          "Bill paid successfully.",
        );

        invalidate();

        queryClient.invalidateQueries({
          queryKey: [
            "expenses",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "dashboard",
          ],
        });
      },
    });

  return {
    bills:
      billsQuery.data ?? [],

    loading:
      billsQuery.isLoading,

    error:
      billsQuery.isError,

    refetch:
      billsQuery.refetch,


    createBill:
      createBill.mutateAsync,

    updateBill:
      updateBill.mutateAsync,

    deleteBill:
      deleteBill.mutateAsync,

    payBill:
      payBill.mutateAsync,
  };
}