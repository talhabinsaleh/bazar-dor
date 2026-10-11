import Link from "next/link";

export default function EmptyState({
  code,
  title,
  message,
}: {
  code?: string;
  title: string;
  message: string;
}) {
  return (
    <div className="mx-auto mt-8 flex max-w-lg flex-col items-center rounded-3xl border border-line bg-base-100 px-6 py-12 text-center">
      {code ? (
        <p className="text-6xl font-bold text-primary">{code}</p>
      ) : (
        <span className="text-6xl">🧺</span>
      )}
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary btn-sm sm:btn-md mt-6 px-6 font-semibold">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
