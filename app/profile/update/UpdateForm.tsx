"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";

export default function UpdateForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    const { error } = await updateUser({ name: trimmed });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "আপডেট ব্যর্থ হয়েছে");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-line bg-base-100 p-6">
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">নাম</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className="input w-full" placeholder="আপনার নাম" />
      </label>
      <button type="submit" disabled={loading} className="btn btn-primary w-full font-semibold">
        {loading && <span className="loading loading-spinner loading-sm" />}
        তথ্য আপডেট করুন
      </button>
      <Link href="/profile" className="btn btn-ghost w-full">
        বাতিল
      </Link>
    </form>
  );
}
