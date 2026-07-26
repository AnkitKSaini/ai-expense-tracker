import api from "../api/api";

import type { ApiResponse } from "../types/api";
import type { RecurringTransaction } from "../types/recurring";

export const recurringService = {
  getAll: async (): Promise<RecurringTransaction[]> => {
    const { data } =
      await api.get<ApiResponse<RecurringTransaction[]>>(
        "/recurring",
      );

    return data.data;
  },

  create: async (
    recurring: Partial<RecurringTransaction>,
  ): Promise<RecurringTransaction> => {
    const { data } =
      await api.post<ApiResponse<RecurringTransaction>>(
        "/recurring",
        recurring,
      );

    return data.data;
  },

  update: async (
    id: string,
    recurring: Partial<RecurringTransaction>,
  ): Promise<RecurringTransaction> => {
    const { data } =
      await api.put<ApiResponse<RecurringTransaction>>(
        `/recurring/${id}`,
        recurring,
      );

    return data.data;
  },

  delete: async (
    id: string,
  ): Promise<void> => {
    await api.delete(
      `/recurring/${id}`,
    );
  },

  run: async (
    id: string,
  ): Promise<RecurringTransaction> => {
    const { data } =
      await api.post<ApiResponse<RecurringTransaction>>(
        `/recurring/${id}/run`,
      );

    return data.data;
  },
};