import { BarChart3, LineChart } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CHART_PLACEHOLDERS = [
  {
    title: "Spending by Category",
    description: "Breakdown of expenses for the selected period",
    icon: BarChart3,
  },
  {
    title: "Cash Flow Trend",
    description: "Income and expenses over time",
    icon: LineChart,
  },
];

export function DashboardChartSection() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {CHART_PLACEHOLDERS.map(({ title, description, icon: Icon }) => (
        <Card key={title} className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-56 items-center justify-center rounded-md border border-dashed border-border bg-muted/30">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Icon className="size-8 opacity-50" strokeWidth={1.5} />
                <p className="text-sm">Chart placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
