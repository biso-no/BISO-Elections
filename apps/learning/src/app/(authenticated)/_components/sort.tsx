"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowDownZA, ArrowUpAZ } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";

type SortType = "asc" | "desc";

type SortOption = "progress" | "alphabetical";

export interface SortProps {
  sortType: SortType;
  sortOrder: SortOption;
}

export function Sort() {
  const [sortType, setSortType] = useState<SortType>("desc");
  const [sortOrder, setSortOrder] = useState<SortOption>("progress");

  const updateSearchParams = () => {
    const existingParams = new URLSearchParams(window.location.search);

    // Merge existing params with new sort values
    existingParams.set("sortType", sortType);
    existingParams.set("sortOrder", sortOrder);

    return existingParams.toString();
  };

  useEffect(() => {
    const updatedParams = updateSearchParams();
    window.history.replaceState({}, "", `?${updatedParams}`);
  }, [sortType, sortOrder, updateSearchParams]);

  const handleSortTypeChange = (value: SortType) => {
    setSortType(value);
  };

  const handleSortOrderChange = (value: SortOption) => {
    setSortOrder(value);
  };

  return (
    <div className="flex flex-row gap-4">
      <Separator orientation="vertical" />
      <Label>Sort by</Label>
      <RadioGroup value={sortType} onValueChange={handleSortTypeChange}>
        <RadioGroupItem value="asc">Ascending</RadioGroupItem>
        <RadioGroupItem value="desc">Descending</RadioGroupItem>
      </RadioGroup>
      <Label>Sort order</Label>
      <RadioGroup value={sortOrder} onValueChange={handleSortOrderChange}>
        <RadioGroupItem value="progress">Progress</RadioGroupItem>
        <RadioGroupItem value="alphabetical">Alphabetical</RadioGroupItem>
      </RadioGroup>
    </div>
  );
}
