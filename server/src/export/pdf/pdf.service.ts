import PDFDocument from "pdfkit";

import { PDF } from "./constants.js";

import { drawHeader } from "./header.service.js";
import { drawSummary } from "./summary.service.js";
import { drawExpenseTable } from "./table.service.js";
import { drawFooter } from "./footer.service.js";

import type { ExpensePDF, ReportSummary, UserInfo } from "./types.js";

export async function generatePDF(
  user: UserInfo,
  expenses: ExpensePDF[],
  summary: ReportSummary,
): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: PDF.PAGE_MARGIN,
      bufferPages: true,
    });

   

    const buffers: Buffer[] = [];

    doc.on("data", (chunk) => {
      buffers.push(chunk);
    });

    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });

    // Header
    drawHeader(doc, user);

    // Summary
    drawSummary(doc, summary);

    // Table
    drawExpenseTable(doc, expenses);

    // Footer
    drawFooter(doc);

    doc.end();
  });
}
