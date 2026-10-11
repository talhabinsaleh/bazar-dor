import type { Market, Product } from "@/types/product";

const UNIT_BN: Record<Product["unit"], string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitBn = (unit: Product["unit"]) => UNIT_BN[unit] ?? unit;

// 1850 -> "১,৮৫০"
export const bnNumber = (n: number, decimals = 0) =>
  n.toLocaleString("bn-BD", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export const bnTaka = (n: number) => `${bnNumber(n)} টাকা`;

export const bnPercent = (pct: number) => `${bnNumber(Math.abs(pct), 1)}%`;

// "রবিবার, ১১ অক্টোবর, ২০২৬"
export const bnToday = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

export const marketAverage = (m: Market) => (m.min + m.max) / 2;

export function priceSummary(product: Product) {
  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const avgs = product.markets.map(marketAverage);
  return {
    min: Math.min(...mins),
    max: Math.max(...maxs),
    avg: Math.round(avgs.reduce((a, b) => a + b, 0) / avgs.length),
  };
}
