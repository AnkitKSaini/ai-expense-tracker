import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import { createBillSchema } from "../validators/bill.validator.js";

import {
  createBillController,
  getBillsController,
  updateBillController,
  deleteBillController,
  payBillController,
} from "../controllers/bill.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createBillSchema),
  createBillController,
);

router.get("/", authMiddleware, getBillsController);

router.put("/:id", authMiddleware, updateBillController);

router.delete("/:id", authMiddleware, deleteBillController);

router.post("/:id/pay", authMiddleware, payBillController);

export default router;
