import type { Expense } from "./expense"

export interface CategoryWiseExpense {
  category: string;
  total: number;
}

export interface MonthlyExpense {
  month: number;
  total: number;
}

export interface IncomeExpenseTrend {
  month: number;
  income: number;
  expense: number;
}

export interface FinancialHealth {
  score: number;

  level:
    | "Excellent"
    | "Good"
    | "Average"
    | "Poor";

  savingRate: number;

  expenseRatio: number;

  budgetStatus:
    | "Safe"
    | "Warning"
    | "Critical";

  investmentReady: boolean;

  emergencyFund:
    | "Good"
    | "Average"
    | "Poor";

  aiConfidence: number;

  riskScore: number;

riskLevel: "Low" | "Medium" | "High";

  message: string;
}

export interface Prediction {
  predictedExpense: number;
  predictedIncome: number;
  predictedSaving: number;
  confidence: number;
  trend: "Increasing" | "Stable" | "Decreasing";
}

export interface DashboardSummary {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  totalTransactions: number;

  recentTransactions: Expense[];

  categoryWiseExpense: CategoryWiseExpense[];

  monthlyExpense: MonthlyExpense[];

  incomeExpenseTrend: IncomeExpenseTrend[];

  financialHealth: FinancialHealth;

  prediction: Prediction;

}

