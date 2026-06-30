import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js"
import type { AuthRequest } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/profile",
  authMiddleware,
  (req: AuthRequest, res) => {
    res.json({
      success: true,
      message: "Protected Route",
      user: req.user,
    });
  }
);

export default router;