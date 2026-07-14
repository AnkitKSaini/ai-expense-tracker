import type { Response } from "express";

import type { AuthRequest } from "../middleware/auth.middleware.js";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteReadNotifications,
} from "../services/notification.service.js";

export async function getNotificationsController(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
      });
    }

    const notifications =
      await getNotifications(req.user.id);

    return res.json({
      success: true,
      data: notifications,
    });

  } catch {
    return res.status(500).json({
      success: false,
    });
  }
}

export async function markReadController(
  req: AuthRequest,
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
    });
  }

  const notification =
    await markAsRead(
      req.params.id,
      req.user.id,
    );

  return res.json({
    success: true,
    data: notification,
  });
}

export async function markAllReadController(
  req: AuthRequest,
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
    });
  }

  await markAllAsRead(
    req.user.id,
  );

  return res.json({
    success: true,
  });
}

export async function deleteNotificationController(
  req: AuthRequest,
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
    });
  }

  await deleteNotification(
    req.params.id,
    req.user.id,
  );

  return res.json({
    success: true,
  });
}

export async function deleteReadController(
  req: AuthRequest,
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
    });
  }

  await deleteReadNotifications(
    req.user.id,
  );

  return res.json({
    success: true,
  });
}