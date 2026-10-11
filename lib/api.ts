import type { Category, Product } from "@/types/product";

// Main API first, the two mirrors only if it fails
const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function getJSON<T>(path: string, fresh = false): Promise<T> {
  let lastError: unknown;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(base + path, fresh ? { cache: "no-store" } : { next: { revalidate: 300 } });
      if (res.ok) return (await res.json()) as T;
      lastError = new Error(`${res.status} from ${base}${path}`);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

// fresh = skip the cache and always ask the API (used where a loading skeleton is shown)
export function getProducts(category?: string, fresh = false) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return getJSON<Product[]>(`/products${query}`, fresh);
}

export function getCategories() {
  return getJSON<Category[]>("/categories");
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
