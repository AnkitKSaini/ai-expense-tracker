import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
} from "../controllers/expense.controller.js";

const router = Router();


router.post("/", authMiddleware, createExpense);

router.get("/", authMiddleware, getExpenses);

router.get("/:id", authMiddleware, getExpenseById);

router.put("/:id", authMiddleware, updateExpense);

export default router;