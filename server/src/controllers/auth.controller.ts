import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import type { AuthRequest } from "../types/auth.types.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

import {
  registerService,
  loginService,
  logoutService,
  getCurrentUser,
  refreshTokenService,
  forgotPasswordService,
  verifyOTPService,
  resetPasswordService,
} from "../services/auth.service.js";

import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from "../utils/cookie.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await registerService(req.body);

  setRefreshTokenCookie(res, result.refreshToken);

  res
    .status(201)
    .json(new ApiResponse(true, "Registration successful", result));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginService(req.body);

  setRefreshTokenCookie(res, result.refreshToken);

  res.status(200).json(new ApiResponse(true, "Login successful", result));
});

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  await logoutService(req.user!.id);

  clearRefreshTokenCookie(res);

  res.status(200).json(new ApiResponse(true, "Logout successful", null));
});

export const me = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await getCurrentUser(req.user!.id);

  res.status(200).json(new ApiResponse(true, "Current user", user));
});
export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    const result = await refreshTokenService(token);

    res
      .status(200)
      .json(new ApiResponse(true, "Access token refreshed", result));
  },
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    await forgotPasswordService(req.body.email);

    res.status(200).json(new ApiResponse(true, "OTP sent successfully.", null));
  },
);

export const verifyOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const result = await verifyOTPService(email, otp);

  res
    .status(200)
    .json(new ApiResponse(true, "OTP verified successfully", result));
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, password } = req.body;

  await resetPasswordService(resetToken, password);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Password reset successfully",
  });
});
