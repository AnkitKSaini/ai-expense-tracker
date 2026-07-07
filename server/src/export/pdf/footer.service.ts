import { PDF } from "./constants.js";
import type { PDFDoc } from "./types.js";

export function drawFooter(doc: PDFDoc) {
  const range = doc.bufferedPageRange();

  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(i);

    // 👇 IMPORTANT
    const page = doc.page;

    const pageWidth = page.width;
    const pageHeight = page.height;
    const footerY = pageHeight - 42;

    doc.save();

    doc
      .strokeColor(PDF.COLORS.BORDER)
      .moveTo(40, footerY - 10)
      .lineTo(pageWidth - 40, footerY - 10)
      .stroke();

    doc.font("Helvetica");
    doc.fontSize(PDF.FONT.SMALL);
    doc.fillColor(PDF.COLORS.MUTED);


    doc.restore();
  }
}