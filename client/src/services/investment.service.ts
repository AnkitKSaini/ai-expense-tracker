import api from "../api/api";

import type {
  Investment,
  InvestmentFormData,
  PortfolioSummary,
} from "../types/investment";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ========================
// Get All Investments
// ========================

export const getInvestments = async () => {
  const response =
    await api.get<
      ApiResponse<Investment[]>
    >("/investments");

  return response.data.data;
};

// ========================
// Get Investment By Id
// ========================

export const getInvestmentById =
  async (id: string) => {
    const response =
      await api.get<
        ApiResponse<Investment>
      >(`/investments/${id}`);

    return response.data.data;
  };

// ========================
// Create Investment
// ========================

export const createInvestment =
  async (
    data: InvestmentFormData,
  ) => {
    const response =
      await api.post<
        ApiResponse<Investment>
      >("/investments", data);

    return response.data.data;
  };

// ========================
// Update Investment
// ========================

export const updateInvestment =
  async (
    id: string,
    data: Partial<InvestmentFormData>,
  ) => {
    const response =
      await api.put<
        ApiResponse<Investment>
      >(
        `/investments/${id}`,
        data,
      );

    return response.data.data;
  };

// ========================
// Delete Investment
// ========================

export const deleteInvestment =
  async (id: string) => {
    await api.delete(
      `/investments/${id}`,
    );
  };

// ========================
// Portfolio Summary
// ========================

export const getPortfolioSummary =
  async () => {
    const response =
      await api.get<
        ApiResponse<PortfolioSummary>
      >("/investments/summary");

    return response.data.data;
  };