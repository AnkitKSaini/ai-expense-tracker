import type { Response } from "express";

import type { AuthRequest } from "../middleware/auth.middleware.js";

import { exportBackup } from "../services/backup.service.js";

import { restoreBackup } from "../services/backup.service.js";

import { backupSchema } from "../validators/backup.validator.js";

export async function exportBackupController(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
      });
    }

    const backup =
      await exportBackup(
        req.user.id,
      );

    res.setHeader(
      "Content-Type",
      "application/json",
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=backup-${Date.now()}.json`,
    );

    return res.send(
      JSON.stringify(
        backup,
        null,
        2,
      ),
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Backup failed.",
    });

  }
}

export async function restoreBackupController(
  req: AuthRequest,
  res: Response,
) {
  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
      });
    }

    const backup =
      backupSchema.parse(req.body);

    await restoreBackup(
      backup,
      req.user.id,
    );

    return res.json({
      success: true,
      message:
        "Backup restored successfully.",
    });

  } catch (error) {

    console.error(error);

    return res.status(400).json({
      success: false,
      message:
        "Invalid backup file.",
    });

  }
}