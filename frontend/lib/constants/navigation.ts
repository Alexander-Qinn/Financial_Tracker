import {
  CreditCard,
  Landmark,
  LayoutDashboard,
  Receipt,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Accounts", href: "/accounts", icon: Landmark },
  { label: "CC Tracking", href: "/cards", icon: CreditCard },
  { label: "Recurring Expenses", href: "/recurring", icon: RefreshCw },
  { label: "Transactions", href: "/transactions", icon: Receipt },
];
