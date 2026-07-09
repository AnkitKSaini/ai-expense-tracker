interface MonthlyTrend {
  month: number;
  income: number;
  expense: number;
}

export interface PredictionResult {
  predictedExpense: number;
  predictedIncome: number;
  predictedSaving: number;
  confidence: number;
  trend: "Increasing" | "Stable" | "Decreasing";
}

export function calculatePrediction(
  data: MonthlyTrend[],
): PredictionResult {
  if (data.length === 0) {
    return {
      predictedExpense: 0,
      predictedIncome: 0,
      predictedSaving: 0,
      confidence: 0,
      trend: "Stable",
    };
  }

  const lastThree = data.slice(-3);

  const totalWeight = lastThree.reduce(
    (_, __, index) => _ + (index + 1),
    0
  );

  let weightedExpense = 0;
  let weightedIncome = 0;

  lastThree.forEach((item, index) => {
    const weight = index + 1;

    weightedExpense += item.expense * weight;
    weightedIncome += item.income * weight;
  });

  const predictedExpense = Math.round(
    weightedExpense / totalWeight
  );

  const predictedIncome = Math.round(
    weightedIncome / totalWeight
  );

  const predictedSaving =
    predictedIncome - predictedExpense;

  let trend: PredictionResult["trend"] = "Stable";

 if (lastThree.length >= 2) {
  const last = lastThree[lastThree.length - 1]!.expense;
  const prev = lastThree[lastThree.length - 2]!.expense;

  if (last > prev) trend = "Increasing";
  else if (last < prev) trend = "Decreasing";
}
  

  const confidence =
    data.length >= 6
      ? 95
      : data.length >= 3
      ? 88
      : 75;

  return {
    predictedExpense,
    predictedIncome,
    predictedSaving,
    confidence,
    trend,
  };
}