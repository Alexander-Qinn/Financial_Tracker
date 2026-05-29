import { CreditCard, Landmark, type LucideIcon } from "lucide-react";

export type TransactionAccountType = "credit_card" | "bank";

export type MockTransaction = {
  id: string;
  date: string;
  merchant: string;
  description: string;
  accountName: string;
  accountLastFour: string;
  accountType: TransactionAccountType;
  category: string;
  amount: number;
};

export const MOCK_TRANSACTIONS: MockTransaction[] = [
  {
    id: "tx-1",
    date: "Oct 24, 2023",
    merchant: "Whole Foods Market",
    description: "San Francisco, CA",
    accountName: "Chase Sapphire",
    accountLastFour: "4209",
    accountType: "credit_card",
    category: "Groceries",
    amount: -142.5,
  },
  {
    id: "tx-2",
    date: "Oct 23, 2023",
    merchant: "Acme Corp Payroll",
    description: "Direct deposit",
    accountName: "Chase Premier",
    accountLastFour: "4592",
    accountType: "bank",
    category: "Revenue",
    amount: 4250,
  },
  {
    id: "tx-3",
    date: "Oct 22, 2023",
    merchant: "Notion Labs",
    description: "Team workspace subscription",
    accountName: "Amex Platinum",
    accountLastFour: "1005",
    accountType: "credit_card",
    category: "Software",
    amount: -96,
  },
];

export const TRANSACTION_PAGINATION = {
  from: 1,
  to: 3,
  total: 124,
  currentPage: 1,
  totalPages: 10,
};

export function getAccountIcon(type: TransactionAccountType): LucideIcon {
  return type === "credit_card" ? CreditCard : Landmark;
}
