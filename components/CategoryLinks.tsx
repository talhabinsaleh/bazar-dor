"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types/product";

export default function CategoryLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "সব পণ্য", icon: "🛒" },
    ...categories.map((c) => ({ href: `/category/${c.slug}`, label: c.nameBn, icon: c.icon })),
  ];

  return (
    <nav className="border-t border-line">
      <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] md:justify-center">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                  active ? "bg-primary text-primary-content shadow-sm" : "hover:bg-base-200"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
