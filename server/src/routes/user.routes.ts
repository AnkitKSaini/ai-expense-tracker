import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { upload } from "../middleware/upload.middleware.js";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", authMiddleware, upload.single("avatar"), updateProfile);

router.put("/change-password", authMiddleware, changePassword);
export default router;
