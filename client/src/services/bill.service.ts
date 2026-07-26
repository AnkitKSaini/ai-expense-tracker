import api from "../api/api";

import type { ApiResponse } from "../types/api";
import type { Bill } from "../types/bill";

export const billService = {
  getAll: async (): Promise<Bill[]> => {
    const { data } =
      await api.get<ApiResponse<Bill[]>>(
        "/bills",
      );

    return data.data;
  },

  create: async (
    bill: Partial<Bill>,
  ): Promise<Bill> => {
    const { data } =
      await api.post<ApiResponse<Bill>>(
        "/bills",
        bill,
      );

    return data.data;
  },

  update: async (
    id: string,
    bill: Partial<Bill>,
  ): Promise<Bill> => {
    const { data } =
      await api.put<ApiResponse<Bill>>(
        `/bills/${id}`,
        bill,
      );

    return data.data;
  },

  delete: async (
    id: string,
  ): Promise<void> => {
    await api.delete(
      `/bills/${id}`,
    );
  },

  pay: async (
    id: string,
  ): Promise<Bill> => {
    const { data } =
      await api.post<ApiResponse<Bill>>(
        `/bills/${id}/pay`,
      );

    return data.data;
  },
};