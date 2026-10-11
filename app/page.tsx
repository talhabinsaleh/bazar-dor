import { Suspense } from "react";
import { connection } from "next/server";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import SkeletonGrid from "@/components/SkeletonGrid";
import { getProducts } from "@/lib/api";
import { bnNumber } from "@/lib/format";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Hero />
      <Suspense fallback={<SectionsSkeleton />}>
        <HomeProducts />
      </Suspense>
    </div>
  );
}

async function HomeProducts() {
  await connection(); // fetch on every visit so the skeleton shows while data loads
  const products = await getProducts(undefined, true);

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <ProductSection
        title={
          <>
            <span className="text-up">▲</span> আজ দাম বেড়েছে
          </>
        }
        products={risers}
      />
      <ProductSection
        title={
          <>
            <span className="text-down">▼</span> আজ দাম কমেছে
          </>
        }
        products={fallers}
      />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${bnNumber(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </>
  );
}

function SectionsSkeleton() {
  return (
    <>
      {["আজ দাম বেড়েছে", "আজ দাম কমেছে"].map((title) => (
        <section key={title} className="pt-12">
          <div className="skeleton mb-5 h-7 w-48" />
          <SkeletonGrid count={6} />
        </section>
      ))}
      {/* keeps the hero button's #সব-পণ্য target on the page while loading */}
      <section id="সব-পণ্য" className="scroll-mt-40 pt-12">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="mb-5 mt-1 text-sm text-base-content/60">Loading…</p>
        <SkeletonGrid count={9} />
      </section>
    </>
  );
}
