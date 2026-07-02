import { useAuthContext } from "../context/AuthContext";

/**
 * Custom hook for accessing authentication context.
 *
 * Usage:
 * const { user, login, logout, isAuthenticated } = useAuth();
 */
export function useAuth() {
  return useAuthContext();
}