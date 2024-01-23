"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ListFilter } from "lucide-react";

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

  const [campus, setCampus] = useState<string>("all");
  const [topic, setTopic] = useState<string>("all");
  const [subject, setSubject] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");
  const [language, setLanguage] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [tempSearch, setTempSearch] = useState<string>("");
  const [allFilters, setAllFilters] = useState<boolean>(false);

  const updateSearchParams = useCallback(() => {
    const existingParams = new URLSearchParams(window.location.search);

    if (campus !== "all") existingParams.set("campus", campus);
    if (topic !== "all") existingParams.set("topic", topic);
    if (subject !== "all") existingParams.set("subject", subject);
    if (level !== "all") existingParams.set("level", level);
    if (language !== "all") existingParams.set("language", language);
    if (type !== "all") existingParams.set("type", type);
    if (search !== "") existingParams.set("search", search);

    return existingParams.toString();
  }, [campus, topic, subject, level, language, type, search]);

  //Clear params. DO NOT USE useCallback
  const clearParams = () => {
    setCampus("all");
    setTopic("all");
    setSubject("all");
    setLevel("all");
    setLanguage("all");
    setType("all");
    setSearch("");
  };

  // Update search params whenever the component state changes
  useEffect(() => {
    const updatedParams = updateSearchParams();
    window.history.replaceState({}, "", `?${updatedParams}`);
  }, [updateSearchParams]);

  const toggleAllFilters = useCallback(() => {
    setAllFilters(!allFilters);
  }, [allFilters]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
          <Label>Topic</Label>
          <ComboBox
            options={topics}
            variant="ghost"
            label={topic === "all" ? "All Topics" : topic}
            onChange={(value) => {
              if (searchParams.get("search")) {
                setSearch(searchParams.get("search"));
              }
              setTopic(value);
            }}
            key={topic}
          />
        </div>
        <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
          <Label>Subject</Label>
          <ComboBox
            options={subjects}
            variant="ghost"
            label={subject === "all" ? "All Subjects" : subject}
            onChange={(value) => {
              if (searchParams.get("search")) {
                setSearch(searchParams.get("search"));
              }
              setSubject(value);
            }}
            key={subject}
          />
        </div>
        <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
          <Label>Level</Label>
          <ComboBox
            options={levels}
            variant="ghost"
            label={level === "all" ? "All Levels" : level}
            onChange={(value) => {
              if (searchParams.get("search")) {
                setSearch(searchParams.get("search"));
              }
              setLevel(value);
            }}
            key={level}
          />
        </div>
        <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
          <Label>Search</Label>
          <Input
            value={tempSearch}
            onChange={(e) => {
              setTempSearch(e.target.value);
            }}
            onBlur={(e) => {
              //When the user clicks outside the search field, update the search state with the temporary search state
              setSearch(tempSearch);
            }}
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
              label={type === "all" ? "All Types" : type}
              onChange={(value) => {
                if (searchParams.get("search")) {
                  setSearch(searchParams.get("search"));
                }
                setType(value);
              }}
              key={type}
            />
          </div>
          <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
            <Label>Campus</Label>
            <ComboBox
              variant="ghost"
              options={campuses}
              label={campus === "all" ? "All Campuses" : campus}
              onChange={(value) => {
                if (searchParams.get("search")) {
                  setSearch(searchParams.get("search"));
                }
                setCampus(value);
              }}
              key={campus}
            />
          </div>
          <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-2">
            <Label>Language</Label>
            <ComboBox
              variant="ghost"
              options={languages}
              label={language === "all" ? "All Languages" : language}
              onChange={(value) => {
                if (searchParams.get("search")) {
                  setSearch(searchParams.get("search"));
                }
                setLanguage(value);
              }}
              key={language}
            />
          </div>
        </div>
      )}
    </div>
  );
}
