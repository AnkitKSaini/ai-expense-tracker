import type { FinancialHealthResult } from "./financialHealth.service.js";
import type { PredictionResult } from "./prediction.service.js";

interface PromptInput {
  financialHealth: FinancialHealthResult;
  prediction: PredictionResult;
  topCategory: string;
}

export function buildFinancialPrompt({
  financialHealth,
  prediction,
  topCategory,
}: PromptInput) {
  return `
You are an expert AI Financial Advisor.

Analyze the following financial data.

Financial Health Score:
${financialHealth.score}/100

Health Level:
${financialHealth.level}

Saving Rate:
${financialHealth.savingRate}%

Expense Ratio:
${financialHealth.expenseRatio}%

Budget Status:
${financialHealth.budgetStatus}

Risk Level:
${financialHealth.riskLevel}

Prediction

Expected Income:
₹${prediction.predictedIncome}

Expected Expense:
₹${prediction.predictedExpense}

Expected Savings:
₹${prediction.predictedSaving}

Trend:
${prediction.trend}

Highest Spending Category:
${topCategory}

Give response in this format:

1. Financial Summary

2. Problems

3. Opportunities

4. Recommendations

5. One motivational sentence.

Keep response under 250 words.
`;
}