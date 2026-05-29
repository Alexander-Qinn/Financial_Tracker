import {
  Calendar,
  ChevronDown,
  CreditCard,
  Download,
  Filter,
  LayoutGrid,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const filterButtons = [
  { label: "October 2023", icon: Calendar },
  { label: "Last 30 Days", icon: Calendar },
  { label: "All Accounts", icon: CreditCard },
  { label: "All Categories", icon: LayoutGrid },
];

export function TransactionFilters() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {filterButtons.map(({ label, icon: Icon }) => (
          <Button key={label} variant="outline" size="sm">
            <Icon className="size-4" />
            {label}
            <ChevronDown className="size-3.5 opacity-60" />
          </Button>
        ))}
        <Button variant="outline" size="sm">
          <Filter className="size-4" />
          More Filters
        </Button>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button size="sm" className="shrink-0">
          <Plus className="size-4" />
          Add Transaction
        </Button>
        <Button variant="outline" size="sm" className="shrink-0">
          <Download className="size-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
