import { PDF } from "./constants.js";
import type { InvestmentPDF } from "./types.js";

export function drawAnalytics(
  doc: PDFKit.PDFDocument,
  investments: InvestmentPDF[],
) {
  doc
    .fillColor(PDF.TEXT)
    .font("Helvetica-Bold")
    .fontSize(20)
    .text("Portfolio Analytics");

  doc.moveDown();

  if (!investments.length) {
    doc
      .fillColor(PDF.SUBTEXT)
      .font("Helvetica")
      .fontSize(11)
      .text("No analytics available.");

    return;
  }

  const data = investments.map((item) => {
    const profit = item.currentValue - item.investedAmount;

    const roi =
      item.investedAmount === 0 ? 0 : (profit / item.investedAmount) * 100;

    return {
      ...item,
      roi,
    };
  });

  const best = [...data].sort((a, b) => b.roi - a.roi).at(0);

  const worst = [...data].sort((a, b) => a.roi - b.roi).at(0);

  const highest = [...data]
    .sort((a, b) => b.investedAmount - a.investedAmount)
    .at(0);

  if (!best || !worst || !highest) {
    return;
  }

  const avg = data.reduce((sum, i) => sum + i.roi, 0) / data.length;

  const rows: [string, string][] = [
    ["Best Performer", `${best.title} (${best.roi.toFixed(2)}%)`],
    ["Worst Performer", `${worst.title} (${worst.roi.toFixed(2)}%)`],
    ["Highest Investment", highest.title ?? "N/A"],
    ["Average ROI", `${avg.toFixed(2)}%`],
  ];

  rows.forEach(([label, value]) => {
    const y = doc.y;

    doc
      .roundedRect(PDF.PAGE_MARGIN, y, 515, 45, 6)
      .fillAndStroke("#ffffff", PDF.BORDER);

    doc
      .fillColor(PDF.SUBTEXT)
      .font("Helvetica")
      .fontSize(11)
      .text(label, PDF.PAGE_MARGIN + 15, y + 14);

    doc
      .fillColor(PDF.TEXT)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(value, 260, y + 14, {
        width: 250,
        align: "right",
      });

    doc.y = y + 55;
  });

  doc.y += 15;
}
