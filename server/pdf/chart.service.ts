import QuickChart from "quickchart-js";

export function generatePieChart(
  income: number,
  expense: number
) {
  const chart = new QuickChart();

  chart.setConfig({
    type: "pie",
    data: {
      labels: [
        "Income",
        "Expense",
      ],
      datasets: [
        {
          data: [
            income,
            expense,
          ],
        },
      ],
    },
  });

  return chart.getUrl();
}