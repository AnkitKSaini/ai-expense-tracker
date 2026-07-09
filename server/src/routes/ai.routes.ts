import { Router } from "express";
import { getExpenseInsights,chatWithAI } from "../controllers/ai.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/insights", authMiddleware, getExpenseInsights);

router.post(
  "/chat",
  authMiddleware,
  chatWithAI,
);

export default router;