"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { api } from "~/trpc/react";

interface CourseProgressProps {
  course: Course;
}

const course = {
  id: 1,
  title: "Course Title",
  description: "Course Description",
  lessons: [
    {
      id: 1,
      title: "Lesson 1",
      description: "This is the introduction to the course",
      pages: [
        {
          id: 1,
          title: "Page 1",
          description: "This is the introduction to the course",
          content: "This is the content of the page",
          duration: 10,
        },
        {
          id: 2,
          title: "Page 2",
          description: "This is the introduction to the course",
          content: "This is the content of the page",
          duration: 10,
        },
      ],
    },
    {
      id: 2,
      title: "Lesson 2",
      description: "This is the introduction to the course",
      pages: [
        {
          id: 1,
          title: "Page 1",
          description: "This is the introduction to the course",
          content: "This is the content of the page",
          duration: 10,
        },
        {
          id: 2,
          title: "Page 2",
          description: "This is the introduction to the course",
          content: "This is the content of the page",
          duration: 10,
        },
      ],
    },
  ],
};
export function CourseProgress({ course }: CourseProgressProps) {
  const [search, setSearch] = useState<string>("");
  const [totalProgress, setTotalProgress] = useState<number>(0);

  //Display the title in the upper left corner of the component.
  //Underneath is a search bar.
  //Underneath the searchbar are accordions for each lesson.
  //While closed, the values are the title of the lesson and the progress bar.
  //On the left side, above the progress bar, duration of the lesson, and on the right side, the % of completion.
  //Calculate the total progress of the course by adding the progress of each lesson and dividing by the number of lessons.
  //Display the total progress in the upper right corner of the component.
  //When the accordion is open, display the pages of the lesson.

  return (
    <div className="flex w-full flex-row">
      <div className="flex w-full flex-col">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold">Course Progress</h2>
          <div className="flex flex-row items-center gap-2">
            <Search className="h-6 w-6" />
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-full flex-col">
          {course.lessons.map((lesson) => (
            <Accordion key={lesson.id} collapsible className="w-full">
              <AccordionItem value={lesson.title}>
                <AccordionTrigger>
                  <div className="flex flex-row items-center justify-between">
                    <h3 className="text-xl font-bold">{lesson.title}</h3>
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-sm font-medium">
                        {lesson.duration} min
                      </span>
                      <span className="text-sm font-medium">
                        {lesson.progress}%
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex w-full flex-col">
                    {lesson.pages.map((page) => (
                      <div
                        key={page.id}
                        className="flex flex-row items-center justify-between"
                      >
                        <h4 className="text-lg font-bold">{page.title}</h4>
                        <div className="flex flex-row items-center gap-2">
                          <span className="text-sm font-medium">
                            {page.duration} min
                          </span>
                          <span className="text-sm font-medium">
                            {page.progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
