import { Building2, Crown, Wallet } from "lucide-react";

import type { PricingPlan } from "./types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for getting started with personal finance.",
    monthlyPrice: "₹0",
    yearlyPrice: "₹0",
    period: "/month",
    buttonText: "Start Free",
    icon: Wallet,
    features: [
      {
        text: "Expense Tracking",
      },
      {
        text: "Budget Planner",
      },
      {
        text: "Financial Dashboard",
      },
      {
        text: "Basic Reports",
      },
      {
        text: "Community Support",
      },
    ],
  },

  {
    id: "pro",
    name: "Pro",
    description: "Everything you need for AI-powered money management.",
    monthlyPrice: "₹499",
    yearlyPrice: "₹399",
    period: "/month",
    buttonText: "Upgrade to Pro",
    popular: true,
    icon: Crown,
    features: [
      {
        text: "Everything in Free",
      },
      {
        text: "AI Insights",
      },
      {
        text: "Budget Prediction",
      },
      {
        text: "Unlimited Expenses",
      },
      {
        text: "Receipt OCR",
      },
      {
        text: "PDF & CSV Export",
      },
      {
        text: "Cloud Backup",
      },
      {
        text: "Priority Support",
      },
    ],
  },

  {
    id: "enterprise",
    name: "Enterprise",
    description: "Advanced features for teams and businesses.",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    period: "",
    buttonText: "Contact Sales",
    icon: Building2,
    features: [
      {
        text: "Everything in Pro",
      },
      {
        text: "Team Management",
      },
      {
        text: "Unlimited Members",
      },
      {
        text: "API Access",
      },
      {
        text: "White Label",
      },
      {
        text: "Custom Integrations",
      },
      {
        text: "Dedicated Manager",
      },
      {
        text: "24/7 Premium Support",
      },
    ],
  },
];
