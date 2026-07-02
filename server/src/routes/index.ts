import { Router } from "express";

import authRoutes from "./auth.routes.js";
import expenseRoutes from "./expense.routes.js";
import userRoutes from "./user.routes.js";
import dashboardRoutes from "./dashboard.routes.js";


const router = Router();

router.use("/auth", authRoutes);
router.use("/expenses", expenseRoutes);
router.use("/user", userRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;