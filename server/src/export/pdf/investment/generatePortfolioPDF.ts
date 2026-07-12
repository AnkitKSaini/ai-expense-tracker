import PDFDocument from "pdfkit";

import { PDF } from "./constants.js";

import { drawHeader } from "./header.service.js";
import { drawSummary } from "./summary.service.js";
import { drawAnalytics } from "./analytics.service.js";
import { drawTimeline } from "./timeline.service.js";
import { drawAIAdvisor } from "./aiAdvisor.service.js";
import { drawFooter } from "./footer.service.js";

import type {
  UserInfo,
  InvestmentPDF,
  PortfolioSummary,
} from "./types.js";

export async function generatePortfolioPDF(
  user: UserInfo,
  investments: InvestmentPDF[],
  summary: PortfolioSummary,
): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: PDF.PAGE_MARGIN,
      autoFirstPage: true,
    });

    const buffers: Buffer[] = [];

    doc.on("data", (chunk) => {
      buffers.push(chunk);
    });

    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });

    /*
      --------------------------------
      PAGE 1
      --------------------------------
    */

    drawHeader(doc, user);

    drawFooter(doc);

    /*
      --------------------------------
      PAGE 2
      --------------------------------
    */

    doc.addPage();

    drawSummary(doc, summary);

    drawAnalytics(doc, investments);

    drawFooter(doc);

    /*
      --------------------------------
      PAGE 3
      --------------------------------
    */

    doc.addPage();

    drawTimeline(doc, investments);

    drawAIAdvisor(doc, investments);

    drawFooter(doc);

    doc.end();
  });
}