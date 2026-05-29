import { RecurringSummaryCard } from "@/components/recurring/recurring-summary-card";
import type { RecurringSummaryStat } from "@/lib/constants/recurring-mock";

type RecurringSummaryGridProps = {
  stats: RecurringSummaryStat[];
};

export function RecurringSummaryGrid({ stats }: RecurringSummaryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <RecurringSummaryCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
