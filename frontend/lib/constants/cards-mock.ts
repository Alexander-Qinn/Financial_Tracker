export type CcSummaryStat =
  | {
      id: string;
      label: string;
      value: string;
      type: "trend";
      trend: string;
      tone: "negative" | "positive" | "neutral";
    }
  | {
      id: string;
      label: string;
      value: string;
      type: "note";
      note: string;
    }
  | {
      id: string;
      label: string;
      value: string;
      type: "utilization";
      utilization: number;
      tip: string;
    };

export type CreditCardDetail = {
  id: string;
  name: string;
  lastFour: string;
  balance: number;
  utilization?: number;
  limitLabel: string;
  nextPaymentDate: string;
  nextPaymentDueSoon?: boolean;
  minDue?: number;
  statementBalance?: number;
};

export type PaymentTimelineStatus = "due-soon" | "scheduled" | "upcoming";

export type PaymentTimelineRow = {
  id: string;
  name: string;
  dueDate: string;
  status: PaymentTimelineStatus;
  minPayment: number;
  statementBalance: number;
};

export const MOCK_CC_SUMMARY: CcSummaryStat[] = [
  {
    id: "total-debt",
    label: "Total CC Debt",
    value: "$42,850.00",
    type: "trend",
    trend: "+2.4% from last month",
    tone: "negative",
  },
  {
    id: "total-limit",
    label: "Total Credit Limit",
    value: "$125,000.00",
    type: "note",
    note: "Across 4 active accounts",
  },
  {
    id: "utilization",
    label: "Overall Utilization",
    value: "34.2%",
    type: "utilization",
    utilization: 34.2,
    tip: "Optimal: Below 30% for ideal score.",
  },
];

export const MOCK_CREDIT_CARDS: CreditCardDetail[] = [
  {
    id: "chase-sapphire",
    name: "Chase Sapphire Reserve",
    lastFour: "4092",
    balance: 12450.2,
    utilization: 35.5,
    limitLabel: "$35K",
    nextPaymentDate: "Oct 15, 2023",
    minDue: 250,
  },
  {
    id: "amex-platinum",
    name: "Amex Platinum",
    lastFour: "1005",
    balance: 28100.5,
    limitLabel: "No Preset",
    nextPaymentDate: "Oct 02, 2023",
    nextPaymentDueSoon: true,
    statementBalance: 28100.5,
  },
];

export const MOCK_PAYMENT_TIMELINE: PaymentTimelineRow[] = [
  {
    id: "amex-platinum",
    name: "Amex Platinum",
    dueDate: "Oct 02, 2023",
    status: "due-soon",
    minPayment: 2500,
    statementBalance: 28100.5,
  },
  {
    id: "chase-sapphire",
    name: "Chase Sapphire",
    dueDate: "Oct 15, 2023",
    status: "scheduled",
    minPayment: 250,
    statementBalance: 12450.2,
  },
  {
    id: "bofa-cash",
    name: "BofA Cash Rewards",
    dueDate: "Oct 22, 2023",
    status: "upcoming",
    minPayment: 35,
    statementBalance: 1205,
  },
  {
    id: "citi-double",
    name: "Citi Double Cash",
    dueDate: "Nov 01, 2023",
    status: "upcoming",
    minPayment: 40,
    statementBalance: 1094.3,
  },
];
