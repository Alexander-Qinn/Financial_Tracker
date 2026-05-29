export type RecurringSummaryStat =
  | {
      id: string;
      label: string;
      type: "impact";
      amount: string;
      trend: string;
    }
  | {
      id: string;
      label: string;
      type: "next-charge";
      merchant: string;
      dateLabel: string;
      amount: string;
    }
  | {
      id: string;
      label: string;
      type: "automations-count";
      count: string;
      note: string;
    };

export type AutomationStatus = "active" | "paused";

export type ActiveAutomation = {
  id: string;
  merchant: string;
  category: string;
  frequency: string;
  nextDate: string;
  amount: number;
  status: AutomationStatus;
};

export const MOCK_RECURRING_SUMMARY: RecurringSummaryStat[] = [
  {
    id: "monthly-impact",
    label: "Total Monthly Impact",
    type: "impact",
    amount: "-$4,250.00",
    trend: "+2.4% from last month",
  },
  {
    id: "next-charge",
    label: "Next Expected Charge",
    type: "next-charge",
    merchant: "AWS Cloud Services",
    dateLabel: "Tomorrow, Oct 15",
    amount: "-$450.00",
  },
  {
    id: "active-count",
    label: "Active Automations",
    type: "automations-count",
    count: "12",
    note: "Across 4 distinct categories",
  },
];

export const MOCK_ACTIVE_AUTOMATIONS: ActiveAutomation[] = [
  {
    id: "aws",
    merchant: "AWS Cloud Services",
    category: "Software Subscriptions",
    frequency: "Monthly (15th)",
    nextDate: "Oct 15, 2023",
    amount: -450,
    status: "active",
  },
  {
    id: "wework",
    merchant: "WeWork Office",
    category: "Rent / Mortgage",
    frequency: "Monthly (1st)",
    nextDate: "Nov 01, 2023",
    amount: -1200,
    status: "active",
  },
  {
    id: "adobe",
    merchant: "Adobe Creative Cloud",
    category: "Software Subscriptions",
    frequency: "Annually",
    nextDate: "Jan 12, 2024",
    amount: -599.88,
    status: "paused",
  },
  {
    id: "internet",
    merchant: "Internet Provider",
    category: "Utilities",
    frequency: "Monthly (20th)",
    nextDate: "Oct 20, 2023",
    amount: -120,
    status: "active",
  },
];

export const RECURRING_CATEGORIES = [
  "Software Subscriptions",
  "Rent / Mortgage",
  "Utilities",
  "Insurance",
  "Entertainment",
];

export const RECURRING_FREQUENCIES = [
  "Weekly",
  "Biweekly",
  "Monthly",
  "Quarterly",
  "Annually",
];
