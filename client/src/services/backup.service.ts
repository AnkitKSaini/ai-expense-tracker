import api from "../api/api";

import { addBackupHistory } from "../utils/backupHistory";
import { BACKUP_VERSION } from "../constants/backup";

export const backupService = {
  exportBackup: async () => {
    const response = await api.get(
      "/backup/export",
      {
        responseType: "blob",
      },
    );

    const url = window.URL.createObjectURL(
      response.data,
    );

    const link =
      document.createElement("a");

    link.href = url;

    link.download = `backup-${Date.now()}.json`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

    // Save Backup History
    addBackupHistory({
      id: crypto.randomUUID(),

      version: BACKUP_VERSION,

      exportedAt:
        new Date().toISOString(),

      expenses: 0,

      goals: 0,

      investments: 0,

      bills: 0,

      recurring: 0,
    });
  },

  restoreBackup: async (
    backup: unknown,
  ) => {
    return api.post(
      "/backup/restore",
      backup,
    );
  },
};