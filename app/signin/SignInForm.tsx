"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

const OAUTH_ERRORS: Record<string, string> = {
  account_not_linked:
    "এই ইমেইল দিয়ে আগেই পাসওয়ার্ড ব্যবহার করে অ্যাকাউন্ট খোলা হয়েছে। ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন করুন।",
  access_denied: "সোশ্যাল লগইন বাতিল করা হয়েছে।",
};

export default function SignInForm({
  redirectTo,
  protectedRedirect,
  oauthError,
}: {
  redirectTo: string;
  protectedRedirect: boolean;
  oauthError?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const oauthMessage = oauthError ? (OAUTH_ERRORS[oauthError] ?? "সোশ্যাল লগইন ব্যর্থ হয়েছে, আবার চেষ্টা করুন।") : "";
  const [error, setError] = useState(oauthMessage);

  useEffect(() => {
    if (protectedRedirect) {
      toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন", { id: "protected" });
    }
    if (oauthMessage) {
      toast.error(oauthMessage, { id: "oauth-error", duration: 6000 });
    }
  }, [protectedRedirect, oauthMessage]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    if (!email || !password) {
      setError("ইমেইল ও পাসওয়ার্ড দুটোই দিন");
      toast.error("ইমেইল ও পাসওয়ার্ড দুটোই দিন");
      return;
    }

    setError("");
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg = error.status === 401 ? "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে" : (error.message ?? "সাইন ইন ব্যর্থ হয়েছে");
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">ইমেইল</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">পাসওয়ার্ড</span>
          <input name="password" type="password" autoComplete="current-password" placeholder="আপনার পাসওয়ার্ড" className="input w-full" />
        </label>
        {error && <p className="text-sm text-error">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full font-semibold">
          {loading && <span className="loading loading-spinner loading-sm" />}
          সাইন ইন
        </button>
      </form>
      <SocialButtons callbackURL={redirectTo} />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="link link-primary font-semibold no-underline">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
