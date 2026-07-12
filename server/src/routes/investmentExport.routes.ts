import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { exportInvestmentPDF } from "../controllers/investmentExport.controller.js";

const router = Router();

router.get("/pdf", authMiddleware, exportInvestmentPDF);

export default router;
