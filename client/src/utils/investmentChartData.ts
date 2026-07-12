import type { Investment } from "../types/investment";

export function getAllocationData(
  investments: Investment[],
) {
  const map = new Map<
    string,
    number
  >();

  investments.forEach(
    (investment) => {
      map.set(
        investment.type,
        (map.get(
          investment.type,
        ) ?? 0) +
          investment.currentValue,
      );
    },
  );

  return [...map.entries()].map(
    ([name, value]) => ({
      name,
      value,
    }),
  );
}

export function getProfitLossData(
  investments: Investment[],
) {
  return investments.map(
    (investment) => ({
      name: investment.title,

      profit:
        investment.currentValue -
        investment.investedAmount,
    }),
  );
}

export function getGrowthData(
  investments: Investment[],
) {
  return investments.map(
    (investment) => ({
      name: investment.title,

      invested:
        investment.investedAmount,

      current:
        investment.currentValue,
    }),
  );
}

export function getRiskDistributionData(
  investments: Investment[],
) {
  const riskMap = {
    Low: 0,
    Medium: 0,
    High: 0,
  };

  investments.forEach((investment) => {
    const risk =
      investment.riskLevel || "Medium";

    if (
      risk === "Low" ||
      risk === "Medium" ||
      risk === "High"
    ) {
      riskMap[risk]++;
    }
  });

  return [
    {
      name: "Low",
      value: riskMap.Low,
    },
    {
      name: "Medium",
      value: riskMap.Medium,
    },
    {
      name: "High",
      value: riskMap.High,
    },
  ].filter((item) => item.value > 0);
}