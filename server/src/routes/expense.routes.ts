import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createExpense } from "../controllers/expense.controller.js";

const router = Router();

router.post("/", authMiddleware, createExpense);

export default router;