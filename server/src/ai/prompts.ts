export const expenseAnalysisPrompt = (
  expenses: unknown
) => `
You are a financial advisor.

Analyze the following expense data.

Return:

1. Spending Summary

2. Saving Suggestions

3. Overspending Areas

4. Budget Advice

Expenses:

${JSON.stringify(expenses)}
`;