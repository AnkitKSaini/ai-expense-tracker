import type { Response } from "express";
import Expense from "../models/Expense.js";
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

// =====================
// Create Expense
// =====================
export const createExpense = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const expense = await createExpenseService(
      req.body,
      req.user!.id
    );

    res.status(201).json(
      new ApiResponse(
        true,
        "Expense created successfully",
        expense
      )
    );
  }
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

const expenses =
 await getExpensesService(
  req.user!.id,
  search as string,
  category as string,
  sort as string,
  Number(page),
  Number(limit)
);



    res.status(200).json(
      new ApiResponse(
        true,
        "Expenses fetched successfully",
        expenses
      )
    );
  }
);

// =====================
// Get Expense By ID
// =====================
 
export const getExpenseById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const expense = await getExpenseByIdService(
      req.params.id!,
      req.user!.id
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Expense fetched successfully",
        expense
      )
    );
  }
);

  export const updateExpense = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const expense = await updateExpenseService(
      req.params.id!,
      req.user!.id,
      req.body
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Expense updated successfully",
        expense
      )
    );
  }
);

    // ============================
// Delete Expense
// ============================
export const deleteExpense = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    await deleteExpenseService(
      req.params.id!,
      req.user!.id
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Expense deleted successfully"
      )
    );
  }
);
