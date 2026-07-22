import bcrypt from "bcrypt";
import User from "../models/User.js";

import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

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


export const registerService = async (
  data: RegisterDto,
): Promise<AuthResponse> => {

  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      "User already exists",
    );
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    PASSWORD_SALT_ROUNDS,
  );

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  const accessToken =
    generateAccessToken(user.id);

  const refreshToken =
    generateRefreshToken(user.id);

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


export const loginService = async (
  data: LoginDto,
): Promise<AuthResponse> => {

  const user = await User.findOne({
    email: data.email,
  });

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Invalid email or password",
    );
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.password,
  );

  if (!isMatch) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Invalid email or password",
    );
  }

  const accessToken =
    generateAccessToken(user.id);

  const refreshToken =
    generateRefreshToken(user.id);

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


export const logoutService = async (
  userId: string,
): Promise<void> => {

  await User.findByIdAndUpdate(
    userId,
    {
      refreshToken: "",
    },
  );

};


export const getCurrentUser = async (
  userId: string,
) => {

  const user = await User.findById(
    userId,
  ).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "User not found",
    );
  }

  return user;
};


export const refreshTokenService = async (
  refreshToken: string,
) => {

  if (!refreshToken) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Refresh token missing",
    );
  }

  const decoded = jwt.verify(
    refreshToken,
    env.JWT_REFRESH_SECRET,
  ) as {
    userId: string;
  };

  const user = await User.findById(
    decoded.userId,
  );

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "User not found",
    );
  }

  if (
    user.refreshToken !== refreshToken
  ) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Invalid refresh token",
    );
  }

  const accessToken =
    generateAccessToken(user.id);

  return {
    accessToken,
  };
};