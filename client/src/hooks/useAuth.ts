import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useAuthContext } from "../context/AuthContext";
import { authService } from "../services/auth.service";

import { saveToken } from "../utils/token";
import { saveResetToken } from "../utils/resetToken";

import type { ApiErrorResponse } from "../types/api";

import type {
  ForgotPasswordFormData,
  VerifyOTPFormData,
} from "../schemas/auth.schema";

export function useAuth() {
  return useAuthContext();
}

export function useLogin() {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: authService.login,

    onSuccess: (res) => {
      saveToken(res.data.data.accessToken);
      setUser(res.data.data.user);

      toast.success("Login successful");
    },

    onError: (
      error: AxiosError<ApiErrorResponse>,
    ) => {
      toast.error(
        error.response?.data?.message ??
          "Login failed",
      );
    },
  });
}

export function useRegister() {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: authService.register,

    onSuccess: (res) => {
      saveToken(res.data.data.accessToken);
      setUser(res.data.data.user);

      toast.success(
        "Account created successfully",
      );
    },

    onError: (
      error: AxiosError<ApiErrorResponse>,
    ) => {
      toast.error(
        error.response?.data?.message ??
          "Registration failed",
      );
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (
      data: ForgotPasswordFormData,
    ) => authService.forgotPassword(data),

    onSuccess: (res) => {
      toast.success(
        res.data.message ??
          "Verification code sent successfully",
      );
    },

    onError: (
      error: AxiosError<ApiErrorResponse>,
    ) => {
      toast.error(
        error.response?.data?.message ??
          "Failed to send verification code",
      );
    },
  });
}

export function useVerifyOTP() {
  return useMutation({
    mutationFn: (
      data: VerifyOTPFormData,
    ) => authService.verifyOTP(data),

    onSuccess: (res) => {
      saveResetToken(
        res.data.data.resetToken,
      );

      toast.success(
        "OTP verified successfully",
      );
    },

    onError: (
      error: AxiosError<ApiErrorResponse>,
    ) => {
      toast.error(
        error.response?.data?.message ??
          "OTP verification failed",
      );
    },
  });
}

export function useResetPassword() {
  return useMutation({
   mutationFn: ({
  resetToken,
  password,
}: {
  resetToken: string;
  password: string;
}) =>
  authService.resetPassword(
    resetToken,
    password,
  ),

    onSuccess: () => {
      toast.success(
        "Password reset successfully",
      );
    },

    onError: (
      error: AxiosError<ApiErrorResponse>,
    ) => {
      toast.error(
        error.response?.data?.message ??
          "Password reset failed",
      );
    },
  });
}