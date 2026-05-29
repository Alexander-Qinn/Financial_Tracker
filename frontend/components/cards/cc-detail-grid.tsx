import { CreditCardDetailCard } from "@/components/cards/credit-card-detail-card";
import type { CreditCardDetail } from "@/lib/constants/cards-mock";

type CcDetailGridProps = {
  cards: CreditCardDetail[];
};

export function CcDetailGrid({ cards }: CcDetailGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {cards.map((card) => (
        <CreditCardDetailCard key={card.id} card={card} />
      ))}
    </div>
  );
}
