import type { Investment } from "../types/investment";

export interface PortfolioAdvice {
  score: number;
  status: "Excellent" | "Good" | "Average" | "Poor";
  recommendations: string[];
}

export function getPortfolioAdvice(
  investments: Investment[],
): PortfolioAdvice {
  if (!investments.length) {
    return {
      score: 0,
      status: "Poor",
      recommendations: [
        "Start investing to build your portfolio.",
      ],
    };
  }

  let score = 100;

  const recommendations: string[] = [];

  const totalInvestment = investments.reduce(
    (sum, item) => sum + item.investedAmount,
    0,
  );

  const currentValue = investments.reduce(
    (sum, item) => sum + item.currentValue,
    0,
  );

  const roi =
    ((currentValue - totalInvestment) /
      totalInvestment) *
    100;

  if (roi < 0) {
    score -= 25;

    recommendations.push(
      "Your portfolio is currently in loss. Review underperforming investments.",
    );
  }

  const highRisk = investments.filter(
    (i) => i.riskLevel === "High",
  ).length;

  if (
    highRisk >
    investments.length / 2
  ) {
    score -= 20;

    recommendations.push(
      "Your portfolio has high risk exposure. Add safer assets.",
    );
  }

  const uniqueTypes = new Set(
    investments.map((i) => i.type),
  );

  if (uniqueTypes.size < 3) {
    score -= 15;

    recommendations.push(
      "Diversify across more investment types.",
    );
  }

  if (investments.length < 3) {
    score -= 10;

    recommendations.push(
      "Increase the number of investments for better diversification.",
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Your portfolio is healthy. Continue investing regularly.",
    );
  }

  score = Math.max(0, Math.min(100, score));

  let status: PortfolioAdvice["status"] = "Excellent";

  if (score < 40) {
    status = "Poor";
  } else if (score < 60) {
    status = "Average";
  } else if (score < 80) {
    status = "Good";
  }

  return {
    score,
    status,
    recommendations,
  };
}