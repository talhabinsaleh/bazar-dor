import Image from "next/image";
import { bnToday } from "@/lib/format";

export default function Hero() {
  return (
    <section className="grid items-center gap-8 rounded-3xl border border-line bg-base-100 p-6 sm:p-10 md:grid-cols-[1.4fr_1fr]">
      <div>
        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-primary">
          {bnToday()}
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">আজকের বাজারের দাম এক নজরে</h1>
        <p className="mt-4 max-w-xl text-base text-base-content/80 sm:text-lg">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
          দামের পরিবর্তন এক জায়গায়।
        </p>
        <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md mt-6 px-6 font-semibold">
          সব পণ্য দেখুন
        </a>
      </div>
      <Image
        src="/bazar-hero.png"
        alt="বাজারের ঝুড়ি"
        width={315}
        height={263}
        priority
        className="mx-auto h-auto w-56 sm:w-72 md:w-full md:max-w-80"
      />
    </section>
  );
}
