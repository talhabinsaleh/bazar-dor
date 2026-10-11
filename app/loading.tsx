import SkeletonGrid from "@/components/SkeletonGrid";

// Fallback for pages without their own loading state (product details, profile)
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="skeleton h-40 w-full rounded-2xl" />
      <div className="skeleton mb-5 mt-8 h-7 w-48" />
      <SkeletonGrid count={6} />
    </div>
  );
}
