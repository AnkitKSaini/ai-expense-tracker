import bcrypt from "bcrypt";
import User from "../models/User.js";

import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

import { generateOTP } from "../utils/otp.js";
import { sendOTPEmail } from "../utils/mail.js";

import type {
  RegisterDto,
  LoginDto,
  AuthResponse,
} from "../types/auth.types.js";

import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { PASSWORD_SALT_ROUNDS } from "../constants/auth.js";

import { env } from "../config/env.js";
import jwt from "jsonwebtoken";

import generatePasswordResetToken from "../utils/generatePasswordResetToken.js";

export const registerService = async (
  data: RegisterDto,
): Promise<AuthResponse> => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, PASSWORD_SALT_ROUNDS);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user.id);

  const refreshToken = generateRefreshToken(user.id);

  user.refreshToken = refreshToken;

  await user.save();

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const loginService = async (data: LoginDto): Promise<AuthResponse> => {

  const user = await User.findOne({
    email: data.email,
  });

  if (!user) {

    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user.id);

  const refreshToken = generateRefreshToken(user.id);

  user.refreshToken = refreshToken;

  await user.save();

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const logoutService = async (userId: string): Promise<void> => {
  await User.findByIdAndUpdate(userId, {
    refreshToken: "",
  });
};

export const getCurrentUser = async (userId: string) => {
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return user;
};

export const refreshTokenService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Refresh token missing");
  }

  const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as {
    userId: string;
  };

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "User not found");
  }

  if (user.refreshToken !== refreshToken) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid refresh token");
  }

  const accessToken = generateAccessToken(user.id);

  return {
    accessToken,
  };
};

export async function forgotPasswordService(email: string): Promise<void> {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "Invalid email address");
  }

  // Generate OTP
  const otp = generateOTP();

  // Hash OTP
  const hashedOTP = await bcrypt.hash(otp, PASSWORD_SALT_ROUNDS);

  // Save hashed OTP
  user.otp = hashedOTP;

  // OTP valid for 1 minute
  user.otpExpiry = new Date(Date.now() + 60 * 1000);

  await user.save();

  // Send original OTP to email
  await sendOTPEmail(user.email, user.name, otp);
}

export async function verifyOTPService(
  email: string,
  otp: string,
): Promise<{
  resetToken: string;
}> {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid OTP");
  }

  if (!user.otp || !user.otpExpiry) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "OTP not found");
  }

  if (user.otpExpiry < new Date()) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "OTP has expired");
  }

  const isValidOTP = await bcrypt.compare(otp, user.otp);

  if (!isValidOTP) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid OTP");
  }

  const resetToken = generatePasswordResetToken(user.id);

  user.passwordResetToken = resetToken;

  user.passwordResetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  return {
    resetToken,
  };
}

export async function resetPasswordService(
  resetToken: string,
  password: string,
): Promise<void> {
  if (!resetToken) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Reset token missing");
  }

  const decoded = jwt.verify(resetToken, env.JWT_PASSWORD_RESET_SECRET) as {
    userId: string;
  };

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  if (user.passwordResetToken !== resetToken) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid reset token");
  }

  if (
    !user.passwordResetTokenExpiry ||
    user.passwordResetTokenExpiry < new Date()
  ) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Reset token has expired");
  }

  const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

  user.password = hashedPassword;

  // Clear OTP
  user.otp = "";
  user.otpExpiry = undefined;

  // Clear Reset Token
  user.passwordResetToken = "";
  user.passwordResetTokenExpiry = undefined;

  // Logout all devices
  user.refreshToken = "";

  await user.save();
}
