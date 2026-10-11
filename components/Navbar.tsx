import Link from "next/link";
import { getCategories } from "@/lib/api";
import { bnToday } from "@/lib/format";
import CategoryLinks from "./CategoryLinks";
import AuthButtons from "./AuthButtons";

export default async function Navbar() {
  const categories = await getCategories().catch(() => []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-xl shadow-sm">
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-bold">বাজার দর</span>
            <span className="block text-xs text-base-content/70">{bnToday()}</span>
          </span>
        </Link>
        <AuthButtons />
      </div>
      <CategoryLinks categories={categories} />
    </header>
  );
}
