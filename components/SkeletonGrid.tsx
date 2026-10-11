export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-line bg-base-100 p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton size-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="skeleton mt-5 h-3 w-16" />
      <div className="mt-2 flex justify-between">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

export default function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading…">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
