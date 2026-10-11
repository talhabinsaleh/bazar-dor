import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid";

export default function ProductSection({
  id,
  title,
  subtitle,
  products,
}: {
  id?: string;
  title: React.ReactNode;
  subtitle?: string;
  products: Product[];
}) {
  return (
    <section id={id} className="scroll-mt-40 pt-12">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-base-content/70">{subtitle}</p>}
      <div className="mt-5">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
