 import puppeteer from "puppeteer";
import { reportTemplate } from "./report.template.js";

export async function generatePDF(
  user: any,
  expenses: any[],
  income: number,
  expense: number
) {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

     await page.setContent(
  reportTemplate(user, expenses, income, expense),
  {
    waitUntil: "load",
  }
);
    const pdf = await page.pdf({
  format: "A4",
  printBackground: true,
  displayHeaderFooter: true,

  headerTemplate: `<span></span>`,

  footerTemplate: `
    <div style="
      width:100%;
      font-size:10px;
      text-align:center;
      color:#666;
      padding:0 20px;
    ">
      Page
      <span class="pageNumber"></span>
      of
      <span class="totalPages"></span>
    </div>
  `,

  margin: {
    top: "30px",
    bottom: "50px",
    left: "20px",
    right: "20px",
  },
});

    return pdf;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}