"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
      <path fill="#FBBC05" d="M9.8 24c0-1.5.3-3 .7-4.4L2.7 13.7A23.9 23.9 0 0 0 0 24c0 3.7.9 7.2 2.6 10.3l7.9-6c-.5-1.4-.7-2.8-.7-4.3z" />
      <path fill="#EA4335" d="M24 9.8c3.3 0 6.3 1.2 8.7 3.1l6.8-6.8A23.8 23.8 0 0 0 2.7 13.7l7.8 5.9A14.2 14.2 0 0 1 24 9.8z" />
      <path fill="#34A853" d="M24 38.2c-6.3 0-11.6-4.1-13.5-9.8l-7.9 6A23.9 23.9 0 0 0 24 48c5.9 0 11.5-2.1 15.7-6l-7.5-5.8c-2.1 1.3-4.8 2-8.2 2z" />
      <path fill="#4285F4" d="M46.1 19.6H24v9.1h12.6c-.6 3.1-2.3 5.5-4.8 7.2l7.5 5.8C43.6 37.7 48 31.6 48 24c0-1.4-.2-2.9-.5-4.4z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

// adds ?auth=<value> to a same-site path, keeping any query it already has
function withAuthFlag(path: string, value: string) {
  const url = new URL(path, "http://x");
  url.searchParams.set("auth", value);
  return url.pathname + url.search;
}

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const [loading, setLoading] = useState<"google" | "github" | null>(null);

  async function handleSocial(provider: "google" | "github") {
    setLoading(provider);
    // errors (e.g. same email already used with a password) come back to the sign in page
    const { error } = await signIn.social({
      provider,
      callbackURL: withAuthFlag(callbackURL, "social"),
      newUserCallbackURL: withAuthFlag(callbackURL, "social-new"),
      errorCallbackURL: "/signin",
    });
    if (error) {
      toast.error(error.message ?? "সোশ্যাল লগইন ব্যর্থ হয়েছে");
      setLoading(null);
    }
  }

  return (
    <>
      <div className="divider my-5 text-sm text-base-content/60">অথবা</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => handleSocial("google")} disabled={!!loading} className="btn btn-outline border-line px-2 text-sm font-semibold whitespace-nowrap">
          {loading === "google" ? <span className="loading loading-spinner loading-sm" /> : <GoogleIcon />}
          Google দিয়ে চালিয়ে যান
        </button>
        <button type="button" onClick={() => handleSocial("github")} disabled={!!loading} className="btn btn-outline border-line px-2 text-sm font-semibold whitespace-nowrap">
          {loading === "github" ? <span className="loading loading-spinner loading-sm" /> : <GitHubIcon />}
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </>
  );
}
