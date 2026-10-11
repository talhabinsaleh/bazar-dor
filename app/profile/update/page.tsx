import type { Metadata } from "next";
import { requireSession } from "@/lib/session";
import UpdateForm from "./UpdateForm";

export const metadata: Metadata = { title: "তথ্য আপডেট — বাজার দর" };

export default async function UpdateProfilePage() {
  const { user } = await requireSession("/profile/update");

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="text-base-content/70">আপনার নাম পরিবর্তন করে আপডেট বাটনে চাপ দিন।</p>
      <UpdateForm currentName={user.name} />
    </div>
  );
}
