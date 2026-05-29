import { CreateAutomationForm } from "@/components/recurring/create-automation-form";
import { ActiveAutomationsTable } from "@/components/recurring/active-automations-table";
import { RecurringSummaryGrid } from "@/components/recurring/recurring-summary-grid";
import { PageHeader } from "@/components/layout/page-header";
import {
  MOCK_ACTIVE_AUTOMATIONS,
  MOCK_RECURRING_SUMMARY,
} from "@/lib/constants/recurring-mock";

export function RecurringView() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Recurring Expenses"
        subtitle="Automate and track your predictable cash flow. Setup rules to pre-populate your ledger before the charge hits."
      />
      <RecurringSummaryGrid stats={MOCK_RECURRING_SUMMARY} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_1fr]">
        <CreateAutomationForm />
        <ActiveAutomationsTable automations={MOCK_ACTIVE_AUTOMATIONS} />
      </div>
    </div>
  );
}
