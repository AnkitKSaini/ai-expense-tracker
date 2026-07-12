import { PDF } from "./constants.js";
import type { InvestmentPDF } from "./types.js";

export function drawTimeline(
  doc: PDFKit.PDFDocument,
  investments: InvestmentPDF[],
) {
  doc
    .fillColor(PDF.TEXT)
    .font("Helvetica-Bold")
    .fontSize(20)
    .text("Investment Timeline");

  doc.y += 15;

  if (!investments.length) {
    doc
      .fillColor(PDF.SUBTEXT)
      .font("Helvetica")
      .fontSize(11)
      .text("No investment history available.");

    return;
  }

  const sorted = [...investments].sort(
    (a, b) =>
      new Date(b.purchaseDate).getTime() -
      new Date(a.purchaseDate).getTime(),
  );

  sorted.forEach((investment, index) => {
    if (doc.y > 700) {
      doc.addPage();
      doc.y = PDF.PAGE_MARGIN;
    }

    const y = doc.y;

    // Timeline Dot
    doc
      .circle(
        PDF.PAGE_MARGIN + 10,
        y + 8,
        4,
      )
      .fill(PDF.PRIMARY);

    // Timeline Line
    if (index < sorted.length - 1) {
      doc
        .strokeColor(PDF.BORDER)
        .lineWidth(2)
        .moveTo(
          PDF.PAGE_MARGIN + 10,
          y + 14,
        )
        .lineTo(
          PDF.PAGE_MARGIN + 10,
          y + 58,
        )
        .stroke();
    }

    // Title
    doc
      .fillColor(PDF.TEXT)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(
        investment.title,
        PDF.PAGE_MARGIN + 28,
        y,
      );

    // Platform
    doc
      .fillColor(PDF.SUBTEXT)
      .font("Helvetica")
      .fontSize(10)
      .text(
        `Platform : ${investment.platform}`,
        PDF.PAGE_MARGIN + 28,
        y + 18,
      );

    // Purchase Date
    doc.text(
      `Purchased : ${new Date(
        investment.purchaseDate,
      ).toLocaleDateString("en-IN")}`,
      PDF.PAGE_MARGIN + 28,
      y + 34,
    );

    // Amount
    doc
      .fillColor(PDF.SUCCESS)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(
        `₹${investment.investedAmount.toLocaleString("en-IN")}`,
        390,
        y + 18,
        {
          width: 120,
          align: "right",
        },
      );

    // Fixed spacing
    doc.y = y + 70;
  });

  doc.y += 10;
}