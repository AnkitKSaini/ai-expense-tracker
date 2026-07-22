import { Router } from "express";

import {
  register,
  login,
  logout,
  me,
  refreshToken,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import  validate  from "../middleware/validate.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  register,
);

router.post(
  "/login",
  validate(loginSchema),
  login,
);

router.post(
  "/refresh-token",
  refreshToken,
);

router.post(
  "/logout",
  authMiddleware,
  logout,
);

router.get(
  "/me",
  authMiddleware,
  me,
);

export default router;