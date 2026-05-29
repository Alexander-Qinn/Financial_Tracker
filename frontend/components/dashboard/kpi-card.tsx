import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type KpiTrend = {
  type: "trend";
  value: string;
  direction: "up" | "down";
  tone: "positive" | "negative" | "neutral";
};

type KpiStatus = {
  type: "status";
  label: string;
  tone: "positive" | "negative" | "neutral";
};

type KpiCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  accent: "blue" | "red" | "green";
  footer: KpiTrend | KpiStatus;
};

const accentStyles = {
  blue: "bg-primary",
  red: "bg-destructive",
  green: "bg-emerald-500",
};

const toneStyles = {
  positive: "text-emerald-600 dark:text-emerald-400",
  negative: "text-destructive",
  neutral: "text-muted-foreground",
};

export function KpiCard({ label, value, icon: Icon, accent, footer }: KpiCardProps) {
  return (
    <Card className="overflow-hidden py-0 shadow-sm">
      <CardContent className="flex p-0">
        <div className={cn("w-1 shrink-0", accentStyles[accent])} aria-hidden />
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
            <div className="rounded-md bg-muted p-2">
              <Icon className="size-4 text-muted-foreground" strokeWidth={1.75} />
            </div>
          </div>
          <p className="font-mono text-2xl font-semibold tabular-nums tracking-tight">
            {value}
          </p>
          {footer.type === "trend" ? (
            <div className={cn("flex items-center gap-1 text-xs font-medium", toneStyles[footer.tone])}>
              {footer.direction === "up" ? (
                <TrendingUp className="size-3.5" />
              ) : (
                <TrendingDown className="size-3.5" />
              )}
              <span>{footer.value}</span>
            </div>
          ) : (
            <Badge
              variant="outline"
              className={cn("w-fit border-transparent bg-emerald-500/10", toneStyles[footer.tone])}
            >
              {footer.label}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
