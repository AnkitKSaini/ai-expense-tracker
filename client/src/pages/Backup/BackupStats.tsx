import { getBackupHistory } from "../../utils/backupHistory";

function BackupStats() {
  const history =
    getBackupHistory();

  const latest =
    history[0];

  return (
    <div className="grid gap-6 md:grid-cols-3">

      <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

        <p className="text-gray-500">
          Total Backups
        </p>

        <h2 className="mt-3 text-3xl font-bold dark:text-white">
          {history.length}
        </h2>

      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

        <p className="text-gray-500">
          Latest Version
        </p>

        <h2 className="mt-3 text-3xl font-bold dark:text-white">
          {latest?.version ?? "-"}
        </h2>

      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

        <p className="text-gray-500">
          Last Backup
        </p>

        <h2 className="mt-3 text-lg font-bold dark:text-white">
          {latest
            ? new Date(
                latest.exportedAt,
              ).toLocaleDateString(
                "en-IN",
              )
            : "-"}
        </h2>

      </div>

    </div>
  );
}

export default BackupStats;