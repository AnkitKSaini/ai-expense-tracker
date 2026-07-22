import api from "../api/api";
import type {
  RegisterFormData,
  LoginFormData,
} from "../types/auth";

export const authService = {
  register: (data: RegisterFormData) =>
    api.post("/auth/register", data),

  login: (data: LoginFormData) =>
    api.post("/auth/login", data),

  me: () =>
    api.get("/auth/me"),

  logout: () =>
    api.post("/auth/logout"),

  refreshToken: () =>
    api.post("/auth/refresh-token"),
};