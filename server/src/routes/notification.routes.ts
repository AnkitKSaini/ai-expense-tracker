import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  getNotificationsController,
  markReadController,
  markAllReadController,
  deleteNotificationController,
  deleteReadController,
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", authMiddleware, getNotificationsController);

router.put("/:id/read", authMiddleware, markReadController);

router.put("/read-all", authMiddleware, markAllReadController);

router.delete("/:id", authMiddleware, deleteNotificationController);

router.delete("/read", authMiddleware, deleteReadController);

export default router;
