import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  exportBackupController,
  restoreBackupController,
} from "../controllers/backup.controller.js";

const router = Router();

router.get("/export", authMiddleware, exportBackupController);

router.post("/restore", authMiddleware, restoreBackupController);

export default router;
