import { generatePortfolioPDF } from "../../export/pdf/investment/generatePortfolioPDF.js";

export async function exportPortfolioPDF(
  user: any,
  investments: any[],
  summary: any,
) {
  return generatePortfolioPDF(
    user,
    investments,
    summary,
  );
}