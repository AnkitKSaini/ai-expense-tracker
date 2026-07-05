import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  exportExpensesCSV,
} from "../controllers/expense.controller.js";

const router = Router();

router.post("/", authMiddleware, createExpense);

router.get("/", authMiddleware, getExpenses);

router.get("/export/csv", authMiddleware, exportExpensesCSV);

router.get("/:id", authMiddleware, getExpenseById);

router.put("/:id", authMiddleware, updateExpense);

router.delete("/:id", authMiddleware, deleteExpense);

export default router;
