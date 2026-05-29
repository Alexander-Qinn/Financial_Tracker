import { CreditCard } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CreditCardDetail } from "@/lib/constants/cards-mock";
import { formatCurrency } from "@/lib/formatters/currency";
import { cn } from "@/lib/utils";

type CreditCardDetailCardProps = {
  card: CreditCardDetail;
};

export function CreditCardDetailCard({ card }: CreditCardDetailCardProps) {
  const hasUtilization = card.utilization !== undefined;

  return (
    <Card className="shadow-sm">
      <CardContent className="space-y-5 p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-muted p-2">
            <CreditCard className="size-4 text-muted-foreground" strokeWidth={1.75} />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-semibold">{card.name}</p>
            <p className="text-xs text-muted-foreground">**** {card.lastFour}</p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Current Balance
          </p>
          <p className="font-mono text-2xl font-semibold tabular-nums tracking-tight">
            {formatCurrency(card.balance)}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium uppercase tracking-wide text-muted-foreground">
              Utilization
            </span>
            <span className="text-muted-foreground">
              {hasUtilization ? `${card.utilization}%` : "--"}{" "}
              <span className="text-muted-foreground/80">
                (Limit: {card.limitLabel})
              </span>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                hasUtilization ? "bg-primary" : "bg-muted-foreground/30",
              )}
              style={{ width: hasUtilization ? `${Math.min(card.utilization!, 100)}%` : "100%" }}
            />
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Next Payment
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{card.nextPaymentDate}</p>
              {card.nextPaymentDueSoon ? (
                <Badge variant="outline" className="border-destructive/30 text-destructive">
                  Due Soon
                </Badge>
              ) : null}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {card.minDue !== undefined ? "Min Due" : "Statement Bal"}
            </p>
            <p className="font-mono text-sm font-semibold tabular-nums">
              {formatCurrency(card.minDue ?? card.statementBalance ?? 0)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
