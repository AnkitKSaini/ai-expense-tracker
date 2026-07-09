interface FinancialHealthInput {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface FinancialHealthResult {
  score: number;
  level: "Excellent" | "Good" | "Average" | "Poor";

  savingRate: number;
  expenseRatio: number;

  budgetStatus: "Safe" | "Warning" | "Critical";

  investmentReady: boolean;

  emergencyFund: "Good" | "Average" | "Poor";

  aiConfidence: number;

  riskScore: number;

riskLevel: "Low" | "Medium" | "High";

  message: string;
}

export function calculateFinancialHealth({
  totalIncome,
  totalExpense,
  balance,
}: FinancialHealthInput): FinancialHealthResult {

  const savingRate =
    totalIncome > 0
      ? ((balance / totalIncome) * 100)
      : 0;

  const expenseRatio =
    totalIncome > 0
      ? ((totalExpense / totalIncome) * 100)
      : 100;

  let score = 0;

  // Saving Rate (40 points)
  if (savingRate >= 50) score += 40;
  else if (savingRate >= 30) score += 30;
  else if (savingRate >= 15) score += 20;
  else score += 10;

  // Expense Ratio (40 points)
  if (expenseRatio <= 50) score += 40;
  else if (expenseRatio <= 70) score += 30;
  else if (expenseRatio <= 90) score += 20;
  else score += 10;

  // Positive Balance (20 points)
  if (balance >= 0) {
    score += 20;
  }

  let level: FinancialHealthResult["level"];
  let message: string;

  if (score >= 85) {
    level = "Excellent";
    message = "Your financial health is excellent. Keep investing and saving.";
  } else if (score >= 70) {
    level = "Good";
    message = "You are managing your finances well.";
  } else if (score >= 50) {
    level = "Average";
    message = "Your finances are stable, but there is room for improvement.";
  } else {
    level = "Poor";
    message = "Your expenses are too high. Focus on improving savings.";
  }

  const budgetStatus =
  expenseRatio <= 70
    ? "Safe"
    : expenseRatio <= 90
    ? "Warning"
    : "Critical";

const investmentReady =
  savingRate >= 30;

const emergencyFund =
  savingRate >= 40
    ? "Good"
    : savingRate >= 20
    ? "Average"
    : "Poor";

const aiConfidence = Math.min(
  98,
  Math.max(70, score + 5)
);

let riskScore = Math.round(expenseRatio);

if (balance < 0) {
  riskScore = 100;
}

const riskLevel =
  riskScore <= 40
    ? "Low"
    : riskScore <= 70
    ? "Medium"
    : "High";

return {
  score,
  level,

  savingRate: Number(
    savingRate.toFixed(1)
  ),

  expenseRatio: Number(
    expenseRatio.toFixed(1)
  ),

  budgetStatus,

  investmentReady,

  emergencyFund,

  aiConfidence,

  riskScore,

riskLevel,

  message,
};
}