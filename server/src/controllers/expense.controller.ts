import type { Response } from "express";

import type { AuthRequest } from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  createExpenseService,
  getExpensesService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,
  getCalendarExpensesService,
} from "../services/expense.service.js";

import { generateCSV } from "../export/csv.service.js";
import Expense from "../models/Expense.js";
import { generatePDF } from "../export/pdf/pdf.service.js";
import User from "../models/User.js";


// =====================
// Create Expense
// =====================
export const createExpense = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const expense = await createExpenseService(req.body, req.user!.id);

    res
      .status(201)
      .json(new ApiResponse(true, "Expense created successfully", expense));
  },
);

// =====================
// Get All Expenses
// =====================
export const getExpenses = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const {
      search = "",
      category = "",
      sort = "latest",
      page = "1",
      limit = "10",
    } = req.query;

    const expenses = await getExpensesService(
      req.user!.id,
      search as string,
      category as string,
      sort as string,
      Number(page),
      Number(limit),
    );

    res
      .status(200)
      .json(new ApiResponse(true, "Expenses fetched successfully", expenses));
  },
);

// =====================
// Get Expense By ID
// =====================

export const getExpenseById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const expense = await getExpenseByIdService(req.params.id!, req.user!.id);

    res
      .status(200)
      .json(new ApiResponse(true, "Expense fetched successfully", expense));
  },
);

export const updateExpense = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const expense = await updateExpenseService(
      req.params.id!,
      req.user!.id,
      req.body,
    );

    res
      .status(200)
      .json(new ApiResponse(true, "Expense updated successfully", expense));
  },
);

// ============================
// Delete Expense
// ============================
export const deleteExpense = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    await deleteExpenseService(req.params.id!, req.user!.id);

    res.status(200).json(new ApiResponse(true, "Expense deleted successfully"));
  },
);


export const exportExpensesCSV = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const expenses = await Expense.find({
      user: req.user!.id,
    }).lean();

    const csv = generateCSV(expenses);

    res.setHeader("Content-Type", "text/csv");

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="expenses.csv"'
    );

    res.send(csv);
  }
);


export const exportExpensesPDF = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    // User
    const user = await User.findById(req.user!.id).select(
      "name email"
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });

      return;
    }

    // Expenses
    const expenses = await Expense.find({
      user: req.user!.id,
    }).lean();

    // Summary
    const income = expenses
      .filter((e) => e.type === "income")
      .reduce((sum, e) => sum + e.amount, 0);

    const expense = expenses
      .filter((e) => e.type === "expense")
      .reduce((sum, e) => sum + e.amount, 0);

    // Generate PDF
    const pdf = await generatePDF(
      {
        name: user.name,
        email: user.email,
      },
      expenses,
      {
        income,
        expense,
      }
    );

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="expense-report.pdf"'
    );

    res.send(pdf);
  }
);

export const getCalendarExpenses = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const month = Number(req.query.month);

    const year = Number(req.query.year);

    const expenses =
      await getCalendarExpensesService(
        req.user!.id,
        month,
        year,
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Calendar expenses fetched successfully",
        expenses,
      ),
    );
  },
);