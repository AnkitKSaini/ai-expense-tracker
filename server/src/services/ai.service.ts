import { ai } from "../ai/gemini.js";

interface ExpenseSummary {
  category: string;
  amount: number;
  type: string;
  date: Date | string;
}

interface AIInsightInput {
  expenses: ExpenseSummary[];
  financialHealth: unknown;
  prediction: unknown;
  topCategory: string;
}

export async function generateExpenseInsights({
  expenses,
  financialHealth,
  prediction,
  topCategory,
}: AIInsightInput) {
  // Sirf last 10 expenses bhejo
  const recentExpenses = expenses.slice(-10).map((expense) => ({
    category: expense.category,
    amount: expense.amount,
    type: expense.type,
    date: expense.date,
  }));

  const prompt = `
You are a Senior AI Financial Advisor.

Analyze the user's financial summary and provide concise actionable advice.

Financial Health:
${JSON.stringify(financialHealth)}

Prediction:
${JSON.stringify(prediction)}

Highest Spending Category:
${topCategory}

Last 10 Transactions:
${JSON.stringify(recentExpenses)}

Return your response in Markdown.

## 📊 Financial Summary
(2-3 bullet points)

## ⚠ Problems
(Max 3 points)

## 💰 Saving Opportunities
(Max 3 points)

## 📈 Forecast
(Short paragraph)

## 🎯 Top 5 Recommendations

## 🌟 Motivation
(One short motivational sentence)

Keep the response under 250 words.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

export interface ChatHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export async function chatWithFinancialAI(
  question: string,
  financialHealth: unknown,
  prediction: unknown,
  topCategory: string,
  expenses: ExpenseSummary[],
  history: ChatHistoryMessage[] = [],
) 


{
  const recentExpenses = expenses.slice(-10).map((expense) => ({
    category: expense.category,
    amount: expense.amount,
    type: expense.type,
    date: expense.date,
  }));

  const prompt = `
You are an expert AI Financial Advisor.

The user asked:
Conversation History:

${history
  .map((msg) => `${msg.role}: ${msg.content}`)
  .join("\n")}
  
"${question}"

Here is the user's financial data.

Financial Health:
${JSON.stringify(financialHealth)}

Prediction:
${JSON.stringify(prediction)}

Highest Spending Category:
${topCategory}

Recent Transactions:
${JSON.stringify(recentExpenses)}

Instructions:

- Answer ONLY the user's question.
- Use the financial data provided.
- Give personalized advice.
- Keep the answer under 200 words.
- Use markdown.
- If relevant, mention savings, prediction and financial health.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}