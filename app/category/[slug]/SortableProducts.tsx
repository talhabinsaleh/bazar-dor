"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { bnNumber } from "@/lib/format";
import ProductGrid from "@/components/ProductGrid";

type SortKey = "default" | "asc" | "desc";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

// Converts "১,৮৫০" or 1850 to the number 1850 so sorting is numeric, never string based
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
export function toNumber(value: number | string): number {
  if (typeof value === "number") return value;
  const latin = value.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d))).replace(/[^\d.]/g, "");
  return Number(latin);
}

export default function SortableProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted =
    sort === "default"
      ? products
      : [...products].sort((a, b) =>
          sort === "asc" ? toNumber(a.today) - toNumber(b.today) : toNumber(b.today) - toNumber(a.today),
        );

  return (
    <>
      <div className="mt-6 flex items-center justify-end gap-3 rounded-2xl border border-line bg-base-100 p-4">
        <label htmlFor="sort" className="text-sm font-semibold">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="select select-sm w-52 font-sans"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <p className="mb-4 mt-6 text-sm text-base-content/70">মোট {bnNumber(products.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={sorted} />
    </>
  );
}
