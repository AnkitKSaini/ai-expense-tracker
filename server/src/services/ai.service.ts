import { ai } from "../ai/gemini.js";

export async function generateExpenseInsights(expenses: unknown[]) {
  const prompt = `
You are an expert financial advisor.

Analyze the following expense data:

${JSON.stringify(expenses, null, 2)}

Return your response in this format:

1. Spending Summary
2. Highest Spending Category
3. Top 3 Saving Tips
4. Financial Health Score (out of 10)
5. Overall Recommendation
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}