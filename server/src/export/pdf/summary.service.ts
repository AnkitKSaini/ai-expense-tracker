import { PDF } from "./constants.js";
import type { PDFDoc, ReportSummary } from "./types.js";

export function drawSummary(doc: PDFDoc, summary: ReportSummary) {
  const balance = summary.income - summary.expense;

  const cards = [
    {
      title: "Income",
      value: summary.income,
      color: PDF.COLORS.SUCCESS,
    },
    {
      title: "Expense",
      value: summary.expense,
      color: PDF.COLORS.DANGER,
    },
    {
      title: "Balance",
      value: balance,
      color: PDF.COLORS.PRIMARY,
    },
  ];

  const startX = 40;
  const startY = 210;

  const cardWidth = 155;
  const cardHeight = 75;
  const gap = 20;

  cards.forEach((card, index) => {
    const x = startX + index * (cardWidth + gap);

    // Card Border
    doc
      .roundedRect(x, startY, cardWidth, cardHeight, 8)
      .lineWidth(1)
      .strokeColor(PDF.COLORS.BORDER)
      .stroke();

    // Title
    doc
      .fillColor(PDF.COLORS.MUTED)
      .fontSize(PDF.FONT.SMALL)
      .text(card.title, x + 15, startY + 12);

    // Amount
    doc
      .fillColor(card.color)
      .fontSize(18)
      .text(
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(card.value),

        x + 15,
        startY + 35,
      );
  });

  doc.y = startY + cardHeight + 30;
}
