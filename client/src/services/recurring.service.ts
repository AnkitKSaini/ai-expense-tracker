import api from "../api/api";

import type { RecurringTransaction } from "../types/recurring";

export const recurringService = {
  getAll: async () => {
    const res = await api.get("/recurring");

    return res.data.data as RecurringTransaction[];
  },

  create: async (
    data: Partial<RecurringTransaction>,
  ) => {
    const res = await api.post(
      "/recurring",
      data,
    );

    return res.data.data;
  },

  update: async (
    id: string,
    data: Partial<RecurringTransaction>,
  ) => {
    const res = await api.put(
      `/recurring/${id}`,
      data,
    );

    return res.data.data;
  },

  delete: async (id: string) => {
    await api.delete(
      `/recurring/${id}`,
    );
  },

  run: async (id: string) => {
    const res = await api.post(
      `/recurring/${id}/run`,
    );

    return res.data.data;
  },
};