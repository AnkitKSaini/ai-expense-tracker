export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface VerifyOTPFormData {
  email: string;
  otp: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface VerifyOTPResponse {
  resetToken: string;
}

