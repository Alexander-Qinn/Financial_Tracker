import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { TransactionsTable } from "@/components/transactions/transactions-table";
import { PageHeader } from "@/components/layout/page-header";

export function TransactionsView() {
  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" />
      <TransactionFilters />
      <TransactionsTable />
    </div>
  );
}
