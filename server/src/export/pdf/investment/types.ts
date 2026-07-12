export interface UserInfo {
  name: string;

  email: string;
}

export interface InvestmentPDF {
  title: string;

  type: string;

  platform: string;

  investedAmount: number;

  currentValue: number;

  quantity: number;

  purchasePrice: number;

  currentPrice: number;

  riskLevel: string;

  purchaseDate: Date;
}

export interface PortfolioSummary {
  totalInvestment: number;

  currentValue: number;

  totalProfit: number;

  roi: number;

  totalAssets: number;
}