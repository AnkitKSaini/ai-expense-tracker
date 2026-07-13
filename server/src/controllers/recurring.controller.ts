import type { Response } from "express";

import type { AuthRequest } from "../middleware/auth.middleware.js";

import {
  createRecurring,
  getRecurring,
  updateRecurring,
  deleteRecurring,processRecurringTransaction,
} from "../services/recurring.service.js";

export async function createRecurringTransaction(
  req: AuthRequest,
  res: Response,
) {
  try {
    const recurring = await createRecurring(req);

    return res.status(201).json({
      success: true,
      data: recurring,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create recurring transaction.",
    });
  }
}

export async function getRecurringTransactions(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const recurring = await getRecurring(req.user.id);

    return res.json({
      success: true,
      data: recurring,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recurring transactions.",
    });
  }
}

export async function updateRecurringTransaction(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const recurring = await updateRecurring(
      req.params.id,
      req.body,
      req.user.id,
    );

    return res.json({
      success: true,
      data: recurring,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update recurring transaction.",
    });
  }
}

export async function deleteRecurringTransaction(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await deleteRecurring(
      req.params.id,
      req.user.id,
    );

    return res.json({
      success: true,
      message: "Recurring transaction deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete recurring transaction.",
    });
  }
}

export async function runRecurringTransaction(
  req: AuthRequest,
  res: Response,
) {
  try {
    const recurring =
      await processRecurringTransaction(
        req.params.id,
      );

    if (!recurring) {
      return res.status(404).json({
        success: false,
        message:
          "Recurring transaction not found.",
      });
    }

    return res.json({
      success: true,
      data: recurring,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to process recurring transaction.",
    });

  }
}