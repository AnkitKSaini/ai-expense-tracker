import type {
  Response,
} from "express";

import type {
  AuthRequest,
} from "../middleware/auth.middleware.js";

import {
  createBill,
  getBills,
  updateBill,
  deleteBill,
  payBill,
} from "../services/bill.service.js";

export async function createBillController(
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

    const bill =
      await createBill(
        req.body,
        req.user.id,
      );

    return res.status(201).json({
      success: true,
      data: bill,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to create bill.",
    });

  }
}

export async function getBillsController(
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

    const bills =
      await getBills(
        req.user.id,
      );

    return res.json({
      success: true,
      data: bills,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch bills.",
    });

  }
}

export async function updateBillController(
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

    const bill =
      await updateBill(
        req.params.id,
        req.body,
        req.user.id,
      );

    return res.json({
      success: true,
      data: bill,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to update bill.",
    });

  }
}

export async function deleteBillController(
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

    await deleteBill(
      req.params.id,
      req.user.id,
    );

    return res.json({
      success: true,
      message:
        "Bill deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete bill.",
    });

  }
}

export async function payBillController(
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

    const bill = await payBill(
      req.params.id,
      req.user.id,
    );

    return res.json({
      success: true,
      data: bill,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to pay bill.",
    });

  }
}