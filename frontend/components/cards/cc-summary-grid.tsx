import { CcSummaryCard } from "@/components/cards/cc-summary-card";
import type { CcSummaryStat } from "@/lib/constants/cards-mock";

type CcSummaryGridProps = {
  stats: CcSummaryStat[];
};

export function CcSummaryGrid({ stats }: CcSummaryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <CcSummaryCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
