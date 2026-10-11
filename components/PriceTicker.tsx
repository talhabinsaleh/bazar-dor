import { getProducts } from "@/lib/api";
import { bnNumber, unitBn } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

export default async function PriceTicker() {
  const products = await getProducts().catch(() => []);
  if (!products.length) return null;

  const items = products.map((p) => (
    <li key={p.id} className="flex shrink-0 items-center gap-2 border-r border-line px-6 text-sm">
      <span>{p.image}</span>
      <span className="font-semibold">{p.nameBn}</span>
      <span className="text-base-content/70">
        {bnNumber(p.today)} টাকা/{unitBn(p.unit)}
      </span>
      <ChangeBadge change={p.change} plain />
    </li>
  ));

  return (
    <div className="overflow-hidden border-b border-line bg-base-100 py-2.5" aria-label="আজকের দামের তালিকা">
      <div className="ticker-track flex w-max">
        <ul className="flex">{items}</ul>
        {/* second copy for a seamless loop */}
        <ul className="flex" aria-hidden>
          {items}
        </ul>
      </div>
    </div>
  );
}
