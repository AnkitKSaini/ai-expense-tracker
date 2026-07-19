import type { LucideIcon } from "lucide-react";

export interface PricingFeature {
  text: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  period: string;
  buttonText: string;
  popular?: boolean;
  icon: LucideIcon;
  features: PricingFeature[];
}
