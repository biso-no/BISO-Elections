"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ListFilter } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { ComboBox } from "~/components/combo-box";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";

interface FilterOption {
  value: string;
  label: string;
  description?: string;
}

//Some filterable options
const campuses: FilterOption[] = [
  {
    value: "all",
    label: "All Campuses",
  },
  {
    value: "bergen",
    label: "Bergen",
  },
  {
    value: "oslo",
    label: "Oslo",
  },
  {
    value: "stavanger",
    label: "Stavanger",
  },
  {
    value: "trondheim",
    label: "Trondheim",
  },
];

const topics: FilterOption[] = [
  {
    value: "all",
    label: "All Categories",
    description: "All categories of tutorials",
  },
  {
    value: "intro",
    label: "Introduction to BISO",
    description: "An introduction to BISO and our culture",
  },
  {
    value: "Internal routines",
    label: "Internal routines",
    description: "Learn about internal routines in BISO",
  },
  {
    value: "services",
    label: "Services",
    description: "Learn about services we use in BISO, and how to master them",
  },
];

const subjects: FilterOption[] = [
  {
    value: "all",
    label: "All Subjects",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "hr",
    label: "Human Resources",
  },
  {
    value: "it",
    label: "IT",
  },
  {
    value: "legal",
    label: "Legal",
  },
  {
    value: "management",
    label: "Management",
  },
  {
    value: "politics",
    label: "Politics",
  },
  {
    value: "academics",
    label: "Academics",
  },
  {
    value: "other",
    label: "Other",
  },
];

const levels: FilterOption[] = [
  {
    value: "all",
    label: "All Levels",
  },
  {
    value: "beginner",
    label: "Beginner",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "advanced",
    label: "Advanced",
  },
];

const languages = [
  {
    value: "all",
    label: "All Languages",
  },
  {
    value: "english",
    label: "English",
  },
  {
    value: "norwegian",
    label: "Norwegian",
  },
  {
    value: "other",
    label: "Other",
  },
];

const types: FilterOption[] = [
  {
    value: "all",
    label: "All Types",
  },
  {
    value: "video",
    label: "Video",
  },
  {
    value: "text",
    label: "Text",
  },
];

export function Filter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [tempSearch, setTempSearch] = useState<string>("");
  const [allFilters, setAllFilters] = useState<boolean>(false);

  //Clear params. DO NOT USE useCallback
  const clearParams = () => {
    //Remove all params, except for the sortOrder and sortType, as they are searchParams used in another component.
    const params = new URLSearchParams(searchParams);
    params.delete("campus");
    params.delete("topic");
    params.delete("subject");
    params.delete("level");
    params.delete("language");
    params.delete("type");
    params.delete("search");
    replace(`${pathname}?${params.toString()}`);
  };

  const toggleAllFilters = useCallback(() => {
    setAllFilters(!allFilters);
  }, [allFilters]);

  //Handle search
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    //Update the search param in case there are other filters
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  //Handle filters
  const handleFilter = (value: string, filter: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(filter, value);
    } else {
      params.delete(filter);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
          <Label>Topic</Label>
          <ComboBox
            options={topics}
            variant="ghost"
            label={searchParams.get("topic")?.toString() ?? "All Categories"}
            onChange={(value) => {
              handleFilter(value, "topic");
            }}
            key="topic"
          />
        </div>
        <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
          <Label>Subject</Label>
          <ComboBox
            options={subjects}
            variant="ghost"
            label={searchParams.get("subject")?.toString() ?? "All Subjects"}
            onChange={(value) => {
              handleFilter(value, "subject");
            }}
            key="subject"
          />
        </div>
        <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
          <Label>Level</Label>
          <ComboBox
            options={levels}
            variant="ghost"
            label={searchParams.get("level")?.toString() ?? "All Levels"}
            onChange={(value) => {
              handleFilter(value, "level");
            }}
            key="level"
          />
        </div>
        <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
          <Label>Search</Label>
          <Input
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("search")?.toString()}
          />
        </div>
        <div className="flex flex-row items-end gap-4">
          <Button variant="outline" onClick={clearParams}>
            Clear Filters
          </Button>
          <Button onClick={toggleAllFilters} variant="ghost">
            <ListFilter />
          </Button>
        </div>
      </div>
      {allFilters && (
        <div className="flex flex-row gap-4">
          <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
            <Label>Type</Label>
            <ComboBox
              variant="ghost"
              options={types}
              label={searchParams.get("type")?.toString() ?? "All Types"}
              onChange={(value) => {
                handleFilter(value, "type");
              }}
              key="type"
            />
          </div>
          <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
            <Label>Campus</Label>
            <ComboBox
              variant="ghost"
              options={campuses}
              label={searchParams.get("campus")?.toString() ?? "All Campuses"}
              onChange={(value) => {
                handleFilter(value, "campus");
              }}
              key={searchParams.get("campus")?.toString()}
            />
          </div>
          <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
            <Label>Language</Label>
            <ComboBox
              variant="ghost"
              options={languages}
              label={
                searchParams.get("language")?.toString() ?? "All Languages"
              }
              onChange={(value) => {
                handleFilter(value, "language");
              }}
              key="language"
            />
          </div>
        </div>
      )}
    </div>
  );
}
