import SkeletonGrid from "@/components/SkeletonGrid";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="skeleton h-72 w-full rounded-3xl" />
      <div className="skeleton mb-5 mt-12 h-7 w-48" />
      <SkeletonGrid count={6} />
    </div>
  );
}
