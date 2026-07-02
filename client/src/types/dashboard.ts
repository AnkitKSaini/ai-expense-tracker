import type { Expense } from "./expense"

export interface CategoryWiseExpense {
  category: string;
  total: number;
}

export interface MonthlyExpense {
  month: number;
  total: number;
}

export interface DashboardSummary {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  totalTransactions: number;

  recentTransactions: Expense[];

  categoryWiseExpense: CategoryWiseExpense[];

  monthlyExpense: MonthlyExpense[];
}