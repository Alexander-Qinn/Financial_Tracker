import { type LucideIcon } from "lucide-react";

import { AccountCard } from "@/components/accounts/account-card";
import type { MockAccount } from "@/lib/constants/accounts-mock";

type AccountsSectionProps = {
  title: string;
  icon: LucideIcon;
  accounts: MockAccount[];
};

export function AccountsSection({ title, icon: Icon, accounts }: AccountsSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" strokeWidth={1.75} />
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {accounts.map((account) => (
          <AccountCard
            key={account.id}
            name={account.name}
            type={account.type}
            lastFour={account.lastFour}
            balance={account.balance}
            recentActivity={account.recentActivity}
            icon={account.icon}
          />
        ))}
      </div>
    </section>
  );
}
