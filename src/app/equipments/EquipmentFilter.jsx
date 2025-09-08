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

export default function EquipmentFilter({
  initialSearch,
  initialCategory,
  initialMuscle,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [muscle, setMuscle] = useState(initialMuscle);

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
      muscle,
      page,
    });

    router.push(`${pathname}?${params.toString()}`);

    prevSearch.current = search;
  }, [search, category, muscle]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
      <Input
        placeholder="Search equipments..."
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
          <SelectItem value="Cardio">Cardio</SelectItem>
          <SelectItem value="Strength">Strength</SelectItem>
          <SelectItem value="Flexibility">Flexibility</SelectItem>
        </SelectContent>
      </Select>

      <Select value={muscle} onValueChange={setMuscle}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Muscle Targeted" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Chest">Chest</SelectItem>
          <SelectItem value="Back">Back</SelectItem>
          <SelectItem value="Legs">Legs</SelectItem>
          <SelectItem value="Arms">Arms</SelectItem>
          <SelectItem value="Core">Core</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
