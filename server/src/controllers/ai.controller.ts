import type { Response } from "express";
import Expense from "../models/Expense.js";
import { generateExpenseInsights } from "../services/ai.service.js";
import { calculateFinancialHealth } from "../services/financialHealth.service.js";
import { calculatePrediction } from "../services/prediction.service.js";
import type { AuthRequest } from "../types/auth.types.js";
import { chatWithFinancialAI } from "../services/ai.service.js";

export const getExpenseInsights = async (req: AuthRequest, res: Response) => {
  try {
    const expenses = await Expense.find({
      user: req.user!.id,
    });

    // Totals
    const totalIncome = expenses
      .filter((item) => item.type === "Income")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = expenses
      .filter((item) => item.type === "Expense")
      .reduce((sum, item) => sum + item.amount, 0);

    const balance = totalIncome - totalExpense;

    // Financial Health
    const financialHealth = calculateFinancialHealth({
      totalIncome,
      totalExpense,
      balance,
    });

    // Monthly Trend
    const monthlyMap = new Map<
      number,
      {
        month: number;
        income: number;
        expense: number;
      }
    >();

    expenses.forEach((item) => {
      const month = new Date(item.date).getMonth() + 1;

      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, {
          month,
          income: 0,
          expense: 0,
        });
      }

      const current = monthlyMap.get(month)!;

      if (item.type === "Income") {
        current.income += item.amount;
      } else {
        current.expense += item.amount;
      }
    });

    const prediction = calculatePrediction(
      Array.from(monthlyMap.values()).sort((a, b) => a.month - b.month),
    );

    // Top Category
    const categoryTotals = new Map<string, number>();

    expenses
      .filter((item) => item.type === "Expense")
      .forEach((item) => {
        categoryTotals.set(
          item.category,
          (categoryTotals.get(item.category) ?? 0) + item.amount,
        );
      });

    const topCategory =
      [...categoryTotals.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ??
      "N/A";

    const insights = await generateExpenseInsights({
      expenses: expenses.slice(-10),
      financialHealth,
      prediction,
      topCategory,
    });

    return res.status(200).json({
      success: true,
      insights,
      financialHealth,
      prediction,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI insights",
    });
  }
};
export const chatWithAI = async (req: AuthRequest, res: Response) => {
  try {
    const { question, history = [] } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const expenses = await Expense.find({
      user: req.user!.id,
    });

    const totalIncome = expenses
      .filter((item) => item.type === "Income")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = expenses
      .filter((item) => item.type === "Expense")
      .reduce((sum, item) => sum + item.amount, 0);

    const balance = totalIncome - totalExpense;

    const financialHealth = calculateFinancialHealth({
      totalIncome,
      totalExpense,
      balance,
    });

    const monthlyMap = new Map<
      number,
      {
        month: number;
        income: number;
        expense: number;
      }
    >();

    expenses.forEach((item) => {
      const month = new Date(item.date).getMonth() + 1;

      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, {
          month,
          income: 0,
          expense: 0,
        });
      }

      const current = monthlyMap.get(month)!;

      if (item.type === "Income") {
        current.income += item.amount;
      } else {
        current.expense += item.amount;
      }
    });

    const prediction = calculatePrediction(
      Array.from(monthlyMap.values()).sort((a, b) => a.month - b.month),
    );

    const categoryTotals = new Map<string, number>();

    expenses
      .filter((item) => item.type === "Expense")
      .forEach((item) => {
        categoryTotals.set(
          item.category,
          (categoryTotals.get(item.category) ?? 0) + item.amount,
        );
      });

    const topCategory =
      [...categoryTotals.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ??
      "N/A";

    const answer = await chatWithFinancialAI(
      question,
      financialHealth,
      prediction,
      topCategory,
      expenses.slice(-10),
      history,
    );

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
};
