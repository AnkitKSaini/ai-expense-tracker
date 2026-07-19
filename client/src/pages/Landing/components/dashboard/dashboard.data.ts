import {
  LayoutDashboard,
  Receipt,
  Wallet,
  PieChart,
  Brain,
  Settings,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export const DASHBOARD_NAV_ITEMS = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
  },
  {
    icon: Receipt,
    label: "Expenses",
  },
  {
    icon: Wallet,
    label: "Budget",
  },
  {
    icon: PieChart,
    label: "Analytics",
  },
  {
    icon: Brain,
    label: "AI Insights",
  },
  {
    icon: Settings,
    label: "Settings",
  },
];


export const DASHBOARD_STATS = [
  {
    title: "Total Balance",
    value: "₹85,420",
    change: "+12.4%",
    icon: Wallet,
    positive: true,
  },
  {
    title: "Income",
    value: "₹42,000",
    change: "+8.2%",
    icon: TrendingUp,
    positive: true,
  },
  {
    title: "Expenses",
    value: "₹18,760",
    change: "-3.5%",
    icon: TrendingDown,
    positive: false,
  },
];