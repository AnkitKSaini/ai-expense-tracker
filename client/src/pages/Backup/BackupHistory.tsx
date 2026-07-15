import { getBackupHistory } from "../../utils/backupHistory";

function BackupHistory() {
  const history =
    getBackupHistory();

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        Backup History
      </h2>

      {history.length === 0 ? (

        <p className="text-gray-500">
          No backups found.
        </p>

      ) : (

        <div className="space-y-4">

          {history.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border p-4 dark:border-gray-700"
            >
              <div>

                <h3 className="font-semibold dark:text-white">
                  Version {item.version}
                </h3>

                <p className="text-sm text-gray-500">
                  {new Date(
                    item.exportedAt,
                  ).toLocaleString("en-IN")}
                </p>

              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                Exported
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default BackupHistory;