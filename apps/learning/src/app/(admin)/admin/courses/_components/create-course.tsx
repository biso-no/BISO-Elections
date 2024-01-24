/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k9j8FzdDqgR
 */
"use client";

import React, { useState } from "react";
import { Pen } from "lucide-react";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { ChapterEditor } from "./chapter-editor";
import { CourseDetails } from "./CourseInfo";
import { Sessions } from "./sessions-bar";

export function CreateCourseForm(props: {
  course: RouterOutputs["learning"]["byId"];
}) {
  const utils = api.useUtils();

  const toast = useToast();
  const [editCourseTitle, setEditCourseTitle] = useState(false);
  const [courseName, setCourseName] = useState(props?.course?.name);

  const [activeChapter, setActiveChapter] =
    useState<RouterOutputs["learning"]["chapters"][0]>();

  if (!props.course) {
    return null;
  }

  const { mutateAsync: renameCourse } = api.learning.update.useMutation({
    onSuccess: async () => {
      await utils.learning.lessons.invalidate();
    },
    onError: (err) => {
      toast.toast({
        title:
          err?.data?.code === "UNAUTHORIZED"
            ? "You must be logged in to post"
            : "Failed to create post",
        description: "Please try again later",
        variant: "destructive",
      });
    },
  });

  if (!props.course) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-800">
      <header className="flex items-center justify-between bg-white p-6 dark:bg-gray-900">
        {editCourseTitle ? (
          <input
            type="text"
            className="text-2xl font-bold"
            defaultValue={courseName}
            onBlur={(e) => {
              if (props.course) {
                void renameCourse({
                  id: props.course.id,
                  name: e.target.value,
                });
                setCourseName(e.target.value);
                setEditCourseTitle(false);
              }
            }}
          />
        ) : (
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-2xl font-bold">{courseName}</h1>
            <Pen
              className="cursor-pointer"
              onClick={() => setEditCourseTitle(true)}
            />
          </div>
        )}
        <Button variant="outline">Save Changes</Button>
      </header>
      <main className="flex flex-col justify-center gap-6 p-6 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <ChapterEditor
            lessonId={activeChapter?.id ?? ""}
            courseId={props.course?.id ?? ""}
          />
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-1/3">
          {" "}
          {/* Adjusted this line */}
          {/* Removed the inner div, as it's unnecessary now */}
          <Sessions
            courseId={props.course?.id}
            setActiveChapter={setActiveChapter}
          />
          <CourseDetails courseId={props.course.id} />
        </div>
      </main>
    </div>
  );
}
