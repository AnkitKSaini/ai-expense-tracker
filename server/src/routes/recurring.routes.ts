import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import { recurringTransactionSchema } from "../validators/recurring.validator.js";

import {
  createRecurringTransaction,
  getRecurringTransactions,
  updateRecurringTransaction,
  deleteRecurringTransaction,
  runRecurringTransaction,
} from "../controllers/recurring.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(recurringTransactionSchema),
  createRecurringTransaction,
);

router.get("/", authMiddleware, getRecurringTransactions);

router.put("/:id", authMiddleware, updateRecurringTransaction);

router.delete("/:id", authMiddleware, deleteRecurringTransaction);

router.post("/:id/run", authMiddleware, runRecurringTransaction);

export default router;
