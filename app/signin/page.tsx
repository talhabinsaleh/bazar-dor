import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";
import SignInForm from "./SignInForm";

export const metadata: Metadata = { title: "সাইন ইন — বাজার দর" };

export default async function SignInPage({ searchParams }: PageProps<"/signin">) {
  const { redirect, reason } = await searchParams;
  // only allow redirects inside this site
  const target = typeof redirect === "string" && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/";

  return (
    <AuthCard title="সাইন ইন করুন" subtitle="বিস্তারিত দাম দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।">
      <SignInForm redirectTo={target} protectedRedirect={reason === "protected"} />
    </AuthCard>
  );
}
