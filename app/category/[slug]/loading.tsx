import SkeletonGrid from "@/components/SkeletonGrid";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="skeleton h-24 w-full rounded-2xl" />
      <div className="skeleton mt-6 h-16 w-full rounded-2xl" />
      <p className="mb-4 mt-6 text-sm text-base-content/60">Loading…</p>
      <SkeletonGrid count={6} />
    </div>
  );
}
