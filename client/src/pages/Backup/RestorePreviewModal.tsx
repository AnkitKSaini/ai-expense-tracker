interface BackupPreview {
  version: string;
  exportedAt: string;

  expenses: unknown[];
  goals: unknown[];
  investments: unknown[];
  bills: unknown[];
  recurring: unknown[];
  notifications: unknown[];
}

interface Props {
  backup: BackupPreview;
  onConfirm: () => void;
  onCancel: () => void;
}

function RestorePreviewModal({
  backup,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl dark:bg-gray-900">

        <h2 className="text-2xl font-bold dark:text-white">
          Restore Backup
        </h2>

        <p className="mt-2 text-gray-500">
          Please verify the backup before restoring.
        </p>

        <div className="mt-8 space-y-4">

          <div className="flex justify-between">
            <span>Version</span>
            <strong>{backup.version}</strong>
          </div>

          <div className="flex justify-between">
            <span>Expenses</span>
            <strong>{backup.expenses.length}</strong>
          </div>

          <div className="flex justify-between">
            <span>Goals</span>
            <strong>{backup.goals.length}</strong>
          </div>

          <div className="flex justify-between">
            <span>Investments</span>
            <strong>{backup.investments.length}</strong>
          </div>

          <div className="flex justify-between">
            <span>Bills</span>
            <strong>{backup.bills.length}</strong>
          </div>

          <div className="flex justify-between">
            <span>Recurring</span>
            <strong>{backup.recurring.length}</strong>
          </div>

        </div>

        <div className="mt-10 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="rounded-xl border px-5 py-3"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-3 text-white"
          >
            Restore
          </button>

        </div>

      </div>

    </div>
  );
}

export default RestorePreviewModal;