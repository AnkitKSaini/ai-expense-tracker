import { useRef, useState, useEffect } from "react";
import { Download } from "lucide-react";
import { toast } from "react-hot-toast";

import { useBackup } from "../../hooks/useBackup";
import RestorePreviewModal from "./RestorePreviewModal";
import BackupStats from "./BackupStats";
import BackupHistory from "./BackupHistory";

import { BACKUP_VERSION } from "../../constants/backup";
import { getBackupHistory } from "../../utils/backupHistory";

function BackupPage() {
  const { exportBackup, restoreBackup, restoring } = useBackup();
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<any>(null);

  useEffect(() => {
    const history = getBackupHistory();

    if (history.length === 0) {
      toast("You haven't created a backup yet.");
    }
  }, []);

  async function handleRestore(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const text = await file.text();

      const json = JSON.parse(text);

      // Version Check
      if (json.version !== BACKUP_VERSION) {
        toast.error("Unsupported backup version.");
        return;
      }

      // Validation
      if (!json.expenses || !json.goals || !json.investments) {
        toast.error("Invalid backup file.");
        return;
      }

      setPreview(json);
    } catch {
      toast.error("Invalid JSON file.");
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold dark:text-white">
          💾 Backup & Restore
        </h1>

        <p className="mt-2 text-gray-500">
          Export or restore your financial data.
        </p>
      </div>

      <button
        onClick={() => exportBackup()}
        className="flex w-full items-center justify-center gap-3 rounded-3xl bg-blue-600 p-8 text-xl font-semibold text-white transition hover:bg-blue-700"
      >
        <Download size={28} />
        Export Backup
      </button>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={async (e) => {
          e.preventDefault();

          const file = e.dataTransfer.files[0];

          if (!file) return;

          try {
            const text = await file.text();

            const json = JSON.parse(text);

            if (json.version !== BACKUP_VERSION) {
              toast.error("Unsupported backup version.");
              return;
            }

            if (!json.expenses || !json.goals || !json.investments) {
              toast.error("Invalid backup file.");
              return;
            }

            setPreview(json);
          } catch {
            toast.error("Invalid JSON file.");
          }
        }}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-3xl border-2 border-dashed border-blue-400 p-12 text-center transition hover:bg-blue-50 dark:hover:bg-blue-950/20"
      >
        <div className="text-6xl">📂</div>

        <h2 className="mt-4 text-xl font-bold dark:text-white">
          Drop Backup File Here
        </h2>

        <p className="mt-2 text-gray-500">or click to browse</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".json"
        onChange={handleRestore}
      />
      <BackupStats />
      <BackupHistory />

      {preview && (
        <RestorePreviewModal
          backup={preview}
          onCancel={() => setPreview(null)}
          onConfirm={async () => {
            try {
              if (restoring) return;

              await restoreBackup(preview);
              toast.success("Backup restored successfully.");

              setPreview(null);
            } catch {
              toast.error("Failed to restore backup.");
            }
          }}
        />
      )}
    </div>
  );
}

export default BackupPage;
