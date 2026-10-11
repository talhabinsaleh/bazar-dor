import type { Metadata } from "next";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { requireSession } from "@/lib/session";
import Avatar from "@/components/Avatar";
import SignOutButton from "./SignOutButton";

export const metadata: Metadata = { title: "আমার প্রোফাইল — বাজার দর" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");
  const joined = new Intl.DateTimeFormat("bn-BD", { dateStyle: "long" }).format(new Date(user.createdAt));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
      <p className="text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-line bg-base-100 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} image={user.image} className="size-20" />
          <div className="min-w-0">
            <p className="truncate text-2xl font-semibold">{user.name}</p>
            <p className="truncate text-base-content/70">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-base-100 p-6">
        <h2 className="text-xl font-bold">তথ্য</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-base-content/60">নাম</dt>
            <dd className="font-semibold">{user.name}</dd>
          </div>
          <div>
            <dt className="text-sm text-base-content/60">ইমেইল</dt>
            <dd className="font-semibold break-all">{user.email}</dd>
          </div>
          <div>
            <dt className="text-sm text-base-content/60">যোগদানের তারিখ</dt>
            <dd className="font-semibold">{joined}</dd>
          </div>
        </dl>
        <Link href="/profile/update" className="btn btn-primary mt-6 w-full font-semibold">
          <Pencil className="size-4" /> তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}
