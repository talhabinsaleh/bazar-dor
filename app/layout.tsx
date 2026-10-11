import type { Metadata } from "next";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import AuthToast from "@/components/AuthToast";
import "./globals.css";

const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর — বাজারভিত্তিক সর্বনিম্ন, সর্বোচ্চ ও গড় দাম।",
  icons: { icon: "/logo-icon.png" },
  metadataBase: new URL("https://bazar-dor-talha.vercel.app"),
  openGraph: {
    title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    description: "Bangla market price tracker: today's prices, risers and fallers, and market-by-market rates across Bangladesh.",
    url: "/",
    siteName: "বাজার দর (BazarDor)",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "বাজার দর home page" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="bazardor" className={hind.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased text-base-content">
        <Navbar />
        <PriceTicker />
        <main className="flex-1">{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <AuthToast />
        </Suspense>
        <Toaster position="top-center" toastOptions={{ style: { fontFamily: "var(--font-hind)" } }} />
      </body>
    </html>
  );
}
