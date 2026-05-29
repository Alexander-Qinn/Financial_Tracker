import { TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { CcSummaryStat } from "@/lib/constants/cards-mock";
import { cn } from "@/lib/utils";

type CcSummaryCardProps = {
  stat: CcSummaryStat;
};

const toneStyles = {
  negative: "text-destructive",
  positive: "text-emerald-600 dark:text-emerald-400",
  neutral: "text-muted-foreground",
};

export function CcSummaryCard({ stat }: CcSummaryCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="space-y-3 p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {stat.label}
        </p>
        <p className="font-mono text-2xl font-semibold tabular-nums tracking-tight">
          {stat.value}
        </p>
        {stat.type === "trend" ? (
          <div className={cn("flex items-center gap-1 text-xs font-medium", toneStyles[stat.tone])}>
            <TrendingUp className="size-3.5" />
            <span>{stat.trend}</span>
          </div>
        ) : null}
        {stat.type === "note" ? (
          <p className="text-xs text-muted-foreground">{stat.note}</p>
        ) : null}
        {stat.type === "utilization" ? (
          <div className="space-y-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${Math.min(stat.utilization, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{stat.tip}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
