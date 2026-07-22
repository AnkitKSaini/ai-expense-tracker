import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useAuthContext } from "../context/AuthContext";
import { authService } from "../services/auth.service";
import { saveToken } from "../utils/token";

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

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
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

      toast.success("Account created successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Registration failed",
      );
    },
  });
}