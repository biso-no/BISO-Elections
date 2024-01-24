"use client";

import { useRouter } from "next/navigation";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { api } from "~/trpc/react";

//A dynamic alternative to the Tutorials component below
export function Tutorials(props: {
  courses: RouterOutputs["learning"]["allCourses"];
}) {
  const router = useRouter();

  const utils = api.useUtils();

  const handleStartCourse = (id: string) => {
    router.push(`/course/${id}`);
  };

  return (
    <div className="flex justify-center">
      {" "}
      {/* Center the content horizontally */}
      <div className="flex w-full max-w-7xl flex-col gap-10 p-6">
        {" "}
        {/* Set a max width */}
        <section className="w-full">
          <h2 className="mb-4 text-2xl font-bold">Courses</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {" "}
            {/* Adjust grid for larger screens */}
            {props.courses?.map((course) => (
              <Card
                key={course.id}
                className="min-w- shadow-lg transition-shadow duration-200 ease-in-out hover:shadow-xl"
              >
                {" "}
                {/* Add shadow and hover effect */}
                <CardContent>
                  <div className="aspect-[16/9] w-full bg-gray-200"></div>
                  {/* Add a background color for the aspect ratio placeholder */}
                  <h3 className="mt-4 text-lg font-semibold">{course.name}</h3>

                  {/* Container for progress bar and percentage */}
                  <div className="relative mt-2">
                    <Progress
                      className="h-2"
                      value={(() => {
                        const lessons = course.lessons;
                        let totalProgress = 0;
                        let totalChapters = 0;
                        lessons.forEach((lesson) => {
                          const chapters = lesson.pages;
                          totalChapters += chapters.length;
                          chapters.forEach((chapter) => {
                            if (chapter.chapterProgress) {
                              // Assuming chapterProgress is an array of objects with a progress property
                              const chapterProgress =
                                chapter.chapterProgress.reduce(
                                  (total, { progress }) => total + progress,
                                  0,
                                );
                              totalProgress += chapterProgress;
                            }
                          });
                        });
                        return totalProgress / totalChapters;
                      })()}
                    />

                    {/* Position the percentage text above the progress bar, on the right */}
                    <span className="absolute -top-5 right-0 text-sm font-medium">
                      {`${(() => {
                        const lessons = course.lessons;
                        let totalProgress = 0;
                        let totalChapters = 0;
                        lessons.forEach((lesson) => {
                          const chapters = lesson.pages;
                          totalChapters += chapters.length;
                          chapters.forEach((chapter) => {
                            if (chapter.chapterProgress) {
                              // Assuming chapterProgress is an array of objects with a progress property
                              const chapterProgress =
                                chapter.chapterProgress.reduce(
                                  (total, { progress }) => total + progress,
                                  0,
                                );
                              totalProgress += chapterProgress;
                            }
                          });
                        });
                        return (totalProgress / totalChapters).toFixed(2);
                      })()}%`}
                    </span>
                  </div>

                  <div className="flex flex-row justify-end gap-2">
                    <Button
                      variant="outline"
                      className="mt-4 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                      onClick={() => handleStartCourse(course.id)}
                    >
                      {`${
                        course?.lessons[0]?.pages[0]?.chapterProgress
                          ? "Continue"
                          : "Start"
                      }`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
