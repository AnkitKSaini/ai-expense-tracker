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