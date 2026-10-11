import Link from "next/link";
import type { Product } from "@/types/product";
import { bnNumber, unitBn } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-line bg-base-100 p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold group-hover:text-primary">{product.nameBn}</h3>
          <p className="text-sm text-base-content/70">প্রতি {unitBn(product.unit)}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-base-content/70">আজকের দাম</p>
      <div className="flex items-end justify-between gap-2">
        <p className="text-base">
          <span className="text-2xl font-bold">{bnNumber(product.today)}</span> টাকা
        </p>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
