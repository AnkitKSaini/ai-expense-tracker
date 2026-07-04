import type { Response } from "express";
import Expense from "../models/Expense.js";
import { generateExpenseInsights } from "../services/ai.service.js";
import type { AuthRequest } from "../types/auth.types.js";
export const getExpenseInsights = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const expenses = await Expense.find({
      user: req.user!.id,
    });

    const insights = await generateExpenseInsights(expenses);

    return res.status(200).json({
      success: true,
      insights,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI insights",
    });
  }
};