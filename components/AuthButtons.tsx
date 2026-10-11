"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronDown, LogOut, User } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import Avatar from "./Avatar";

export default function AuthButtons() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return <div className="skeleton h-10 w-36 rounded-xl" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md font-semibold">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md font-semibold">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = session;

  async function handleSignOut() {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="flex cursor-pointer items-center gap-2 rounded-xl p-1 hover:bg-base-200">
        <Avatar name={user.name} image={user.image} className="size-9" />
        <span className="hidden max-w-36 truncate text-sm font-semibold sm:block">{user.name}</span>
        <ChevronDown className="size-4 text-base-content/60" />
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-2 w-60 rounded-2xl border border-line bg-base-100 p-2 shadow-lg"
      >
        <div className="border-b border-line px-3 py-2">
          <p className="truncate font-semibold">{user.name}</p>
          <p className="truncate text-xs text-base-content/60">{user.email}</p>
        </div>
        <ul className="menu w-full p-0 pt-1">
          <li>
            <Link href="/profile">
              <User className="size-4" /> প্রোফাইল
            </Link>
          </li>
          <li>
            <button onClick={handleSignOut} className="text-error">
              <LogOut className="size-4" /> সাইন আউট
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
