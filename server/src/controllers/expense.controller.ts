import type { Response } from "express";
import Expense from "../models/Expense.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import {
  getExpensesService,
  getExpenseByIdService,
} from "../services/expense.service.js";

import { updateExpenseService } from "../services/expense.service.js";

// =====================
// Create Expense
// =====================
export const createExpense = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
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

// =====================
// Get All Expenses
// =====================
export const getExpenses = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const expenses = await getExpensesService(req.user.id);

  res.status(200).json({
    success: true,
    message: "Expenses fetched successfully",
    data: expenses,
  });
};

// =====================
// Get Expense By ID
// =====================
export const getExpenseById = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const expenseId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  if (!expenseId) {
    res.status(400).json({
      success: false,
      message: "Expense ID is required",
    });
    return;
  }

  const expense = await getExpenseByIdService(expenseId, req.user.id);

  if (!expense) {
    res.status(404).json({
      success: false,
      message: "Expense not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Expense fetched successfully",
    data: expense,
  });
};

export const updateExpense = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const updatedExpense = await updateExpenseService(
    req.params.id as string,
    req.user.id,
    req.body,
  );

  if (!updatedExpense) {
    res.status(404).json({
      success: false,
      message: "Expense not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Expense updated successfully",
    data: updatedExpense,
  });
};
