import { z } from "zod";

/* ---------------- Login ---------------- */

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/* ---------------- Register ---------------- */

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters"),

    email: z.string().trim().email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export type RegisterFormData = z.infer<typeof registerSchema>;

/* ---------------- Forgot Password ---------------- */

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
});

export type ForgotPasswordFormData = z.infer<
  typeof forgotPasswordSchema
>;

/* ---------------- Verify OTP ---------------- */

export const verifyOTPSchema = z.object({
  email: z.string().trim().email("Invalid email address"),

  otp: z
    .string()
    .trim()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type VerifyOTPFormData = z.infer<
  typeof verifyOTPSchema
>;

/* ---------------- Reset Password ---------------- */

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export type ResetPasswordFormData = z.infer<
  typeof resetPasswordSchema
>;