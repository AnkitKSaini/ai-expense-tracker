import { PDF } from "./constants.js";
import type { PortfolioSummary } from "./types.js";

export function drawSummary(
  doc: PDFKit.PDFDocument,
  summary: PortfolioSummary,
) {
  doc
    .fillColor(PDF.TEXT)
    .font("Helvetica-Bold")
    .fontSize(20)
    .text("Executive Summary");

  doc.moveDown();

  const cards = [
    {
      title: "Total Investment",
      value: `₹${summary.totalInvestment.toLocaleString("en-IN")}`,
      color: PDF.PRIMARY,
    },
    {
      title: "Current Value",
      value: `₹${summary.currentValue.toLocaleString("en-IN")}`,
      color: PDF.SUCCESS,
    },
    {
      title: "Profit / Loss",
      value: `₹${summary.totalProfit.toLocaleString("en-IN")}`,
      color:
        summary.totalProfit >= 0
          ? PDF.SUCCESS
          : PDF.DANGER,
    },
    {
      title: "ROI",
      value: `${summary.roi.toFixed(2)}%`,
      color:
        summary.roi >= 0
          ? PDF.SUCCESS
          : PDF.DANGER,
    },
  ];

  cards.forEach((card) => {
    const y = doc.y;

    doc
      .roundedRect(
        PDF.PAGE_MARGIN,
        y,
        515,
        55,
        8,
      )
      .fillAndStroke(
        "#f8fafc",
        PDF.BORDER,
      );

    doc
      .fillColor(PDF.SUBTEXT)
      .font("Helvetica")
      .fontSize(11)
      .text(
        card.title,
        PDF.PAGE_MARGIN + 18,
        y + 12,
      );

    doc
      .fillColor(card.color)
      .font("Helvetica-Bold")
      .fontSize(15)
      .text(
        card.value,
        PDF.PAGE_MARGIN + 18,
        y + 30,
      );

    // Fixed spacing
    doc.y = y + 70;
  });

  doc.y += 10;
}