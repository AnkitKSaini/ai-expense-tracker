import type { Investment } from "../types/investment";

export interface PortfolioRiskSummary {
  overallRisk: "Low" | "Medium" | "High";
  diversificationScore: number;
  concentrationScore: number;
  highRiskPercentage: number;
}

export function getPortfolioRiskSummary(
  investments: Investment[],
): PortfolioRiskSummary {
  if (!investments.length) {
    return {
      overallRisk: "Low",
      diversificationScore: 0,
      concentrationScore: 0,
      highRiskPercentage: 0,
    };
  }

  const total = investments.length;

  const highRisk = investments.filter(
    (i) => i.riskLevel === "High",
  ).length;

  const uniqueTypes = new Set(
    investments.map((i) => i.type),
  ).size;

  const diversificationScore = Math.min(
    100,
    Math.round((uniqueTypes / 6) * 100),
  );

  const concentrationScore = Math.round(
    (100 / total),
  );

  const highRiskPercentage = Math.round(
    (highRisk / total) * 100,
  );

  let overallRisk: "Low" | "Medium" | "High" =
    "Low";

  if (highRiskPercentage >= 50) {
    overallRisk = "High";
  } else if (highRiskPercentage >= 20) {
    overallRisk = "Medium";
  }

  return {
    overallRisk,
    diversificationScore,
    concentrationScore,
    highRiskPercentage,
  };
}