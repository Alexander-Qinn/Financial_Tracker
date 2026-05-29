import { Calendar, RefreshCw, TrendingUp, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { RecurringSummaryStat } from "@/lib/constants/recurring-mock";
import { cn } from "@/lib/utils";

type RecurringSummaryCardProps = {
  stat: RecurringSummaryStat;
};

const accentStyles = {
  impact: "bg-destructive",
  "next-charge": "bg-primary",
  "automations-count": "bg-foreground",
};

export function RecurringSummaryCard({ stat }: RecurringSummaryCardProps) {
  const accent = accentStyles[stat.type === "impact" ? "impact" : stat.type === "next-charge" ? "next-charge" : "automations-count"];

  return (
    <Card className="overflow-hidden py-0 shadow-sm">
      <CardContent className="flex p-0">
        <div className={cn("w-1 shrink-0", accent)} aria-hidden />
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </p>
            {stat.type === "impact" ? (
              <Wallet className="size-4 text-muted-foreground" strokeWidth={1.75} />
            ) : null}
            {stat.type === "next-charge" ? (
              <Calendar className="size-4 text-muted-foreground" strokeWidth={1.75} />
            ) : null}
            {stat.type === "automations-count" ? (
              <RefreshCw className="size-4 text-muted-foreground" strokeWidth={1.75} />
            ) : null}
          </div>

          {stat.type === "impact" ? (
            <>
              <p className="font-mono text-2xl font-semibold tabular-nums tracking-tight text-destructive">
                {stat.amount}
              </p>
              <div className="flex items-center gap-1 text-xs font-medium text-destructive">
                <TrendingUp className="size-3.5" />
                <span>{stat.trend}</span>
              </div>
            </>
          ) : null}

          {stat.type === "next-charge" ? (
            <>
              <p className="text-lg font-semibold tracking-tight">{stat.merchant}</p>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">{stat.dateLabel}</p>
                <p className="font-mono text-sm font-semibold tabular-nums text-destructive">
                  {stat.amount}
                </p>
              </div>
            </>
          ) : null}

          {stat.type === "automations-count" ? (
            <>
              <p className="font-mono text-2xl font-semibold tabular-nums tracking-tight">
                {stat.count}
              </p>
              <p className="text-xs text-muted-foreground">{stat.note}</p>
            </>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
