import type { Response } from "express";
import Expense from "../models/Expense.js";
//import PDFDocument from "pdfkit";

import type { AuthRequest } from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  createExpenseService,
  getExpensesService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,
} from "../services/expense.service.js";

//import { generateExpenseCSV } from "../utils/csv/expenseCsv.js";
//import { generateExpensePDF } from "../utils/pdf/expensePdf.js";

import User from "../models/User.js"
import { generatePDF } from "../../pdf/pdf.service.js";

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
  })

export const exportExpensesPDF = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req.user!.id).select(
      "name email"
    );

    if (!user) {
      res.status(404).json(
        new ApiResponse(false, "User not found")
      );
      return;
    }

    const expenses = await Expense.find({
      user: req.user!.id,
    }).lean();

    const totalIncome = expenses
      .filter((e) => e.type === "income")
      .reduce((sum, e) => sum + e.amount, 0);

    const totalExpense = expenses
      .filter((e) => e.type === "expense")
      .reduce((sum, e) => sum + e.amount, 0);

    const pdf = await generatePDF(
      user,
      expenses,
      totalIncome,
      totalExpense
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
)



