import api from "../api/api";

import type { ApiResponse } from "../types/api";

import type {
  User,
  AuthResponse,
  VerifyOTPResponse,
} from "../types/auth";

import type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  VerifyOTPFormData,
} from "../schemas/auth.schema";

export const authService = {
  register: (data: RegisterFormData) =>
    api.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      data,
    ),

  login: (data: LoginFormData) =>
    api.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      data,
    ),

  logout: () =>
    api.post<ApiResponse<null>>(
      "/auth/logout",
    ),

  me: () =>
    api.get<ApiResponse<User>>(
      "/auth/me",
    ),

  refreshToken: () =>
    api.post<ApiResponse<AuthResponse>>(
      "/auth/refresh-token",
    ),

  forgotPassword: (
    data: ForgotPasswordFormData,
  ) =>
    api.post<ApiResponse<null>>(
      "/auth/forgot-password",
      data,
    ),

  verifyOTP: (
    data: VerifyOTPFormData,
  ) =>
    api.post<ApiResponse<VerifyOTPResponse>>(
      "/auth/verify-otp",
      data,
    ),

 resetPassword: (
  resetToken: string,
  password: string,
) =>
  api.post<ApiResponse<null>>(
    "/auth/reset-password",
    {
      resetToken,
      password,
    },
  ),
};