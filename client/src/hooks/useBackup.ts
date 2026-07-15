import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { backupService } from "../services/backup.service";

export function useBackup() {
  const exportBackup = useMutation({
    mutationFn: backupService.exportBackup,

    onSuccess() {
      toast.success(
        "Backup downloaded successfully.",
      );
    },

    onError(error) {
      console.error(error);

      toast.error(
        "Backup operation failed.",
      );
    },
  });

  const restoreBackup = useMutation({
    mutationFn: backupService.restoreBackup,

    onSuccess() {
      toast.success(
        "Backup restored successfully.",
      );
    },

    onError(error) {
      console.error(error);

      toast.error(
        "Backup operation failed.",
      );
    },
  });

  return {
    exportBackup:
      exportBackup.mutateAsync,

    restoreBackup:
      restoreBackup.mutateAsync,

    exporting:
      exportBackup.isPending,

    restoring:
      restoreBackup.isPending,
  };
}