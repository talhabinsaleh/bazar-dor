import Link from "next/link";

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-1 text-base-content/70">{subtitle}</p>
      </div>
      <div className="mt-6 rounded-2xl border border-line bg-base-100 p-6">{children}</div>
      <p className="mt-6 text-center text-sm">
        <Link href="/" className="link link-hover">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
