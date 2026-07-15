export interface BackupHistory {
  id: string;

  version: string;

  exportedAt: string;

  expenses: number;

  goals: number;

  investments: number;

  bills: number;

  recurring: number;
}