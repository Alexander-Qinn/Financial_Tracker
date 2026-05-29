import { Plus } from "lucide-react";

import { AccountsSection } from "@/components/accounts/accounts-section";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { MOCK_ACCOUNT_SECTIONS } from "@/lib/constants/accounts-mock";

export function AccountsView() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Account Management"
        subtitle="Manage balances, tracking, and settings across your portfolios."
        actions={
          <Button>
            <Plus className="size-4" />
            Add New Account
          </Button>
        }
      />
      {MOCK_ACCOUNT_SECTIONS.map((section) => (
        <AccountsSection
          key={section.id}
          title={section.title}
          icon={section.icon}
          accounts={section.accounts}
        />
      ))}
    </div>
  );
}
