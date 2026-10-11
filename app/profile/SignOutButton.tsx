"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleClick() {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <button onClick={handleClick} className="btn btn-outline btn-error btn-sm sm:btn-md font-semibold">
      <LogOut className="size-4" /> সাইন আউট
    </button>
  );
}
