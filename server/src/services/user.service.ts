import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getProfileService = async (userId: string) => {
  return User.findById(userId).select("-password");
};

export const updateProfileService = async (
  userId: string,
  data: {
    name?: string;
    avatar?: string;
  },
) => {
  return User.findByIdAndUpdate(userId, data, {
    new: true,
  }).select("-password");
};

export const changePasswordService = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  user.password = await bcrypt.hash(newPassword, 10);

  await user.save();

  return true;
};
