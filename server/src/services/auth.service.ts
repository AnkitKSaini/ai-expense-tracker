import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import type { LoginDto, RegisterDto } from "../types/auth.types.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const registerService = async (data: RegisterDto) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      "User already exists"
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginService = async (data: LoginDto) => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Invalid email or password"
    );
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isMatch) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Invalid email or password"
    );
  }

  const token = generateToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};