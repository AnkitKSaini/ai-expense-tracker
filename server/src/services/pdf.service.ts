import puppeteer from "puppeteer";

export async function generatePDF() {
  console.log("Step 1");

  const browser = await puppeteer.launch({
    headless: true,
  });

  console.log("Step 2");

  await browser.close();

  console.log("Step 3");

  return Buffer.from("test");
}