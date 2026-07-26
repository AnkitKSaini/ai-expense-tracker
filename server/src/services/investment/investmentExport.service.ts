import { generatePortfolioPDF } from "../../export/pdf/investment/generatePortfolioPDF.js";

type ExportPortfolioPDFParams =
  Parameters<typeof generatePortfolioPDF>;

export async function exportPortfolioPDF(
  user: ExportPortfolioPDFParams[0],
  investments: ExportPortfolioPDFParams[1],
  summary: ExportPortfolioPDFParams[2],
) {
  return generatePortfolioPDF(
    user,
    investments,
    summary,
  );
}