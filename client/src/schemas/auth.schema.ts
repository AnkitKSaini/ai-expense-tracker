import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string()
      .email("Invalid email address"),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters",
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    },
  );

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
});

export const verifyOTPSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  otp: z
    .string()
    .length(
      6,
      "OTP must be 6 digits",
    )
    .regex(
      /^\d+$/,
      "OTP must contain only numbers",
    ),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters",
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    },
  );

export type RegisterFormData =
  z.infer<typeof registerSchema>;

export type LoginFormData =
  z.infer<typeof loginSchema>;

export type ForgotPasswordFormData =
  z.infer<typeof forgotPasswordSchema>;

export type VerifyOTPFormData =
  z.infer<typeof verifyOTPSchema>;

export type ResetPasswordFormData =
  z.infer<typeof resetPasswordSchema>;