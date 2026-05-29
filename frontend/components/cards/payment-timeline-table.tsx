import { CreditCard } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PaymentTimelineRow, PaymentTimelineStatus } from "@/lib/constants/cards-mock";
import { formatCurrency } from "@/lib/formatters/currency";
import { cn } from "@/lib/utils";

type PaymentTimelineTableProps = {
  rows: PaymentTimelineRow[];
};

const statusConfig: Record<
  PaymentTimelineStatus,
  { label: string; dotClass: string; textClass: string }
> = {
  "due-soon": {
    label: "Due Soon",
    dotClass: "bg-destructive",
    textClass: "text-destructive",
  },
  scheduled: {
    label: "Scheduled",
    dotClass: "bg-muted-foreground",
    textClass: "text-muted-foreground",
  },
  upcoming: {
    label: "Upcoming",
    dotClass: "bg-primary",
    textClass: "text-primary",
  },
};

export function PaymentTimelineTable({ rows }: PaymentTimelineTableProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Payment Due Timeline</CardTitle>
        <CardDescription>Upcoming payment obligations across all cards</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              {["Account", "Due Date", "Status", "Min Payment", "Statement Bal"].map(
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
            {rows.map((row) => {
              const status = statusConfig[row.status];
              return (
                <tr
                  key={row.id}
                  className="border-b border-border/60 last:border-0 hover:bg-muted/40"
                >
                  <td className="px-4 py-3 first:pl-0">
                    <div className="flex items-center gap-2">
                      <CreditCard className="size-4 text-muted-foreground" strokeWidth={1.75} />
                      <span className="font-medium">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.dueDate}</td>
                  <td className="px-4 py-3">
                    <div className={cn("flex items-center gap-2 text-xs font-medium", status.textClass)}>
                      <span className={cn("size-2 rounded-full", status.dotClass)} />
                      {status.label}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono tabular-nums">
                    {formatCurrency(row.minPayment)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums last:pr-0">
                    {formatCurrency(row.statementBalance)}
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
