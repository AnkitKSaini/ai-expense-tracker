import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  createInvestment,
  getInvestments,
  getInvestmentById,
  updateInvestment,
  deleteInvestment,
  getPortfolioSummary,
} from "../controllers/investment.controller.js";

const router = Router();

// =========================
// Portfolio
// =========================

router.get(
  "/summary",
  authMiddleware,
  getPortfolioSummary,
);

// =========================
// CRUD
// =========================

router.post(
  "/",
  authMiddleware,
  createInvestment,
);

router.get(
  "/",
  authMiddleware,
  getInvestments,
);

router.get(
  "/:id",
  authMiddleware,
  getInvestmentById,
);

router.put(
  "/:id",
  authMiddleware,
  updateInvestment,
);

router.delete(
  "/:id",
  authMiddleware,
  deleteInvestment,
);

export default router;