import {
  BadgeCheck,
  Cloud,
  Lock,
} from "lucide-react";

import type { SecurityItem } from "./types";

export const SECURITY_ITEMS: SecurityItem[] = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "Every transaction and personal detail is protected using advanced 256-bit encryption.",
  },
  {
    icon: BadgeCheck,
    title: "Bank-Level Security",
    description:
      "Industry-standard security practices keep your financial information safe at all times.",
  },
  {
    icon: Cloud,
    title: "Cloud Backup & Sync",
    description:
      "Securely sync your data across devices with automatic encrypted cloud backups.",
  },
];