import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  createBudget,
  getBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budget.controller.js";
import { createBudgetSchema } from "../validators/budget.validator.js";

const router = Router();

router.post("/", authMiddleware, validate(createBudgetSchema), createBudget);

router.get("/", authMiddleware, getBudget);

router.put("/:id", authMiddleware, updateBudget);

router.delete("/:id", authMiddleware, deleteBudget);

export default router;
