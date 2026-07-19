import {
  Wallet,
  PiggyBank,
  Target,
  Landmark,
  Receipt,
  Bell,
  Brain,
   Bot,
  TrendingUp,
  Sparkles,
  FileSpreadsheet,
} from "lucide-react";

import {
  Star,
  ShieldCheck,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import {
  Zap,
  BarChart3,
  Cloud,
  Smartphone,
} from "lucide-react";

export const WHY_CHOOSE = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Track your income and expenses instantly with a smooth experience.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "AI Insights",
    description:
      "Receive personalized financial recommendations powered by AI.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description:
      "Understand your financial habits with interactive reports.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description:
      "Your financial data is protected with modern security practices.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description:
      "Access your financial data anytime from anywhere.",
    gradient: "from-sky-500 to-indigo-500",
  },
  {
    icon: Smartphone,
    title: "Responsive",
    description:
      "Optimized for desktop, tablet and mobile devices.",
    gradient: "from-pink-500 to-rose-500",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Financial Consultant",
    company: "FinEdge",
    country: "🇺🇸 USA",
    avatarGradient: "from-blue-600 via-cyan-500 to-violet-500",
    rating: 5,
    review:
      "AI Expense Tracker completely changed how I manage my monthly finances. The AI insights helped me save more every month.",
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    company: "NovaTech",
    country: "🇸🇬 Singapore",
    avatarGradient: "from-emerald-500 via-teal-500 to-cyan-500",
    rating: 5,
    review:
      "The dashboard is incredibly intuitive. Expense tracking and budgeting have never been this simple for my startup.",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Designer",
    company: "Pixel Studio",
    country: "🇪🇸 Spain",
    avatarGradient: "from-pink-500 via-rose-500 to-orange-500",
    rating: 4.9,
    review:
      "Beautiful interface, smart reports and instant analytics. It's the finance app I've always wanted.",
  },
  {
    name: "David Wilson",
    role: "Software Engineer",
    company: "TechFlow",
    country: "🇨🇦 Canada",
    avatarGradient: "from-indigo-500 via-purple-500 to-pink-500",
    rating: 5,
    review:
      "The AI recommendations helped me identify unnecessary subscriptions and improve my monthly savings.",
  },
  {
    name: "Sophia Brown",
    role: "Marketing Manager",
    company: "Bright Media",
    country: "🇬🇧 United Kingdom",
    avatarGradient: "from-orange-500 via-red-500 to-pink-500",
    rating: 4.9,
    review:
      "Budget planning is effortless now. I love the clean design and real-time spending insights.",
  },
  {
    name: "James Anderson",
    role: "Freelancer",
    company: "Independent",
    country: "🇦🇺 Australia",
    avatarGradient: "from-sky-500 via-blue-500 to-indigo-500",
    rating: 5,
    review:
      "Managing multiple income sources used to be difficult. This app keeps everything organized in one place.",
  },
  {
    name: "Olivia Taylor",
    role: "University Student",
    company: "University of Melbourne",
    country: "🇦🇺 Australia",
    avatarGradient: "from-lime-500 via-green-500 to-emerald-500",
    rating: 4.8,
    review:
      "As a student, staying within budget is important. This app makes tracking every expense incredibly easy.",
  },
  {
    name: "Daniel Martinez",
    role: "Business Owner",
    company: "Martinez Group",
    country: "🇲🇽 Mexico",
    avatarGradient: "from-violet-500 via-fuchsia-500 to-pink-500",
    rating: 5,
    review:
      "The analytics are powerful and the reports save me hours every month. Highly recommended.",
  },
  {
    name: "Emma Thomas",
    role: "HR Manager",
    company: "PeopleFirst",
    country: "🇮🇪 Ireland",
    avatarGradient: "from-amber-500 via-orange-500 to-red-500",
    rating: 4.9,
    review:
      "I finally know exactly where my money goes every month. The AI suggestions are surprisingly accurate.",
  },
  {
    name: "Ryan Walker",
    role: "Data Analyst",
    company: "InsightIQ",
    country: "🇩🇪 Germany",
    avatarGradient: "from-cyan-500 via-sky-500 to-blue-600",
    rating: 5,
    review:
      "The charts, insights and budgeting tools provide everything I need for smarter financial decisions.",
  },
  {
    name: "Ava Harris",
    role: "UX Researcher",
    company: "DesignLab",
    country: "🇳🇱 Netherlands",
    avatarGradient: "from-purple-500 via-violet-500 to-indigo-500",
    rating: 4.9,
    review:
      "Fast, modern and extremely easy to use. It feels like having a personal financial assistant.",
  },
  {
    name: "Ethan Clark",
    role: "Investment Advisor",
    company: "WealthCore",
    country: "🇨🇭 Switzerland",
    avatarGradient: "from-green-500 via-emerald-500 to-teal-500",
    rating: 5,
    review:
      "One of the best finance applications I've used. Clean UI, intelligent insights and excellent performance.",
  },
];

export const TRUST_BADGES = [
 {
  title: "Open Source",
  icon: FaGithub,
},
  {
    title: "Secure",
    icon: ShieldCheck,
  },
  {
    title: "Top Rated",
    icon: Star,
  },
];

export const AI_FEATURES = [
  {
    title: "AI Financial Insights",
    description:
      "Get personalized spending insights and smart recommendations.",
    icon: Brain,
  },
  {
    title: "AI Assistant",
    description:
      "Ask questions about your finances and receive intelligent answers.",
    icon: Bot,
  },
  {
    title: "Expense Predictions",
    description:
      "Predict future spending trends using AI.",
    icon: TrendingUp,
  },
  {
    title: "Smart Suggestions",
    description:
      "Receive proactive saving and budgeting recommendations.",
    icon: Sparkles,
  },
];

export const LANDING_FEATURES = [
  {
    title: "Expense Tracking",
    description:
      "Track every income and expense with powerful analytics.",
    icon: Wallet,
  },
  {
    title: "Budget Planner",
    description:
      "Create budgets and monitor spending in real time.",
    icon: PiggyBank,
  },
  {
    title: "Financial Goals",
    description:
      "Plan savings goals and monitor your progress.",
    icon: Target,
  },
  {
    title: "Investment Portfolio",
    description:
      "Manage stocks, SIPs, crypto and more.",
    icon: Landmark,
  },
  {
    title: "Bills & Recurring",
    description:
      "Never miss a payment with reminders.",
    icon: Receipt,
  },
  {
    title: "Smart Notifications",
    description:
      "Real-time alerts for budgets, bills and AI insights.",
    icon: Bell,
  },
  {
    title: "AI Insights",
    description:
      "Receive intelligent financial suggestions.",
    icon: Brain,
  },
  {
    title: "Reports & Export",
    description:
      "Generate PDF and CSV reports instantly.",
    icon: FileSpreadsheet,
  },
];

export const LANDING_STATS = [
  { value: "10K+", title: "Users" },
  { value: "₹25M+", title: "Money Tracked" },
  { value: "99.9%", title: "Accuracy" },
];

export const LANDING_ANALYTICS = [
  {
    title: "Total Balance",
    value: "₹4,25,000",
    icon: Wallet,
  },
  {
    title: "Monthly Savings",
    value: "₹65,400",
    icon: PiggyBank,
  },
  {
    title: "Investments",
    value: "₹9,80,000",
    icon: Landmark,
  },
];

export const AI_CHAT_PREVIEW = {
  question:
    "How can I reduce my monthly expenses?",

  answer:
    "Based on your recent spending, reducing dining expenses by 15% could save approximately ₹3,500 per month.",
};

export const FAQS = [
  {
    question: "Is AI Expense Tracker free?",
    answer:
      "Yes. The project is completely free and open source for learning and personal use.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes. You can export reports as PDF, CSV and create complete JSON backups.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. JWT Authentication, encrypted passwords and protected APIs keep your data secure.",
  },
  {
    question: "Does it support investments?",
    answer:
      "Yes. Stocks, SIPs, Mutual Funds, Crypto and many more investment types are supported.",
  },
];