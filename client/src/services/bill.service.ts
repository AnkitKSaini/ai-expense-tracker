import api from "../api/api";

import type { Bill } from "../types/bill";

export const billService = {
  getAll: async () => {
    const res =
      await api.get("/bills");

    return res.data.data as Bill[];
  },

  create: async (
    data: Partial<Bill>,
  ) => {
    const res =
      await api.post(
        "/bills",
        data,
      );

    return res.data.data;
  },

  update: async (
    id: string,
    data: Partial<Bill>,
  ) => {
    const res =
      await api.put(
        `/bills/${id}`,
        data,
      );

    return res.data.data;
  },

  delete: async (
    id: string,
  ) => {
    await api.delete(
      `/bills/${id}`,
    );
  },

  pay: async (
    id: string,
  ) => {
    const res =
      await api.post(
        `/bills/${id}/pay`,
      );

    return res.data.data;
  },
};