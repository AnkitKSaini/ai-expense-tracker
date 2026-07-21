import api from "../api/api";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/auth";

export const login = async (
  data: LoginRequest,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);

  return res.data.data;
};

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", data);

  return res.data.data;
};