import { useAuthContext } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import * as authService from "../services/auth.service";
/**
 * Custom hook for accessing authentication context.
 *
 * Usage:
 * const { user, login, logout, isAuthenticated } = useAuth();
 */
export function useAuth() {
  return useAuthContext();
}

export function useLogin() {
  return useMutation({ mutationFn: authService.login });
}
export function useRegister() {
  return useMutation({ mutationFn: authService.register });
}
