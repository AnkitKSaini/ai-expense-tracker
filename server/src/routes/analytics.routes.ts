import { Router } from "express";
import { getCategoryAnalytics } from "../controllers/analytics.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/category",
  authMiddleware,
  getCategoryAnalytics,
);

export default router;