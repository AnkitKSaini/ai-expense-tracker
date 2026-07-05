import type { Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import {
  getProfileService,
  updateProfileService,
} from "../services/user.service.js";

import { changePasswordService } from "../services/user.service.js";

import supabase from "../config/supabase.js";

export const getProfile = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const user = await getProfileService(req.user!.id);

    res.json(new ApiResponse(true, "Profile fetched successfully", user));
  },
);

export const updateProfile = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const updateData: {
      name?: string;
      avatar?: string;
    } = {
      name: req.body.name,
    };

    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (error) {
        throw error;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

      updateData.avatar = data.publicUrl;
    }

    const user = await updateProfileService(req.user!.id, updateData);

    res.json(new ApiResponse(true, "Profile updated successfully", user));
  },
);

export const changePassword = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { currentPassword, newPassword } = req.body;

    await changePasswordService(req.user!.id, currentPassword, newPassword);

    res.json(new ApiResponse(true, "Password changed successfully"));
  },
);
