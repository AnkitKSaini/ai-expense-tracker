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