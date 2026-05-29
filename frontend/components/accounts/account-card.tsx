import { MoreHorizontal, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/formatters/currency";
import { cn } from "@/lib/utils";

type AccountCardProps = {
  name: string;
  type: string;
  lastFour: string;
  balance: number;
  recentActivity: {
    description: string;
    amount: number;
  };
  icon: LucideIcon;
};

function formatSignedCurrency(amount: number): string {
  const formatted = formatCurrency(Math.abs(amount));
  if (amount >= 0) return `+${formatted}`;
  return `-${formatted}`;
}

export function AccountCard({
  name,
  type,
  lastFour,
  balance,
  recentActivity,
  icon: Icon,
}: AccountCardProps) {
  const activityTone =
    recentActivity.amount >= 0
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-destructive";

  return (
    <Card className="overflow-hidden py-0 shadow-sm">
      <CardContent className="flex p-0">
        <div className="w-1 shrink-0 bg-primary" aria-hidden />
        <div className="flex flex-1 flex-col gap-5 p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="rounded-md bg-muted p-2">
                <Icon className="size-4 text-muted-foreground" strokeWidth={1.75} />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold uppercase tracking-wide">{name}</p>
                <p className="text-xs text-muted-foreground">
                  {type} •••• {lastFour}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8" aria-label="Account options">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>Edit account</DropdownMenuItem>
                <DropdownMenuItem>Archive account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Current Balance
            </p>
            <p className="font-mono text-3xl font-semibold tabular-nums tracking-tight">
              {formatCurrency(balance)}
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Recent Activity
            </p>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-foreground">{recentActivity.description}</p>
              <p className={cn("shrink-0 font-mono text-sm font-medium tabular-nums", activityTone)}>
                {formatSignedCurrency(recentActivity.amount)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
