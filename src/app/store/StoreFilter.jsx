"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function StoreFilter({
  initialSearch,
  initialCategory,
  initialSort,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);

  // Keep track of first render
    const firstRender = useRef(true);
    const prevSearch = useRef(search);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; // skip initial mount
    }

    // Only reset page if search changed
    const page =
      search !== prevSearch.current ? 1 : searchParams?.get("page") || 1;
    const params = new URLSearchParams({
      search,
      category,
      sort,
      page,
    });

    router.push(`${pathname}?${params.toString()}`);

    prevSearch.current = search;
  }, [search, category, sort]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Strength">Strength Training Equipment</SelectItem>
          <SelectItem value="Cardio">Cardio Equipment</SelectItem>
          <SelectItem value="Flexibility">Flexibility Equipment</SelectItem>
          <SelectItem value="Recovery">Recovery Equipment</SelectItem>
          <SelectItem value="Supplements">Supplements</SelectItem>
          <SelectItem value="Accessories">Accessories</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort by Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Price: Low to High</SelectItem>
          <SelectItem value="desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
