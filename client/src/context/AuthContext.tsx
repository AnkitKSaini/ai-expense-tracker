import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import api from "../api/api";
import type { ApiResponse } from "../types/api";

import type { User } from "../types/auth";

import { getToken, removeToken } from "../utils/token";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  checkAuth: () => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setLoading(true);

    try {
      const token = getToken();

      if (!token) {
        setUser(null);
        return;
      }

      const res = await api.get<ApiResponse<User>>("/auth/me");
      setUser(res.data.data);
    } catch {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Ignore logout API errors
    } finally {
      removeToken();
      setUser(null);
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,

      setUser,

      checkAuth,

      logout,
    }),
    [user, loading, checkAuth, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}
