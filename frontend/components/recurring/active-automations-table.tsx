import { Filter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActiveAutomation, AutomationStatus } from "@/lib/constants/recurring-mock";
import { formatCurrency } from "@/lib/formatters/currency";
import { cn } from "@/lib/utils";

type ActiveAutomationsTableProps = {
  automations: ActiveAutomation[];
};

const statusStyles: Record<
  AutomationStatus,
  { label: string; className: string }
> = {
  active: {
    label: "ACTIVE",
    className: "border-primary/30 bg-primary/10 text-primary",
  },
  paused: {
    label: "PAUSED",
    className: "border-transparent bg-muted text-muted-foreground",
  },
};

function formatExpenseAmount(amount: number): string {
  const formatted = formatCurrency(Math.abs(amount));
  return amount < 0 ? `-${formatted}` : formatted;
}

export function ActiveAutomationsTable({ automations }: ActiveAutomationsTableProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-lg font-medium">Active Automations</CardTitle>
        <Button variant="outline" size="sm">
          <Filter className="size-4" />
          Filter
        </Button>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              {["Merchant & Category", "Frequency", "Next Date", "Amount", "Status"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground first:pl-0 last:pr-0 last:text-right"
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {automations.map((automation) => {
              const status = statusStyles[automation.status];
              return (
                <tr
                  key={automation.id}
                  className="border-b border-border/60 last:border-0 hover:bg-muted/40"
                >
                  <td className="px-4 py-3 first:pl-0">
                    <p className="font-medium">{automation.merchant}</p>
                    <p className="text-xs text-muted-foreground">{automation.category}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{automation.frequency}</td>
                  <td className="px-4 py-3 text-muted-foreground">{automation.nextDate}</td>
                  <td className="px-4 py-3 font-mono tabular-nums text-destructive">
                    {formatExpenseAmount(automation.amount)}
                  </td>
                  <td className="px-4 py-3 text-right last:pr-0">
                    <Badge
                      variant="outline"
                      className={cn("text-[10px] font-semibold tracking-wide", status.className)}
                    >
                      {status.label}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
