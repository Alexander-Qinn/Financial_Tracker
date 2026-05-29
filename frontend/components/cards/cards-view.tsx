import { Download } from "lucide-react";

import { CcDetailGrid } from "@/components/cards/cc-detail-grid";
import { CcSummaryGrid } from "@/components/cards/cc-summary-grid";
import { PaymentTimelineTable } from "@/components/cards/payment-timeline-table";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  MOCK_CC_SUMMARY,
  MOCK_CREDIT_CARDS,
  MOCK_PAYMENT_TIMELINE,
} from "@/lib/constants/cards-mock";

export function CardsView() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Credit Card Tracking"
        subtitle="Monitor utilization, upcoming payments, and balance trends across all active accounts."
        actions={
          <Button variant="outline">
            <Download className="size-4" />
            Export Statement
          </Button>
        }
      />
      <CcSummaryGrid stats={MOCK_CC_SUMMARY} />
      <CcDetailGrid cards={MOCK_CREDIT_CARDS} />
      <PaymentTimelineTable rows={MOCK_PAYMENT_TIMELINE} />
    </div>
  );
}
