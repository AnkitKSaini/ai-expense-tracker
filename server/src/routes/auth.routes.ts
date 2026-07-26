import { Router } from "express";

import {
  register,
  login,
  logout,
  me,
  refreshToken,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import validate from "../middleware/validate.middleware.js";

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOTPSchema,
  resetPasswordSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);

router.post("/verify-otp", validate(verifyOTPSchema), verifyOTP);

router.post("/reset-password", validate(resetPasswordSchema), resetPassword);

router.post("/refresh-token", refreshToken);

router.post("/logout", authMiddleware, logout);

router.get("/me", authMiddleware, me);

export default router;
