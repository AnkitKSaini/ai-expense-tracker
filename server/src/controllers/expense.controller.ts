import type { Response } from "express";
import Expense from "../models/Expense.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const createExpense = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  // Check if user exists
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const { title, amount, category, type, date } = req.body;

  const expense = await Expense.create({
    title,
    amount,
    category,
    type,
    date,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Expense created successfully",
    data: expense,
  });
};