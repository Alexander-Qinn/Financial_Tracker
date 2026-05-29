import { type LucideIcon, Landmark, PiggyBank } from "lucide-react";

export type MockAccount = {
  id: string;
  name: string;
  type: string;
  lastFour: string;
  balance: number;
  recentActivity: {
    description: string;
    amount: number;
  };
  icon: LucideIcon;
};

export type MockAccountSection = {
  id: string;
  title: string;
  icon: LucideIcon;
  accounts: MockAccount[];
};

export const MOCK_ACCOUNT_SECTIONS: MockAccountSection[] = [
  {
    id: "cash-checking",
    title: "Cash & Checking",
    icon: Landmark,
    accounts: [
      {
        id: "chase-premier",
        name: "Chase Premier",
        type: "Checking",
        lastFour: "4592",
        balance: 45291,
        recentActivity: {
          description: "Direct Deposit - Payroll",
          amount: 4120.5,
        },
        icon: Landmark,
      },
      {
        id: "marcus-hysa",
        name: "Marcus HYSA",
        type: "Savings",
        lastFour: "8821",
        balance: 128500.25,
        recentActivity: {
          description: "Interest Payment",
          amount: 450.12,
        },
        icon: PiggyBank,
      },
    ],
  },
];
