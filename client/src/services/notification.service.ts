import api from "../api/api";

import type { Notification } from "../types/notification";

export const notificationService = {
  getAll: async () => {
    const res = await api.get("/notifications");

    return res.data.data as Notification[];
  },

  markRead: async (id: string) => {
    const res = await api.put(`/notifications/${id}/read`);

    return res.data.data;
  },

  markAllRead: async () => {
    await api.put("/notifications/read-all");
  },

  delete: async (id: string) => {
    await api.delete(`/notifications/${id}`);
  },

  deleteRead: async () => {
    await api.delete("/notifications/read");
  },
};
