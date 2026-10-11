"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

// Google/GitHub login leaves the site and comes back with ?auth=..., so the toast is shown here
const MESSAGES: Record<string, string> = {
  social: "সফলভাবে সাইন ইন হয়েছে",
  "social-new": "অ্যাকাউন্ট তৈরি হয়েছে, স্বাগতম!",
};

export default function AuthToast() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const auth = params.get("auth");

  useEffect(() => {
    if (!auth || !MESSAGES[auth]) return;
    toast.success(MESSAGES[auth], { id: "social-login" });
    // drop ?auth from the address bar so a reload doesn't show it again
    const rest = new URLSearchParams(params);
    rest.delete("auth");
    const query = rest.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [auth, params, pathname, router]);

  return null;
}
