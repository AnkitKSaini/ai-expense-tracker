import { PDF } from "./constants.js";
import type { UserInfo } from "./types.js";

export function drawHeader(
  doc: PDFKit.PDFDocument,
  user: UserInfo,
) {
  // Top Banner
  doc
    .rect(
      0,
      0,
      doc.page.width,
      170,
    )
    .fill(PDF.PRIMARY);

  // App Name
  doc
    .fillColor("white")
    .font("Helvetica-Bold")
    .fontSize(28)
    .text(
      "AI Expense Tracker",
      PDF.PAGE_MARGIN,
      45,
    );

  // Report Title
  doc
    .font("Helvetica")
    .fontSize(18)
    .text(
      "Investment Portfolio Report",
      PDF.PAGE_MARGIN,
      90,
    );

  // User Card
  const cardY = 210;

  doc
    .roundedRect(
      PDF.PAGE_MARGIN,
      cardY,
      515,
      110,
      10,
    )
    .fillAndStroke(
      "#ffffff",
      PDF.BORDER,
    );

  doc
    .fillColor(PDF.TEXT)
    .font("Helvetica-Bold")
    .fontSize(14)
    .text(
      "Prepared For",
      PDF.PAGE_MARGIN + 20,
      cardY + 18,
    );

  doc
    .font("Helvetica")
    .fontSize(12)
    .text(
      user.name,
      PDF.PAGE_MARGIN + 20,
      cardY + 45,
    );

  doc.text(
    user.email,
    PDF.PAGE_MARGIN + 20,
    cardY + 65,
  );

  doc
    .font("Helvetica-Bold")
    .text(
      "Generated",
      350,
      cardY + 18,
    );

  doc
    .font("Helvetica")
    .text(
      new Date().toLocaleDateString(
        "en-IN",
      ),
      350,
      cardY + 45,
    );

  doc
    .fillColor(PDF.SUBTEXT)
    .fontSize(10)
    .text(
      "Confidential Financial Report",
      PDF.PAGE_MARGIN,
      cardY + 140,
    );

  // Important
  doc.y = 380;
}