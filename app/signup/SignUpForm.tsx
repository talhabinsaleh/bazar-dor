"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fail(msg: string) {
    setError(msg);
    toast.error(msg);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));

    if (!name || !email || !password) return fail("সব ঘর পূরণ করুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("সঠিক ইমেইল দিন");
    if (password.length < 6) return fail("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মিলছে না");

    setError("");
    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      return fail(
        error.code === "USER_ALREADY_EXISTS" || error.status === 422
          ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে"
          : (error.message ?? "সাইন আপ ব্যর্থ হয়েছে"),
      );
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">নাম</span>
          <input name="name" autoComplete="name" placeholder="যেমন: রহিম উদ্দিন" className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">ইমেইল</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">পাসওয়ার্ড</span>
          <input name="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৬ অক্ষর" className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">পাসওয়ার্ড নিশ্চিত করুন</span>
          <input name="confirm" type="password" autoComplete="new-password" placeholder="আবার লিখুন" className="input w-full" />
        </label>
        {error && <p className="text-sm text-error">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full font-semibold">
          {loading && <span className="loading loading-spinner loading-sm" />}
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>
      <SocialButtons />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="link link-primary font-semibold no-underline">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}
