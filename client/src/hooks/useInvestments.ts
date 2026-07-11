import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import {
  getInvestments,
  getPortfolioSummary,
  createInvestment,
  updateInvestment,
  deleteInvestment,
} from "../services/investment.service";

import type { InvestmentFormData } from "../types/investment";

export function useInvestments() {
  const queryClient = useQueryClient();

  // =========================
  // Investments
  // =========================

  const investmentsQuery = useQuery({
    queryKey: ["investments"],
    queryFn: getInvestments,
  });

  // =========================
  // Portfolio Summary
  // =========================

  const summaryQuery = useQuery({
    queryKey: ["portfolio-summary"],
    queryFn: getPortfolioSummary,
  });

  // =========================
  // Create
  // =========================

  const createMutation = useMutation({
    mutationFn: createInvestment,

    onSuccess: () => {
      toast.success("Investment added successfully");

      queryClient.invalidateQueries({
        queryKey: ["investments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["portfolio-summary"],
      });
    },

    onError: () => {
      toast.error("Failed to add investment");
    },
  });

  // =========================
  // Update
  // =========================

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<InvestmentFormData>;
    }) => updateInvestment(id, data),

    onSuccess: () => {
      toast.success("Investment updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["investments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["portfolio-summary"],
      });
    },

    onError: () => {
      toast.error("Failed to update investment");
    },
  });

  // =========================
  // Delete
  // =========================

  const deleteMutation = useMutation({
    mutationFn: deleteInvestment,

    onSuccess: () => {
      toast.success("Investment deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["investments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["portfolio-summary"],
      });
    },

    onError: () => {
      toast.error("Failed to delete investment");
    },
  });

  return {
    // Queries
    investments: investmentsQuery.data ?? [],
    investmentsLoading: investmentsQuery.isPending,
    investmentsError: investmentsQuery.error,

    portfolioSummary: summaryQuery.data,
    summaryLoading: summaryQuery.isPending,

    // Mutations
    createInvestment: createMutation.mutate,
    createInvestmentAsync: createMutation.mutateAsync,

    updateInvestment: updateMutation.mutate,
    updateInvestmentAsync: updateMutation.mutateAsync,

    deleteInvestment: deleteMutation.mutate,
    deleteInvestmentAsync: deleteMutation.mutateAsync,
  };
}