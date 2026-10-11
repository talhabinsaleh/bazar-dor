import Link from "next/link";
import { getProducts } from "@/lib/api";
import { bnNumber, unitBn } from "@/lib/format";
import type { Product } from "@/types/product";
import ChangeBadge from "./ChangeBadge";

export default async function PriceTicker() {
  const products = await getProducts().catch(() => []);
  if (!products.length) return null;

  return (
    <div className="overflow-hidden border-b border-line bg-base-100" aria-label="আজকের দামের তালিকা">
      <div className="ticker-track flex w-max">
        <TickerList products={products} />
        {/* second copy for a seamless loop, hidden from screen readers and keyboard */}
        <TickerList products={products} hidden />
      </div>
    </div>
  );
}

function TickerList({ products, hidden = false }: { products: Product[]; hidden?: boolean }) {
  return (
    <ul className="flex" aria-hidden={hidden || undefined}>
      {products.map((p) => (
        <li key={p.id} className="shrink-0 border-r border-line">
          <Link
            href={`/product/${p.slug}`}
            tabIndex={hidden ? -1 : undefined}
            aria-label={hidden ? undefined : `${p.nameBn} — বিস্তারিত দেখুন`}
            className="flex items-center gap-2 px-6 py-2.5 text-sm transition hover:bg-secondary"
          >
            <span>{p.image}</span>
            <span className="font-semibold">{p.nameBn}</span>
            <span className="text-base-content/70">
              {bnNumber(p.today)} টাকা/{unitBn(p.unit)}
            </span>
            <ChangeBadge change={p.change} plain />
          </Link>
        </li>
      ))}
    </ul>
  );
}
