import { PDF } from "./constants.js";
import type { InvestmentPDF } from "./types.js";

export function drawAIAdvisor(
  doc: PDFKit.PDFDocument,
  investments: InvestmentPDF[],
) {
  doc
    .fillColor(PDF.TEXT)
    .font("Helvetica-Bold")
    .fontSize(20)
    .text("AI Portfolio Advisor");

  doc.y += 15;

  if (!investments.length) {
    doc
      .fillColor(PDF.SUBTEXT)
      .font("Helvetica")
      .fontSize(11)
      .text("No recommendations available.");

    return;
  }

  const totalInvestment = investments.reduce(
    (sum, item) => sum + item.investedAmount,
    0,
  );

  const currentValue = investments.reduce(
    (sum, item) => sum + item.currentValue,
    0,
  );

  const roi =
    totalInvestment === 0
      ? 0
      : ((currentValue - totalInvestment) /
          totalInvestment) *
        100;

  const score = Math.min(
    100,
    Math.max(
      0,
      Math.round(70 + roi),
    ),
  );

  const advice: string[] = [];

  if (roi < 0) {
    advice.push(
      "Review loss-making investments.",
    );
  }

  if (
    investments.filter(
      (i) => i.riskLevel === "High",
    ).length >
    investments.length / 2
  ) {
    advice.push(
      "Reduce exposure to high-risk assets.",
    );
  }

  const types = new Set(
    investments.map((i) => i.type),
  );

  if (types.size < 3) {
    advice.push(
      "Diversify into more asset classes.",
    );
  }

  if (!advice.length) {
    advice.push(
      "Portfolio looks healthy.",
    );
    advice.push(
      "Continue monthly investing.",
    );
    advice.push(
      "Review portfolio every quarter.",
    );
  }

  const y = doc.y;

  // Card
  doc
    .roundedRect(
      PDF.PAGE_MARGIN,
      y,
      515,
      70,
      8,
    )
    .fillAndStroke(
      "#eef4ff",
      PDF.BORDER,
    );

  // Score
  doc
    .fillColor(PDF.PRIMARY)
    .font("Helvetica-Bold")
    .fontSize(16)
    .text(
      `Portfolio Score : ${score}/100`,
      PDF.PAGE_MARGIN + 18,
      y + 24,
    );

  // Move below card
  doc.y = y + 90;

  // Advice
  advice.forEach((item) => {
    doc
      .fillColor(PDF.TEXT)
      .font("Helvetica")
      .fontSize(11)
      .text(`• ${item}`);

    doc.y += 6;
  });

  doc.y += 10;
}