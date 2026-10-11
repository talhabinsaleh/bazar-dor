import type { Metadata } from "next";

export const metadata: Metadata = { title: "গোপনীয়তা নীতি — বাজার দর" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">গোপনীয়তা নীতি</h1>
      <p className="mt-1 text-sm text-base-content/60">Privacy Policy</p>

      <div className="mt-6 space-y-5 rounded-2xl border border-line bg-base-100 p-6 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold">আমরা কী তথ্য রাখি</h2>
          <p>
            সাইন আপ বা Google/GitHub দিয়ে লগইন করলে আমরা শুধু আপনার নাম, ইমেইল ও প্রোফাইল ছবি রাখি। পাসওয়ার্ড
            এনক্রিপ্ট করে সংরক্ষণ করা হয়।
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">তথ্য কীভাবে ব্যবহার হয়</h2>
          <p>এই তথ্য শুধু আপনাকে সাইন ইন করাতে ও প্রোফাইল দেখাতে ব্যবহার হয়। কারও সাথে শেয়ার বা বিক্রি করা হয় না।</p>
        </section>
        <section>
          <h2 className="text-lg font-bold">তথ্য মুছে ফেলা</h2>
          <p>
            আপনার অ্যাকাউন্ট মুছে ফেলতে চাইলে talhabinsalehasif32@gmail.com ঠিকানায় ইমেইল করুন।
          </p>
        </section>
        <p className="text-sm text-base-content/60">
          বাজার দর একটি শিক্ষামূলক প্রজেক্ট (Programming Hero, Assignment 7)। এখানে দেখানো দাম সম্ভাব্য।
        </p>
      </div>
    </div>
  );
}
