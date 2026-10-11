import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { bnNumber, bnTaka, marketAverage, priceSummary, unitBn } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.nameBn} — বাজার দর` : "পাওয়া যায়নি — বাজার দর" };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  await requireSession(`/product/${slug}`);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const unit = unitBn(product.unit);
  const summary = priceSummary(product);
  const diff = product.today - product.yesterday;
  const markets = [...product.markets].sort((a, b) => marketAverage(a) - marketAverage(b));

  const history = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="breadcrumbs mb-4 text-sm text-base-content/70">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link>
          </li>
          <li className="text-base-content">{product.nameBn}</li>
        </ul>
      </div>

      {/* Summary */}
      <section className="flex flex-col gap-5 rounded-2xl border border-line bg-base-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid size-20 shrink-0 place-items-center rounded-2xl bg-base-200 text-5xl">{product.image}</span>
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">{product.nameBn}</h1>
            <p className="mt-1 text-base-content/80">
              প্রতি {unit} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-sm text-base-content/80">
              {diff === 0 ? (
                "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
              ) : (
                <>
                  গতকালের তুলনায় আজ দাম <b>{diff > 0 ? "বেড়েছে" : "কমেছে"}</b> · {bnTaka(Math.abs(diff))}
                </>
              )}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="badge badge-sm border-none bg-secondary text-primary">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="badge badge-sm border-line">প্রতি {unit}</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-base-200 px-6 py-4 text-center sm:min-w-36">
          <p className="text-sm">আজকের দাম</p>
          <p className="text-4xl font-bold">{bnNumber(product.today)}</p>
          <p className="text-sm">টাকা / {unit}</p>
          <div className="mt-1">
            <ChangeBadge change={product.change} plain />
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="mt-6 rounded-2xl border border-line bg-base-100 p-5">
        <h2 className="text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <SummaryBox label="সর্বনিম্ন দাম" value={summary.min} note="সবচেয়ে কম দামের বাজার" tone="text-down" />
          <SummaryBox label="সর্বাধিক দাম" value={summary.max} note="সবচেয়ে বেশি দামের বাজার" tone="text-up" />
          <SummaryBox label="গড় দাম" value={summary.avg} note={`প্রতি ${unit}-এর হিসাবে`} tone="text-down" />
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-base-content/70">
          {history.map((h) => (
            <span key={h.label}>
              {h.label}: <b className="text-base-content">{bnTaka(h.value)}</b>
            </span>
          ))}
        </div>

        {/* Market wise table */}
        <h2 className="mt-8 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="table table-zebra min-w-[560px]">
            <thead className="bg-base-200 text-sm text-base-content">
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বাধিক</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m) => {
                const avg = marketAverage(m);
                return (
                  <tr key={m.market}>
                    <td className="font-medium">{m.market}</td>
                    <td>{m.division}</td>
                    <td className="text-right">{bnTaka(m.min)}</td>
                    <td className="text-right">{bnTaka(m.max)}</td>
                    <td className="text-right font-bold">
                      {bnNumber(avg, Number.isInteger(avg) ? 0 : 2)} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function SummaryBox({ label, value, note, tone }: { label: string; value: number; note: string; tone: string }) {
  return (
    <div className="rounded-xl border border-line p-4">
      <p className="text-sm">{label}</p>
      <p className={`mt-1 ${tone}`}>
        <span className="text-3xl font-bold">{bnNumber(value)}</span> টাকা
      </p>
      <p className="text-xs text-base-content/70">{note}</p>
    </div>
  );
}
