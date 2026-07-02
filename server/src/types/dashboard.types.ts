export interface DashboardSummary {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  totalTransactions: number;
}

export interface CategoryExpense {
  category: string;
  total: number;
}

export interface MonthlyExpense {
  month: number;
  total: number;
}