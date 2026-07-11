import { Router } from "express";

import authRoutes from "./auth.routes.js";
import expenseRoutes from "./expense.routes.js";
import userRoutes from "./user.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import budgetRoutes from "./budget.routes.js";
import aiRoutes from "./ai.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import investmentRoutes from "./investment.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/expenses", expenseRoutes);
router.use("/user", userRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/budget", budgetRoutes);
router.use("/ai", aiRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/investments", investmentRoutes);

export default router;