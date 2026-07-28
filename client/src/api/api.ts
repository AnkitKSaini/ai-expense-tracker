import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

import type { ApiResponse } from "../types/api";
import type { AuthResponse } from "../types/auth";

import { getToken, saveToken, clearAuth } from "../utils/token";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  timeout: 30000,
});

let isRefreshing = false;

let refreshPromise: Promise<string> | null = null;

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    const authRoutes = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
      "/auth/verify-otp",
      "/auth/reset-password",
      "/auth/refresh-token",
    ];

    const isAuthRoute = authRoutes.some((route) =>
      originalRequest?.url?.includes(route),
    );

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          refreshPromise = api
            .post<ApiResponse<AuthResponse>>("/auth/refresh-token")
            .then((res) => {
              const token = res.data.data.accessToken;

              saveToken(token);

              return token;
            })
            .finally(() => {
              isRefreshing = false;
              refreshPromise = null;
            });
        }

        const accessToken = await refreshPromise!;

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        clearAuth();

        window.location.replace("/login");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
