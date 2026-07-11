export type InvestmentType =
  | "Stock"
  | "Mutual Fund"
  | "SIP"
  | "ETF"
  | "Gold"
  | "Crypto"
  | "FD"
  | "PPF"
  | "NPS"
  | "Real Estate"
  | "Bond"
  | "Other";

export type InvestmentStatus =
  | "Active"
  | "Sold";

export type RiskLevel =
  | "Low"
  | "Medium"
  | "High";

export type Currency =
  | "INR"
  | "USD";

export interface Investment {
  _id: string;

  title: string;

  symbol?: string;

  type: InvestmentType;

  investedAmount: number;

  currentValue: number;

  quantity: number;

  purchasePrice: number;

  currentPrice: number;

  purchaseDate: string;

  platform: string;

  currency: Currency;

  status: InvestmentStatus;

  riskLevel: RiskLevel;

  notes?: string;

  tags?: string[];

  user: string;

  createdAt: string;

  updatedAt: string;
}

export interface InvestmentFormData {
  title: string;

  symbol?: string;

  type: InvestmentType;

  investedAmount: number;

  currentValue: number;

  quantity: number;

  purchasePrice: number;

  currentPrice: number;

  purchaseDate: string;

  platform: string;

  currency: Currency;

  status: InvestmentStatus;

  riskLevel: RiskLevel;

  notes?: string;

  tags?: string[];
}

export interface PortfolioSummary {
  totalInvestment: number;

  currentValue: number;

  totalProfit: number;

  totalLoss: number;

  roi: number;

  activeAssets: number;

  diversificationScore: number;
}

export interface AssetAllocation {
  type: InvestmentType;

  value: number;

  percentage: number;
}

export interface InvestmentPerformance {
  month: string;

  invested: number;

  current: number;

  profit: number;
}