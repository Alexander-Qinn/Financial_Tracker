import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getAccountIcon,
  MOCK_TRANSACTIONS,
  TRANSACTION_PAGINATION,
  type MockTransaction,
} from "@/lib/constants/transactions-mock";
import { formatCurrency } from "@/lib/formatters/currency";
import { cn } from "@/lib/utils";

type TransactionsTableProps = {
  transactions?: MockTransaction[];
};

function formatSignedAmount(amount: number): string {
  const formatted = formatCurrency(Math.abs(amount));
  if (amount > 0) return `+${formatted}`;
  if (amount < 0) return `-${formatted}`;
  return formatted;
}

export function TransactionsTable({
  transactions = MOCK_TRANSACTIONS,
}: TransactionsTableProps) {
  const { from, to, total, currentPage, totalPages } = TRANSACTION_PAGINATION;

  return (
    <Card className="shadow-sm">
      <CardContent className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="w-10 px-4 py-3 pl-6">
                <Checkbox aria-label="Select all transactions" />
              </th>
              {["Date", "Merchant / Description", "Account", "Category", "Amount", ""].map(
                (header) => (
                  <th
                    key={header || "actions"}
                    className={cn(
                      "px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground",
                      header === "Amount" && "text-right",
                      header === "" && "w-10 pr-6",
                    )}
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const AccountIcon = getAccountIcon(tx.accountType);
              const isIncome = tx.amount > 0;

              return (
                <tr
                  key={tx.id}
                  className="border-b border-border/60 last:border-0 hover:bg-muted/40"
                >
                  <td className="px-4 py-3 pl-6">
                    <Checkbox aria-label={`Select ${tx.merchant}`} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {tx.date}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{tx.merchant}</p>
                    <p className="text-xs text-muted-foreground">{tx.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <AccountIcon className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                      <span className="text-muted-foreground">
                        {tx.accountName}{" "}
                        <span className="text-muted-foreground/80">.... {tx.accountLastFour}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="font-normal">
                      {tx.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums font-medium">
                    <span
                      className={
                        isIncome
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-destructive"
                      }
                    >
                      {formatSignedAmount(tx.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3 pr-6">
                    <Button variant="ghost" size="icon" className="size-8" aria-label="Expand row">
                      <ChevronDown className="size-4 text-muted-foreground" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex flex-col gap-3 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {from} to {to} of {total} entries
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="size-8" aria-label="Previous page">
              <ChevronLeft className="size-4" />
            </Button>
            <span className="min-w-16 text-center text-sm text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
            <Button variant="outline" size="icon" className="size-8" aria-label="Next page">
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
