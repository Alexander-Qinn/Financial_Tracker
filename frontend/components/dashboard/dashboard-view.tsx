import { ChevronDown, Download } from "lucide-react";

import { DashboardChartSection } from "@/components/dashboard/dashboard-chart-section";
import { DashboardTableSection } from "@/components/dashboard/dashboard-table-section";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardView() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Command Center"
        subtitle="Real-time overview of your financial architecture."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Last 30 Days
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
                <DropdownMenuItem>This Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline">
              <Download className="size-4" />
              Export
            </Button>
          </>
        }
      />
      <KpiGrid />
      <DashboardChartSection />
      <DashboardTableSection />
    </div>
  );
}
