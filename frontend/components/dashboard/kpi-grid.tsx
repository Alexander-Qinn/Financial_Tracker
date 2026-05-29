import { ArrowUpDown, Banknote, CreditCard } from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { formatCurrency } from "@/lib/formatters/currency";

export function KpiGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <KpiCard
        label="Monthly Spending"
        value={formatCurrency(14250)}
        icon={CreditCard}
        accent="red"
        footer={{
          type: "trend",
          value: "+8.4% vs last month",
          direction: "up",
          tone: "negative",
        }}
      />
      <KpiCard
        label="Monthly Income"
        value={formatCurrency(32840)}
        icon={Banknote}
        accent="green"
        footer={{
          type: "trend",
          value: "+2.1% vs last month",
          direction: "up",
          tone: "positive",
        }}
      />
      <KpiCard
        label="Net Cash Flow"
        value={formatCurrency(18590)}
        icon={ArrowUpDown}
        accent="blue"
        footer={{
          type: "status",
          label: "Positive Target Met",
          tone: "positive",
        }}
      />
    </div>
  );
}
