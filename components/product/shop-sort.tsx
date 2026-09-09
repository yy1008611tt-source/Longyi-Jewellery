"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { shopHref, sortOptions, type SortOrder } from "@/lib/catalog";
import type { Category } from "@/types/product";

export function ShopSort({ category, sort }: { category?: Category; sort: SortOrder }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <div className="sort-control">
      <label htmlFor="product-sort">Sort by</label>
      <select
        id="product-sort"
        value={sort}
        disabled={pending}
        onChange={(event) => {
          const next = sortOptions.find((option) => option.value === event.target.value);
          if (next) startTransition(() => router.push(shopHref(category, next.value), { scroll: false }));
        }}
      >
        {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <span className="sr-only" role="status">{pending ? "Updating products" : ""}</span>
    </div>
  );
}
