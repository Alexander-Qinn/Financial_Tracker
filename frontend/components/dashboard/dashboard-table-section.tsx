import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters/currency";

const RECENT_TRANSACTIONS = [
  { date: "May 28", description: "Whole Foods Market", category: "Groceries", amount: -142.5 },
  { date: "May 27", description: "Direct Deposit", category: "Income", amount: 8200 },
  { date: "May 26", description: "Netflix", category: "Subscriptions", amount: -15.99 },
  { date: "May 25", description: "Shell Gas Station", category: "Transport", amount: -58.2 },
];

const UPCOMING_RECURRING = [
  { name: "Rent", frequency: "Monthly", nextDate: "Jun 1", amount: 2400 },
  { name: "Internet", frequency: "Monthly", nextDate: "Jun 5", amount: 79.99 },
  { name: "Gym Membership", frequency: "Monthly", nextDate: "Jun 10", amount: 49 },
];

function TablePlaceholder({
  title,
  description,
  headers,
  rows,
}: {
  title: string;
  description: string;
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground first:pl-0 last:pr-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-border/60 last:border-0 hover:bg-muted/40"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-3 first:pl-0 last:pr-0 last:text-right"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export function DashboardTableSection() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <TablePlaceholder
        title="Recent Transactions"
        description="Latest activity across all accounts"
        headers={["Date", "Description", "Category", "Amount"]}
        rows={RECENT_TRANSACTIONS.map((tx) => [
          tx.date,
          tx.description,
          tx.category,
          <span
            key={tx.description}
            className={
              tx.amount >= 0
                ? "font-mono tabular-nums text-emerald-600 dark:text-emerald-400"
                : "font-mono tabular-nums text-destructive"
            }
          >
            {formatCurrency(tx.amount)}
          </span>,
        ])}
      />
      <TablePlaceholder
        title="Upcoming Recurring"
        description="Scheduled income and expenses"
        headers={["Name", "Frequency", "Next Date", "Amount"]}
        rows={UPCOMING_RECURRING.map((item) => [
          item.name,
          item.frequency,
          item.nextDate,
          <span key={item.name} className="font-mono tabular-nums">
            {formatCurrency(item.amount)}
          </span>,
        ])}
      />
    </div>
  );
}
