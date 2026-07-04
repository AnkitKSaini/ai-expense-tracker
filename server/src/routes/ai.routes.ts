import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getExpenseInsights } from "../controllers/ai.controller.js";

const router = Router();

router.get("/insights", authMiddleware, getExpenseInsights);

export default router;