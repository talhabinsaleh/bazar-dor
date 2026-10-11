import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import { bnNumber } from "@/lib/format";
import EmptyState from "@/components/EmptyState";
import SortableProducts from "./SortableProducts";

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = (await getCategories()).find((c) => c.slug === slug);
  return { title: category ? `${category.nameBn} — বাজার দর` : "পাওয়া যায়নি — বাজার দর" };
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([getCategories(), getProducts(slug)]);
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  // the filter endpoint should already do this, but keep it safe
  const items = products.filter((p) => p.category === slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="flex items-center gap-4 rounded-2xl border border-line bg-base-100 p-5">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-3xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-base-content/70">{bnNumber(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </section>

      {items.length ? (
        <SortableProducts products={items} />
      ) : (
        <EmptyState title="এই ক্যাটাগরিতে কোনো পণ্য নেই" message="অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।" />
      )}
    </div>
  );
}
