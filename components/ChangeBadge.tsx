import type { Product } from "@/types/product";
import { bnPercent } from "@/lib/format";

const STYLES = {
  up: { cls: "bg-up/10 text-up", arrow: "▲" },
  down: { cls: "bg-down/10 text-down", arrow: "▼" },
  flat: { cls: "bg-base-200 text-base-content/60", arrow: "—" },
};

export default function ChangeBadge({ change, plain = false }: { change: Product["change"]; plain?: boolean }) {
  const s = STYLES[change.dir] ?? STYLES.flat;
  return (
    <span
      className={`inline-flex items-center gap-0.5 whitespace-nowrap text-xs font-semibold ${
        plain ? s.cls.split(" ").pop() : `${s.cls} rounded-full px-2 py-0.5`
      }`}
    >
      {s.arrow} {bnPercent(change.pct)}
    </span>
  );
}
