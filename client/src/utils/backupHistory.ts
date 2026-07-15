import type { BackupHistory } from "../types/backup";

const KEY = "backup-history";

export function getBackupHistory() {
  const data = localStorage.getItem(KEY);

  return data
    ? (JSON.parse(data) as BackupHistory[])
    : [];
}

export function addBackupHistory(
  backup: BackupHistory,
) {
  const history =
    getBackupHistory();

  history.unshift(backup);

  localStorage.setItem(
    KEY,
    JSON.stringify(
      history.slice(0, 10),
    ),
  );
}