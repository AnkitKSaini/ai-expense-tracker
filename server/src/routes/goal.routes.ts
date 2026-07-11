import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller.js";

import { createGoalSchema } from "../validators/goal.validator.js";

import { predictGoalAI } from "../controllers/goal.controller.js"

const router = Router();

router.post("/", authMiddleware, validate(createGoalSchema), createGoal);

router.post(
  "/predict",
  authMiddleware,
  predictGoalAI,
);

router.get("/", authMiddleware, getGoals);

router.put("/:id", authMiddleware, updateGoal);

router.delete("/:id", authMiddleware, deleteGoal);

export default router;
